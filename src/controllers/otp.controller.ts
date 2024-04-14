import { Request, Response } from 'express';
import { verifyOTP } from 'src/services/otp.service';
import { handleHttpError } from 'src/utils';

/**
 * Verifies the user's OTP.
 *
 * @param req The request object.
 * @param res The response object.
 */
export const verifyUserOTP = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await verifyOTP(req.body);
    res.send(response);
  } catch (error) {
    handleHttpError(res, error);
  }
};
