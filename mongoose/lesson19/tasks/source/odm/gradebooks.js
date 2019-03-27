// Core
import { Schema, model } from 'mongoose';
import { classModel, person, teacher, subject, season, lesson } from "./";

// ODM's

// Document shape
const schema = new Schema({
    hash:    String,
    image:   String,
    yesr:    Number,
    class:   { type: Schema.Types.ObjectId, ref: classModel.modelName, },
    records: [{
        personHash:  { type: Schema.Types.ObjectId, ref: person.modelName, },
        teacherHash: { type: Schema.Types.ObjectId, ref: teacher.modelName, },
        subjectHash: { type: Schema.Types.ObjectId, ref: subject.modelName, },
        seasonHash:  { type: Schema.Types.ObjectId, ref: season.modelName, },
        lessonHash:  { type: Schema.Types.ObjectId, ref: lesson.modelName, },
        mark:        Number
    }],
}, {
    timestamps: {
        createdAt: 'created'
    }
});

// Collection
export const gradebook = model('gradebooks', schema);
