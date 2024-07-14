
import categoryModel from "./../../../../DB/Models/Category.model.js";
import { asyncHandler } from "./../../../utils/errorHandling.js";
import ApiFeatures from "../../../utils/apiFeatures.js";
import taskModel from './../../../../DB/Models/Task.model.js';



export const getCategories = asyncHandler(async (req, res, next) => {
    const totalNumberOfData = await categoryModel.countDocuments({ isDeleted: false });
    const apiFeature = new ApiFeatures(categoryModel.find({createdBy: req.user._id, isDeleted: false }), req.query).populate().filter().search().sort().select().paginate();
    const categoriesList = await apiFeature.mongooseQuery;
    apiFeature.metadata = {
        totalNumberOfData,
        limit: apiFeature.limit,
        numberOfPages: Math.floor(totalNumberOfData/apiFeature.limit) || 1,
        currentPage: apiFeature.page,
    }
    const restPages = Math.floor(totalNumberOfData/apiFeature.limit) - apiFeature.page;
    if(restPages>0) apiFeature.metadata.nextPage = restPages;

    return res.status(200).json({ message: "Done", metadata: apiFeature.metadata, data: categoriesList });
});


export const getCategory = asyncHandler(async (req, res, next) => {
    const { categoryId } = req.params;
    
    // req.query.details = "createdBy,taskId"
    const apiFeature = new ApiFeatures(categoryModel.findOne({_id: categoryId, createdBy: req.user._id, isDeleted: false }), req.query).populate().select();
    const category = await apiFeature.mongooseQuery;

    if(!category.length) {
        return next(new Error('In-valid category Id', { cause: 404 }))
    }

    return res.status(200).json({ message: "Done", category: category[0] });
});


export const createCategory = asyncHandler(async (req, res, next) => {
    const name = req.body.name.toLowerCase();
    if (await categoryModel.findOne({ createdBy: req.user._id, name })) {
        return next(new Error(`Duplicate category name - ${name}`, { cause: 409 }));
    }


    // add new photo data to database
    const category = await categoryModel.create({
        name,
        createdBy: req.user._id,
    });

    if (!category) {
        return next(new Error("Fail to create your category", { cause: 400 }));
    }

    return res.status(201).json({ message: "Done", category });
});


export const updateCategory = asyncHandler(async (req, res, next) => {
    const categoryId = req.params.categoryId;
    const category = await categoryModel.findOne({_id: categoryId, createdBy: req.user._id });
    if (!category) {
        return next(new Error("In-valid category Id", { cause: 404 }));
    }

    if (req.body.name) {
        const name = req.body.name.toLowerCase();
        if (category.name == name) {
            return next(new Error(`Sorry cannot update category with the same name`, { cause: 400 }));
        }
        else if (await categoryModel.findOne({ name, createdBy: req.user._id })) {
            return next(new Error(`Duplicate category name - ${name}`, { cause: 409 }));
        }
        else {
            category.name = name;
        }
    }

    if(req.body.isDeleted){
        const tasks = await taskModel.find({ isDeleted: false, categoryId });
        if(req.body.isDeleted=="true" && tasks?.length){
            return next(new Error("can not delete category because there is subcatrgories or products has this category id", { cause: 400 }));
        }
        category.isDeleted = (req.body.isDeleted=="true")? true : false;
    }

    await category.save();
    return res.status(201).json({ message: "Done", category });
});


