import { configDotenv } from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'development';

if (env !== 'production') {
  const envPath = path.resolve(process.cwd(), `.env.${env}`);
  configDotenv({ path: envPath });
} else {
  configDotenv();
}

export default {
  PORT: process.env.PORT || 3000,
  DB_URI: process.env.DB_URI as string,
};
