
import taskModel from "../../../../DB/Models/Task.model.js";
import categoryModel from "./../../../../DB/Models/Category.model.js";
import { asyncHandler } from "./../../../utils/errorHandling.js";
import ApiFeatures from './../../../utils/apiFeatures.js';



export const getTasks = asyncHandler(async (req, res, next) => {
    const totalNumberOfData = await taskModel.countDocuments({ isDeleted: false });
    // req.query.details='categoryId';
    const apiFeature = new ApiFeatures(taskModel.find({createdBy: req.user._id, isDeleted: false }), req.query).populate().filter().search().sort().select().paginate();
    const taskList = await apiFeature.mongooseQuery;
    apiFeature.metadata = {
        totalNumberOfData,
        limit: apiFeature.limit,
        numberOfPages: Math.floor(totalNumberOfData/apiFeature.limit) || 1,
        currentPage: apiFeature.page,
    }
    const restPages = Math.floor(totalNumberOfData/apiFeature.limit) - apiFeature.page;
    if(restPages>0) apiFeature.metadata.nextPage = restPages;

    return res.status(200).json({ message: "Done", metadata: apiFeature.metadata, data: taskList });
});

export const getTask = asyncHandler(async (req, res, next) => {
    const { taskId } = req.params;

    // req.query.details = "createdBy,categoryId"
    const apiFeature = new ApiFeatures(taskModel.findOne({_id: taskId, isDeleted: false }), req.query).populate();
    let task = await apiFeature.mongooseQuery;

    if(!task.length || task[0].isDeleted || (!task[0].isShared && !task[0].createdBy.equals(req.user._id)) ) {
        return next(new Error('In-valid task Id', { cause: 404 }))
    }
    return res.status(200).json({ message: "Done", task: task[0]});
});

export const createTask = asyncHandler(async (req, res, next) => {
    const { categoryId } = req.body;

    if(!await categoryModel.findOne({ _id: categoryId, isDeleted: false })) {
        return next(new Error("In-valid category Id", { cause: 400 }));
    }

    const name = req.body.name.toLowerCase();

    if(await taskModel.findOne({name, categoryId, isDeleted: false})){
        return next(new Error(`Duplicate task name - ${name}`, { cause: 409 }));
    }

    if(req.body.deadline){
        req.body.deadline = new Date(req.body.deadline);
    }

    const task = await taskModel.create({ 
        ...req.body,
        createdBy: req.user._id,
    });

    if(!task) {
        return next(new Error("Fail to create your task", { cause: 400 }));
    }

    return res.status(201).json({ message: "Done", task});
});

export const updateTask = asyncHandler(async (req, res, next) => {
    const { taskId } = req.params;
    const { categoryId } = req.body;

    const task = await taskModel.findOne({ _id:taskId, categoryId, createdBy: req.user._id });
    if(!task) {
        return next(new Error("In-valid task Id", { cause: 400 }));
    }
    
    if(req.body.name){
        const name = req.body.name.toLowerCase();
        if(task.name == name) {
            return next(new Error(`Sorry cannot update task with the same name`, { cause: 400 }));
        }
        else if(await taskModel.findOne({name, categoryId, isDeleted: false})){
            return next(new Error(`Sorry cannot add task with the same name of another task`, { cause: 400 }));
        }
        else {
            task.name = name;
        }
    }

    if(req.body.isDeleted){
        task.isDeleted = (req.body.isDeleted=="true")? true : false;
    }

    if(req.body.isShared){
        task.isShared = (req.body.isShared=="true")? true : false;
    }

    if(req.body.isFinished){
        task.isFinished = (req.body.isFinished=="true")? true : false;
    }

    if(req.body.body){
        task.body = req.body.body;
    }

    if(req.body.deadline){
        task.deadline = new Date(req.body.deadline);
    }
    

    await task.save();
    return res.status(201).json({ message: "Done", task});
});




