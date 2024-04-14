import { createHash, createCipheriv, createDecipheriv } from 'crypto';
import { envConfig } from 'src/config';

const CRYPT_PASSWORD = envConfig.CRYPT_PASSWORD;
const CRYPT_IV = Buffer.from(envConfig.CRYPT_IV);
const CRYPT_ALGORITHM = 'aes-256-cbc';
const ivString = CRYPT_IV.toString('hex');

/**
 * Hashes a text using SHA-1.
 *
 * @param input The text to hash.
 * @returns The hashed text.
 */
const hashText = (input: string | Buffer): Buffer => {
  return createHash('sha1').update(input).digest();
};

/**
 * Get the secret key for encryption.
 *
 * @param password The password to use.
 * @param salt The salt to use.
 * @param iterations The number of iterations to use.
 * @param keyLength The length of the key.
 * @returns
 */
const passwordDeriveBytes = (
  password: string,
  salt: string,
  iterations: number,
  keyLength: number
): Buffer => {
  let key = Buffer.from(password + salt);

  for (let i = 0; i < iterations; i++) {
    key = hashText(key);
  }

  if (key.length < keyLength) {
    const hx = passwordDeriveBytes(password, salt, iterations - 1, 20);
    for (let counter = 1; key.length < keyLength; ++counter) {
      key = Buffer.concat([
        key,
        hashText(Buffer.concat([Buffer.from(counter.toString()), hx])),
      ]);
    }
  }

  return Buffer.alloc(keyLength, key);
};

/**
 * Encode a text using AES-256-CBC.
 *
 * @param text The text to encode.
 * @returns The encoded text.
 */
export const encode = (text: string): string => {
  const key = passwordDeriveBytes(CRYPT_PASSWORD, '', 100, 32);
  const cipher = createCipheriv(CRYPT_ALGORITHM, key, ivString);
  const firstPart = cipher.update(text, 'utf8');
  const secondPart = cipher.final();
  const encrypted = Buffer.concat([firstPart, secondPart]).toString('base64');
  return encrypted;
};

/**
 * Decode a text using AES-256-CBC.
 *
 * @param text The text to decode.
 * @returns The decoded text.
 */
export const decode = (text: string): string => {
  const key = passwordDeriveBytes(CRYPT_PASSWORD, '', 100, 32);
  const decipher = createDecipheriv(CRYPT_ALGORITHM, key, ivString);
  const decrypted = decipher.update(text, 'base64', 'utf8');
  const result = decrypted + decipher.final();
  return result;
};
