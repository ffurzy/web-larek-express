import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { errors } from 'celebrate';

import path from 'path';
import productRoutes from './routes/product';
import orderRoutes from './routes/order';

import NotFoundError from './errors/NotFoundError';
import errorHandler from './middlewares/error-handler';

import { requestLogger, errorLogger } from './middlewares/logger';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use('/product', productRoutes);
app.use('/order', orderRoutes);
app.get('/', (_req, res) => {
  res.send({ message: 'Web Larek API is Running' });
});

app.use((_req, _res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

// подключаем бд через Mongoose
dotenv.config();
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/weblarek' } = process.env;
mongoose.connect(DB_ADDRESS)
  .then(() => {})
  .catch(() => {});

app.listen(3000, () => {
  /* eslint-disable no-console */
  console.log('Server started on port 3000');
  /* eslint-enable no-console */
});
