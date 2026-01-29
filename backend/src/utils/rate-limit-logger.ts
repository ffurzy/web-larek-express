import winston from "winston";
import path from 'path';

const logsDir = path.join(process.cwd(), 'logs');

export const rateLimitLogger = winston.createLogger({
  level: 'warn',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, 'rate-limit.log'),
    }),
  ],
});