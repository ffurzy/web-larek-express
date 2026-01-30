import { celebrate, Joi, Segments } from 'celebrate';

const createProductSchema = Joi.object({
  title: Joi.string().required().min(2).max(30),
  image: Joi.object({
    fileName: Joi.string().required(),
    originalName: Joi.string().required(),
  }).required(),

  category: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  price: Joi.number().allow(null),
});

const productIdSchema = Joi.object({
  productId: Joi.string().hex().length(24).required(),
});

const updateProductSchema = Joi.object({
  title: Joi.string().min(2).max(30),
  image: Joi.object({
    fileName: Joi.string(),
    originalName: Joi.string(),
  }),
  category: Joi.string(),
  description: Joi.string().allow(''),
  price: Joi.number().allow(null),
}).min(1);

export const validateCreateProduct = celebrate({
  [Segments.BODY]: createProductSchema,
});

export const validateProductId = celebrate({
  [Segments.PARAMS]: productIdSchema,
});

export const validateUpdateProduct = celebrate({
  [Segments.BODY]: updateProductSchema,
});
