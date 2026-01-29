import rateLimit from 'express-rate-limit';
import { rateLimitLogger } from '../utils/rate-limit-logger';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  message: 'Слишком много запросов с этого IP-адреса, пожалуйста, повторите попытку через 15 минут.',
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res) => {
    rateLimitLogger.warn({
      message: 'Rate limit exceeded',
      ip: req.ip,
      method: req.method,
      url: req.originalUrl,
      userAgent: req.headers['user-agent'],
      time: new Date().toISOString(),
    });

    res.status(429).json({
      message: 'Слишком много запросов с этого IP-адреса,  повторите попытку через 15 минут',
    });
  },
});
