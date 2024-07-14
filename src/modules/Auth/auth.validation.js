
import joi from 'joi'
import { generalFields } from './../../middleware/validation.middleware.js';




export const signup = joi.object({
    userName: generalFields.userName.required(),
    email: generalFields.email,
    password: generalFields.password,
    cPassword: generalFields.cPassword.valid(joi.ref('password')),
    frontUrl: joi.string(),
}).required();


export const login = joi.object({
    email: generalFields.email,
    password: generalFields.password,
}).required();

export const loginWithGmail = joi.object({
    idToken: joi.string().min(1).required(),
}).required();


export const confirmation = joi.object({
    frontUrl: joi.string(),
    token: joi.string().required(),
}).required();

export const forgetPassword = joi.object({
    email: generalFields.email,
}).required();

export const resetPassword = joi.object({
    email: generalFields.email,
    password: generalFields.password,
    cPassword: generalFields.cPassword.valid(joi.ref('password')),
    forgetCode: joi.string().pattern(new RegExp(/^[1-9]{4}$/)).required(),
}).required();