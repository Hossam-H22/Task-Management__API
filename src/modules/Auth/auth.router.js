
import { Router } from 'express'
import * as authController from './controller/auth.js';
import validation from '../../middleware/validation.middleware.js';
import * as validators from './auth.validation.js';



const router = Router();

router.post(
    "/signup",
    validation(validators.signup),
    authController.signup
);


router.post(
    "/login",
    validation(validators.login),
    authController.login
);

router.get(
    "/confirmEmail/:token",
    validation(validators.confirmation),
    authController.confirmEmail
);

router.get(
    "/newConfirmEmail/:token",
    validation(validators.confirmation),
    authController.newConfirmEmail
);

router.patch(
    "/forgetPassword",
    validation(validators.forgetPassword),
    authController.forgetPassword
);

router.patch(
    "/resetPassword",
    validation(validators.resetPassword),
    authController.resetPassword
);






export default router;