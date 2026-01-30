import { Router } from 'express';
import { createProduct, getProducts } from '../controllers/product';
import {
  validateCreateProduct,
  validateProductId,
  validateUpdateProduct,
} from '../middlewares/product-validator';

const router = Router();

router.get('/', getProducts);
router.post(
  '/',
  validateCreateProduct,
  createProduct,
);

router.patch(
  '/:productId',
  validateProductId,
  validateUpdateProduct,
);

router.delete(
  '/:productId',
  validateProductId,
);

export default router;
