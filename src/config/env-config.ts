import { DotenvParseOutput } from 'dotenv';
import { parseEnvConfig } from 'src/utils';

const currentEnvConfig = parseEnvConfig();

const envConfig: DotenvParseOutput = {
  PORT: currentEnvConfig.PORT,
  DB_URI: currentEnvConfig.DB_URI,
  JWT_SECRET: currentEnvConfig.JWT_SECRET,
  CRYPTO_PASSWORD: currentEnvConfig.CRYPTO_PASSWORD,
  CRYPTO_IV: currentEnvConfig.CRYPTO_IV,
  SMTP_SERVICE: currentEnvConfig.SMTP_SERVICE,
  SMTP_HOST: currentEnvConfig.SMTP_HOST,
  SMTP_PORT: currentEnvConfig.SMTP_PORT,
  SMTP_SECURE: currentEnvConfig.SMTP_SECURE,
  EMAIL_USER: currentEnvConfig.EMAIL_USER,
  EMAIL_PASSWORD: currentEnvConfig.EMAIL_PASSWORD,
  SMTP_SENDER: currentEnvConfig.SMTP_SENDER,
};

export default envConfig;
