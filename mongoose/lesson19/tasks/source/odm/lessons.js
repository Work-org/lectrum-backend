// Core
import { Schema, model } from 'mongoose';

// ODM's
import { subject } from "./subjects";
import { season } from "./seasons";

// Document shape
const schema = new Schema({
    hash:     String,
    order:    Number,
    title:    String,
    image:    String,
    subjects: [{ type: Schema.Types.ObjectId, ref: subject.modelName }],
    seasons:  [{ type: Schema.Types.ObjectId, ref: season.modelName, }],
}, {
    timestamps: {
        createdAt: 'created'
    }
});

// Collection
export const lesson = model('lessons', schema);
