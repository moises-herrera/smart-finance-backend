import { createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { envConfig } from 'src/config';
import { EmailData } from 'src/interfaces';
import { findOne } from './user.service';
import { HttpError } from 'src/utils';
import { readFileSync } from 'fs';

/**
 * The transporter to use to send emails.
 */
const transporter = createTransport({
  service: envConfig.SMTP_SERVICE,
  host: envConfig.SMTP_HOST,
  port: Number(envConfig.SMTP_PORT),
  secure: envConfig.SMTP_SECURE === 'true',
  auth: {
    user: envConfig.EMAIL_USER,
    pass: envConfig.EMAIL_PASSWORD,
  },
});

/**
 * Sends an email.
 *
 * @param data The data needed to send an email.
 * @returns A promise that resolves to the result of sending the email.
 */
export const sendEmail = async (
  data: EmailData
): Promise<SMTPTransport.SentMessageInfo> => {
  await transporter.verify();

  return await transporter.sendMail({
    from: data.from,
    to: data.to,
    subject: data.subject,
    text: data.body,
    html: data.body,
  });
};

/**
 * Sends an email with a reset password OTP.
 * 
 * @param recipient The email address of the recipient. 
 * @param otp The OTP to send. 
 */
export const sendResetPasswordEmail = async (
  recipient: string,
  otp: string
): Promise<void> => {
  const user = await findOne({ email: recipient });

  if (!user) {
    throw new HttpError('Usuario no encontrado', 404);
  }

  let emailBody = readFileSync(
    `${__dirname}/../email-templates/reset-password.html`,
    'utf8'
  );

  emailBody = emailBody.replace(/%OTP_CODE%/g, otp);

  const emailData: EmailData = {
    from: envConfig.EMAIL_USER,
    to: recipient,
    subject: 'Código de verificación',
    body: emailBody,
  };

  await sendEmail(emailData);
};
