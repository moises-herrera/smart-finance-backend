import { createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { envConfig } from 'src/config';
import { EmailData } from 'src/interfaces';

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
  return await transporter.sendMail({
    from: data.from,
    to: data.to,
    subject: data.subject,
    text: data.body,
    html: data.body,
  });
};
