import winston from 'winston';
import expressWinston from 'express-winston';
import path from 'path';

const logsDir = path.join(process.cwd(), 'logs');

// логи всех запросов кидаев в request.log

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

// логи всех ошибок в error.log

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
    }),
  ],
  format: winston.format.json(),
});
