import { JwtPayload, SignOptions, sign, verify } from 'jsonwebtoken';
import { envConfig } from 'src/config';

/**
 * Generate JWT token.
 *
 * @param id The user id.
 * @param options The options to use when generating the token.
 * @returns The generated token.
 */
export const generateToken = (id: string, options?: SignOptions): string => {
  const token = sign(
    { id },
    envConfig?.JWT_SECRET,
    options || { expiresIn: '1d' }
  );

  return token;
};

/**
 * Verify the JWT token.
 *
 * @param token The token to verify.
 * @returns The decoded token.
 */
export const verifyToken = (token: string): string | JwtPayload => {
  const decoded = verify(token, envConfig?.JWT_SECRET);

  return decoded;
};
