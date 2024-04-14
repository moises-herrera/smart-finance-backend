import { parseEnvConfig } from 'src/utils';

const currentEnvConfig = parseEnvConfig();

const envConfig = {
  PORT: currentEnvConfig.PORT || 3000,
  DB_URI: currentEnvConfig.DB_URI as string,
  JWT_SECRET: currentEnvConfig.JWT_SECRET as string,
};

export default envConfig;
