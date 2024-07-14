import { Router } from "express";
import * as categoryController from './controller/category.js'
import validation from "./../../middleware/validation.middleware.js";
import * as validators from "./category.validation.js"
import auth from "../../middleware/auth.middleware.js";

const router = Router()


router.get(
    '/',
    auth(),
    categoryController.getCategories,
); 

router.get(
    '/:categoryId',
    auth(),
    validation(validators.getCategory),
    categoryController.getCategory,
); 

router.post(
    "/", 
    auth(),
    validation(validators.createCategory),
    categoryController.createCategory,
);

router.put(
    "/:categoryId", 
    auth(),
    validation(validators.updateCategory),
    categoryController.updateCategory,
);




export default router