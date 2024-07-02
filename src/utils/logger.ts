import path from 'node:path';
import { createLogger, transports, format } from 'winston';

const { combine, errors, json, timestamp } = format;

const ERROR_LOG_FILE_PATH = path.join(__dirname, '../../logs/error.log');

const loggerTransports = [
  new transports.Console(),
  new transports.File({ filename: ERROR_LOG_FILE_PATH, level: 'error' }),
];

/**
 * App logger.
 */
export const appLogger = createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    errors({ stack: true }),
    json()
  ),
  defaultMeta: { service: 'smart-finance-service' },
  transports: loggerTransports,
});
