import { StatusCodes } from 'http-status-codes';
import otpGenerator from 'otp-generator';
import { OTP } from 'src/database/models';
import { IOTPDocument, IStandardResponse, OTPVerify } from 'src/interfaces';
import { HttpError, compareDates, decode, generateToken } from 'src/utils';

/**
 * Finds an OTP instance that matches the query.
 *
 * @param query The query to match.
 * @returns The OTP instance.
 */
export const findOne = async (
  query: Record<string, unknown>
): Promise<IOTPDocument | null> => {
  try {
    return await OTP.findOne(query);
  } catch (error) {
    throw error;
  }
};

/**
 * Finds an OTP instance by its ID.
 *
 * @param id The ID of the OTP instance.
 * @returns The OTP instance.
 */
export const findById = async (id: string): Promise<IOTPDocument | null> => {
  try {
    return await findOne({ _id: id });
  } catch (error) {
    throw error;
  }
};

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
      specialChars: false,
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

/**
 * Verifies an OTP.
 *
 * @param data The data required to verify the OTP.
 * @returns The standard response.
 */
export const verifyOTP = async (
  data: OTPVerify
): Promise<IStandardResponse<{ token: string }>> => {
  const currentDate = new Date();
  const { verificationKey, otp, email } = data;

  let decoded: string;

  try {
    decoded = decode(verificationKey);
  } catch (error) {
    throw new Error('Código de verificación inválido');
  }

  const { timestamp, otpId, email: otpEmail } = JSON.parse(decoded);

  if (email !== otpEmail) {
    throw new HttpError('El email no coincide', StatusCodes.BAD_REQUEST);
  }

  const otpInstance = await findById(otpId);

  if (!otpInstance) {
    throw new HttpError('El código OTP no existe', StatusCodes.NOT_FOUND);
  }

  if (compareDates(currentDate, Number(timestamp)) > 0) {
    throw new HttpError('El código OTP ha expirado', StatusCodes.BAD_REQUEST);
  }

  if (otpInstance.otp !== otp) {
    throw new HttpError('El código OTP es incorrecto', StatusCodes.BAD_REQUEST);
  }

  await OTP.deleteOne({ _id: otpId });

  const token = generateToken(email, {
    expiresIn: 10 * 60 * 1000,
  });

  const response: IStandardResponse<{ token: string }> = {
    message: 'El código OTP ha sido verificado',
    data: { token },
  };

  return response;
};
