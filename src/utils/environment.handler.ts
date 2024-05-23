import { DotenvConfigOptions, DotenvParseOutput, config } from 'dotenv';
import path from 'path';

/**
 * Parses the environment configuration.
 *
 * @returns The parsed environment configuration.
 */
export const parseEnvConfig = (): DotenvParseOutput => {
  const env = process.env.NODE_ENV || 'development';

  if (env === 'production') {
    return validateEnvConfig();
  }

  const envPath = path.resolve(process.cwd(), `.env.${env}`).trim();
  const result = validateEnvConfig({ path: envPath });
  return result;
};

/**
 * Validates the environment configuration.
 *
 * @param options The options to configure the environment.
 * @returns The parsed environment configuration.
 */
const validateEnvConfig = (
  options?: DotenvConfigOptions
): DotenvParseOutput => {
  const result = config(options);

  if (result.error) {
    throw result.error;
  }

  if (!result.parsed) {
    throw new Error('No environment variables found');
  }

  return result.parsed;
};
