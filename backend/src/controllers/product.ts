import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import Product from '../models/product';
import BadRequestError from '../errors/BadRequestError';
import ConflictError from '../errors/ConflictError';

export const getProducts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find({});
    const total = await Product.countDocuments();

    res.json({
      items: products,
      total,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title, image, category, description, price,
    } = req.body;

    if (!title || !image || !category) {
      return next(new BadRequestError('Ошибка валидации данных при создании товара'));
    }

    const product = await Product.create({
      title,
      image,
      category,
      description,
      price,
    });

    return res.status(201).json(product);
  } catch (error: unknown) {
    // 400 валидация монгус
    if (error instanceof MongooseError.ValidationError) {
      return next(new BadRequestError('Ошибка валидации данных при создании товара'));
    }

    if (error instanceof Error && error.message.includes('E11000')) {
      return next(new ConflictError('Товар с таким title уже существует'));
    }

    // 500 остальное
    return next(error);
  }
};
