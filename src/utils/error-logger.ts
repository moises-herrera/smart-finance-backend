import path from 'node:path';
import { createLogger, transports, format } from 'winston';
const { combine, errors, json } = format;

const ERROR_LOG_FILE_PATH = path.join(__dirname, '../../logs/error.log');

const loggerTransports = [
  new transports.Console(),
  new transports.File({ filename: ERROR_LOG_FILE_PATH, level: 'error' }),
];

/**
 * Error logger.
 */
export const errorLogger = createLogger({
  level: 'error',
  format: combine(errors({ stack: true }), json()),
  defaultMeta: { service: 'smart-finance-service' },
  transports: loggerTransports,
});
