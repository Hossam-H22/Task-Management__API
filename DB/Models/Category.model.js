
import { Schema, Types, model } from "mongoose";
import mongoose from 'mongoose'

const categorySchema = new Schema({
    name: { type: String, required: true, trim: true, lowercase: true,},
    createdBy: { type: Types.ObjectId, ref:'User', required: true, },
    isDeleted: { type: Boolean, default: false, },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
});

categorySchema.virtual('taskId', {
    localField: "_id",
    foreignField: "categoryId",
    ref: "Task",
});


const categoryModel = mongoose.models.Category || model('Category', categorySchema);

export default categoryModel;