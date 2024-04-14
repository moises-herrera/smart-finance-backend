import otpGenerator from 'otp-generator';
import { OTP } from 'src/database/models';
import { IOTPDocument } from 'src/interfaces';

/**
 * Generates an OTP and returns the OTP instance.
 *
 * @param email The email to send the OTP to.
 * @returns The OTP instance.
 */
export const generateOTP = async (
  email: string
): Promise<{ otpInstance: IOTPDocument; timestamp: Date }> => {
  try {
    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
    });

    const currentTimestamp = new Date();
    const expirationTime = new Date(currentTimestamp.getTime() + 10 * 60000);

    const otpInstance = await OTP.create({
      otp,
      expirationTime,
      email,
    });

    return {
      otpInstance,
      timestamp: currentTimestamp,
    };
  } catch (error) {
    throw error;
  }
};
