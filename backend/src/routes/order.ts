import { Router } from 'express';
import { createOrder } from '../controllers/order';
import validateCreateOrder from '../middlewares/order-validator';

const router = Router();

router.post('/', validateCreateOrder, createOrder);

export default router;
