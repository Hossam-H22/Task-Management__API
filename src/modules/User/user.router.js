
import validation from './../../middleware/validation.middleware.js';
import * as userController from './controller/user.js';
import * as validators from "./user.validation.js"
import auth from "./../../middleware/auth.middleware.js";
import { Router } from 'express'

const router = Router();


// router.get(
//     "/all",
//     userController.getUsers,
// );


router.get(
    "/",
    auth(),
    userController.getUser,
);


router.patch(
    "/updatePassword", 
    auth(),
    validation(validators.updatePassword), 
    userController.updatePassword
);




export default router;