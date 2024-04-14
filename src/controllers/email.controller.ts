import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sendResetPasswordEmail } from 'src/services/email.service';
import { generateOTP } from 'src/services/otp.service';
import { HttpError, encode, handleHttpError } from 'src/utils';

/**
 * Sends an OTP to the user's email.
 * 
 * @param req The request object. 
 * @param res The response object. 
 */
export const sendOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    const { otpInstance, timestamp } = await generateOTP(email);
    const details = {
      timestamp,
      email,
      message: 'El código OTP ha sido enviado',
      otpId: otpInstance._id,
    };

    const encoded = encode(JSON.stringify(details));

    await sendResetPasswordEmail(email, otpInstance.otp);

    res.send({ message: 'El código OTP ha sido enviado', details: encoded });
  } catch (error) {
    const httpError =
      error instanceof HttpError
        ? error
        : new HttpError(
            'Ha ocurrido un error al enviar el email',
            StatusCodes.INTERNAL_SERVER_ERROR
          );

    handleHttpError(res, httpError);
  }
};
