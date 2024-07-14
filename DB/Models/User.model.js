
import { Schema, Types, model } from "mongoose";
import mongoose from 'mongoose'

const userSchema = new Schema({
    userName: {
        type: String,
        required: [true, 'userName is required'],
        min: [2, "minimum length 2 char"],
        max: [20, "maximum length 20 char"],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'email must be unique value'],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    confirmEmail: {
        type: Boolean,
        default: false,
    },
    forgetCode: {
        type: Number,
        default: null,
    },
    changePasswordTime: {
        type: Date,
    },
    
}, {
    timestamps: true,
});

userSchema.virtual('taskId', {
    localField: "_id",
    foreignField: "createdBy",
    ref: "Task",
});

userSchema.virtual('categoryId', {
    localField: "_id",
    foreignField: "createdBy",
    ref: "Category",
});


const userModel = mongoose.models.User || model('User', userSchema);

export default userModel;