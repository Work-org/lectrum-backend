// Core
import { Schema, model } from 'mongoose';

// ODM's
import { subject } from './subjects';

// Document shape
const schema = new Schema({
    hash:        String,
    name:        {
        first: String,
        last:  String
    },
    image:       String,
    dateOfBirth: Date, // Date
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
    subjects:    [{ type: Schema.Types.ObjectId, ref: subject.modelName }],
    description: String,
    started:     Date, // Date
}, {
    timestamps: {
        createdAt: 'created'
    }
});

// Collection
export const teacher = model('teachers', schema);
