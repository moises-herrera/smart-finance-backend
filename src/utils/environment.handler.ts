import { DotenvParseOutput, config } from 'dotenv';
import path from 'path';

/**
 * Parses the environment configuration.
 *
 * @returns The parsed environment configuration.
 */
export const parseEnvConfig = (): DotenvParseOutput => {
  const env = process.env.NODE_ENV || 'development';
  const envPath = path
    .resolve(process.cwd(), env !== 'production' ? `.env.${env}` : '.env')
    .trim();
  const result = config({ path: envPath });

  if (result.error) {
    throw result.error;
  }

  if (!result.parsed) {
    throw new Error('No environment variables found');
  }

  return result.parsed;
};
