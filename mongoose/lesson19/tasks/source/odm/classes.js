// Core
import { Schema, model } from 'mongoose';

// ODM's
import { gradebook } from "./gradebooks";

// Document shape
const schema = new Schema({
    hash:        String,
    order:       Number,
    title:       String,
    image:       String,
    room:        Number,
    floor:       String,
    gradebooks:  [{ type: Schema.Types.ObjectId, ref: gradebook.modelName }],
    description: String,
}, {
    timestamps: {
        createdAt: 'created'
    }
});

// Collection
export const classModel = model('classes', schema);
