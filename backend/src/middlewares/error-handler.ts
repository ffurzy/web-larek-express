import { Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';

type AppError = Error & { statusCode?: number };

const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
) => {
  let statusCode = err.statusCode ?? 500;
  let message = err.message || 'Произошла ошибка';

  if (err instanceof MongooseError.ValidationError) {
    statusCode = 400;
    message = 'Ошибка валидации данных при создании товара';
  }

  if (err instanceof Error && err.message.includes('E11000')) {
    statusCode = 409;
    message = 'Товар с таким title уже существует';
  }

  return res.status(statusCode).json({ message });
};

export default errorHandler;
