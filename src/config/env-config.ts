import { config } from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'development';

if (env !== 'production') {
  const envPath = path.resolve(process.cwd(), `.env.${env}`);
  config({ path: envPath });
} else {
  config();
}

const envConfig = {
  PORT: process.env.PORT || 3000,
  DB_URI: process.env.DB_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
};

export default envConfig;
