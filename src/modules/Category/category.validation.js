
import joi from 'joi';
import { generalFields } from '../../middleware/validation.middleware.js';




export const getCategory = joi.object({
    categoryId: generalFields.id,
    details: joi.string(),
    fields: joi.string(),
}).required();


export const createCategory = joi.object({
    name: joi.string().min(2).max(50).required(),
}).required();


export const updateCategory = joi.object({
    categoryId: generalFields.id,
    name: joi.string().min(2).max(50),
    isDeleted: joi.boolean(),
}).required();


export const deleteCategory = joi.object({
    categoryId: generalFields.id,
}).required();
