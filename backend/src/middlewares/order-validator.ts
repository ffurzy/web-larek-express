import { celebrate, Joi, Segments } from 'celebrate';

const createOrderSchema = Joi.object({
  payment: Joi.string().valid('card', 'online').required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  total: Joi.number().required(),
  items: Joi.array()
    .items(Joi.string().hex().length(24))
    .min(1)
    .required(),
});

const validateCreateOrder = celebrate({
  [Segments.BODY]: createOrderSchema,
});

export default validateCreateOrder;
