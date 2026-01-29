import { Router } from 'express';
import { createProduct, getProducts } from '../controllers/product';
import {
  validateCreateProduct,
  validateProductId,
  validateUpdateProduct,
} from '../middlewares/product-validator';

const router = Router();

router.get('/product', getProducts);
router.post(
  '/product',
  validateCreateProduct,
  createProduct,
);

router.patch(
  '/product/:productId',
  validateProductId,
  validateUpdateProduct,
);

router.delete(
  '/product/:productId',
  validateProductId,
);

export default router;
