// Core
import { Schema, model } from 'mongoose';

// ODM's
import { lesson } from './lessons';

// Document shape
const schema = new Schema({
    hash:        String,
    order:       Number,
    title:       String,
    image:       String,
    lessons:     [{ tpe: Schema.Types.ObjectId, ref: lesson.modelName, }],
    description: String,
}, {
    timestamps: {
        createdAt: 'created'
    }
});

// Collection
export const season = model('seasons', schema);
