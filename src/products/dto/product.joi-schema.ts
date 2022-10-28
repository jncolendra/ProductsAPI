/* eslint-disable prettier/prettier */
import Joi = require('joi');

export const ProductSchema = Joi.object().keys({
  product_name: Joi.string().min(3).required(),
  product_sku: Joi.string().min(6).required(),
  product_description: Joi.string().min(20).required(),
  product_image: Joi.string().uri().required(),
  product_category: Joi.string().min(3).required(),
}).options({
    abortEarly: false
});
