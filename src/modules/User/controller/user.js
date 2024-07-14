

import { compare, hash } from './../../../utils/hashAndCompare.js';
import { asyncHandler } from './../../../utils/errorHandling.js';
import userModel from './../../../../DB/Models/User.model.js';
import ApiFeatures from './../../../utils/apiFeatures.js';


// export const getUsers = asyncHandler(async (req, res, next) => {
//     const totalNumberData = await userModel.countDocuments();
//     const apiFeature = new ApiFeatures(userModel.find(), req.query).select().paginate();
//     const usersList = await apiFeature.mongooseQuery;
//     apiFeature.metadata = {
//         totalNumberData,
//         limit: apiFeature.limit,
//         numberOfPages: Math.floor(totalNumberData/apiFeature.limit) || 1,
//         currentPage: apiFeature.page,
//     }
//     const restPages = Math.floor(totalNumberData/apiFeature.limit) - apiFeature.page;
//     if(restPages>0) apiFeature.metadata.nextPage = restPages;

//     return res.status(200).json({ message: "Done", metadata: apiFeature.metadata, data: usersList });
// });


export const getUser = asyncHandler(async (req, res, next) => {
    const apiFeature = new ApiFeatures(userModel.findById(req.user._id), req.query).select();
    const user = await apiFeature.mongooseQuery;
    return res.status(200).json({ message: "Done", user })
});


export const updatePassword = asyncHandler(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const user = await userModel.findById(req.user._id);
    const match = compare({ plainText: oldPassword, hashValue: user.password })
    if (!match) {
        return next(new Error("In-valid old password", { case: 400 }));
    }
    const hashPassword = hash({ plainText: newPassword })
    user.password = hashPassword;
    user.changePasswordTime = Date.now();
    await user.save();

    return res.status(200).json({ message: "Done" });
});

