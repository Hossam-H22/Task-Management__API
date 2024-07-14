

import userRouter from "./modules/User/user.router.js"
import authRouter from "./modules/Auth/auth.router.js"
import categoryRouter from "./modules/Category/category.router.js"
import taskRouter from "./modules/Task/task.router.js"
import connectDB from './../DB/connection.js';
import { globalErrorHandling } from "./utils/errorHandling.js";
import morgan from "morgan"
import cors from 'cors'



const initApp = (app, express) => {

    // allow acces from anywhere
    app.use(cors({})); 


    // to calculate request time
    if (process.env.MOOD == "DEV") {
        app.use(morgan("dev"));
    }
    else {
        app.use(morgan("common"));
    }


    // convert Buffer Data
    app.use(express.json());


    // App Routing
    app.get('/', (req, res) => res.status(200).json({ message: 'Welcomme to Task Manager App' }));
    app.use("/user", userRouter);
    app.use("/auth", authRouter);
    app.use("/category", categoryRouter);
    app.use("/task", taskRouter);


    app.all("*", (req, res, next) => {
        return res.status(404).json({ message: "In-valid routing please check url" });
    });

    // Error handling middleware
    app.use(globalErrorHandling);

    // Connection DB
    connectDB();
}

export default initApp