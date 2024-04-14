import { JwtPayload, SignOptions, sign, verify } from 'jsonwebtoken';
import { envConfig } from 'src/config';

const JWT_SECRET = envConfig.JWT_SECRET;

/**
 * Generate JWT token.
 *
 * @param id The user id.
 * @param options The options to use when generating the token.
 * @returns The generated token.
 */
export const generateToken = (id: string, options?: SignOptions): string => {
  const token = sign({ id }, JWT_SECRET, options || { expiresIn: '1d' });

  return token;
};

/**
 * Verify the JWT token.
 *
 * @param token The token to verify.
 * @returns The decoded token.
 */
export const verifyToken = (token: string): string | JwtPayload => {
  const decoded = verify(token, JWT_SECRET);

  return decoded;
};
