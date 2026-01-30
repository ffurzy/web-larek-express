import winston from 'winston';
import expressWinston from 'express-winston';
import path from 'path';

const logsDir = path.join(process.cwd(), 'logs');

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, 'request.log'),
    }),
  ],
  format: winston.format.json(),
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
    }),
  ],
  format: winston.format.json(),
});
