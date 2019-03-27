// Core
import { Schema, model } from 'mongoose';

// ODM's
import { parent } from "./parents";
import { classModel } from "./classes";

// Document shape
const schema = new Schema({
    hash:        String,
    name:        {
        first: String,
        last:  String
    },
    image:       String,
    dateOfBirth: Date,
    emails:      [new Schema({
        email:   String,
        primary: { type: Boolean, default: false }
    })],
    phones:      [new Schema({
        phone:   String,
        primary: { type: Boolean, default: false }
    })],
    sex:         {
        type: String,
        enum: ['male', 'female', 'trans']
    },
    social:      {
        facebook: String,
        linkedIn: String,
        skype:    String,
        telegram: String
    },
    class:       { type: Schema.Types.ObjectId, ref: classModel.modelName, },
    parents:     [{ type: Schema.Types.ObjectId, ref: parent.modelName }],
    description: String,
    started:     Date,
}, {
    timestamps: {
        createdAt: 'created'
    }
});

// Collection
export const person = model('persons', schema);
