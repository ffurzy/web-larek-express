import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import Product from '../models/product';
import BadRequestError from '../errors/BadRequestError';

type PaymentType = 'card' | 'online';

interface IOrderBody {
  payment: PaymentType;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      payment, email, phone, address, total, items,
    } = req.body as IOrderBody;

    if (!payment || !['card', 'online'].includes(payment)) {
      return next(new BadRequestError('Нужно заполнить поле payment и выбрать корректный вариант'));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(new BadRequestError('Некорректный email'));
    }

    if (!email || typeof email !== 'string') {
      return next(new BadRequestError('Емейл не передан или это не строка'));
    }

    if (!phone || typeof phone !== 'string') {
      return next(new BadRequestError('Телефон не передан или это не строка'));
    }

    if (!address || typeof address !== 'string') {
      return next(new BadRequestError('Адрес не передан или это не строка'));
    }

    if (typeof total !== 'number' || Number.isNaN(total)) {
      return next(new BadRequestError('Поле total обязательно и должно быть числом'));
    }

    if (!Array.isArray(items) || items.length === 0) {
      return next(new BadRequestError('Поле items должно быть непустым массивом id товаров'));
    }

    const invalidId = items.find((id) => !mongoose.Types.ObjectId.isValid(id));
    if (invalidId) {
      return next(new BadRequestError(`Некорректный id товара: ${invalidId}`));
    }

    // ищем товары по переданным id и проверяем что у них есть цена и они существуют в базе
    const products = await Product.find({ _id: { $in: items } });

    if (products.length !== items.length) {
      return next(new BadRequestError('Один или несколько товаров не найдены в базе'));
    }

    const notForSale = await products.find((p:any) => p.price === null);
    if (notForSale) {
      return next(new BadRequestError('В заказе есть товар, который не продаётся (price = null)'));
    }

    const calculatedTotal = products.reduce((sum: number, p: any) => sum + (p.price ?? 0), 0);

    if (calculatedTotal !== total) {
      return next(new BadRequestError(`Некорректная сумма заказа. Ожидалось ${calculatedTotal}, получено ${total}`));
    }

    const orderId = faker.string.uuid();
    return res.json({
      id: orderId,
      total,
    });
  } catch (error) {
    return next(error);
  }
};

export default createOrder;
