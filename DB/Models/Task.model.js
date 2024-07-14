
import { Schema, Types, model } from "mongoose";
import mongoose from 'mongoose'

const taskSchema = new Schema({
    name: { type: String, required: true, trim: true, lowercase: true, },
    body: [{ type: String, required: true, lowercase: true, }],
    isShared: { type: Boolean, default: false, },
    isFinished: { type: Boolean, default: false, },
    isDeleted: { type: Boolean, default: false, },
    categoryId: { type: Types.ObjectId, ref:'Category', required: true, },
    createdBy: { type: Types.ObjectId, ref:'User', required: true, },
}, {
    timestamps: true,
});


const taskModel = mongoose.models.Task || model('Task', taskSchema);

export default taskModel;