
import { generalFields } from './../../middleware/validation.middleware.js';
import joi from 'joi';

export const headers = joi.object({
    authorization: joi.string().required(),
}).required();


export const getTask = joi.object({
    taskId: generalFields.id,
    details: joi.string(),
}).required();


export const createTask = joi.object({
    categoryId: generalFields.id,
    name: joi.string().min(2).max(50).required(),
    body: joi.alternatives().try(
        joi.array().items(joi.string()),
        joi.string().min(5),
    ).required(),
    isShared: joi.boolean(),
}).required();


export const updateTask = joi.object({
    taskId: generalFields.id,
    categoryId: generalFields.id,
    name: joi.string().min(2).max(50),
    body: joi.alternatives().try(
        joi.array().items(joi.string()),
        joi.string().min(5),
    ),

    isShared: joi.boolean(),
    isFinished: joi.boolean(),
    isDeleted: joi.boolean(),
}).required();