import * as taskController from './controller/task.js'
import validation from "./../../middleware/validation.middleware.js";
import * as validators from "./task.validation.js"
import auth from "./../../middleware/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.get(
    '/',
    auth(),
    taskController.getTasks,
);

router.get(
    '/:taskId',
    auth(),
    validation(validators.getTask),
    taskController.getTask,
);

router.post(
    "/", 
    auth(),
    validation(validators.createTask),
    taskController.createTask,
);

router.put(
    "/:taskId", 
    auth(),
    validation(validators.updateTask),
    taskController.updateTask,
);




export default router