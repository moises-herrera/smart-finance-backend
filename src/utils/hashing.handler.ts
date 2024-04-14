import { compare, hash } from 'bcryptjs';

/**
 * Creates a hash of a text.
 *
 * @param text The text to encrypt.
 * @returns The encrypted text.
 */
export const hashText = async (text: string): Promise<string> => {
  const encryptedText = await hash(text, 10);
  return encryptedText;
};

/**
 * Verifies that a text matches an encrypted text.
 *
 * @param text The text to verify.
 * @param hashedText The hashed text to compare against.
 * @returns True if the text matches the encrypted text, false otherwise.
 */
export const verifyHashedText = async (
  text: string,
  hashedText: string
): Promise<boolean> => {
  const match = await compare(text, hashedText);
  return match;
};
