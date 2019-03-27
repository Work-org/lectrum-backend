// Core
import { Schema, model } from 'mongoose';

// ODM's
import { season } from './seasons';

// Document shape
const schema = new Schema({
    hash:        String,
    title:       String,
    image:       String,
    seasons:     [{ type: Schema.Types.ObjectId, ref: season.modelName, }],
    description: String,
}, {
    timestamps: {
        createdAt: 'created'
    }
});

// Collection
export const subject = model('subjects', schema);
