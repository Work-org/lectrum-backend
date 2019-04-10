import mongoose from 'mongoose';

// Document shape
const schema = new mongoose.Schema(
    {
        hash: {
            type:     String,
            required: true,
            unique:   true,
        },
        image: String,
        year:  {
            type:     Number,
            required: true,
            index:    true,
        },
        class: {
            type:     String,
            required: true,
            index:    true,
        },
        records: [
            {
                personHash:  mongoose.SchemaTypes.ObjectId,
                teacherHash: mongoose.SchemaTypes.ObjectId,
                subjectHash: mongoose.SchemaTypes.ObjectId,
                seasonHash:  mongoose.SchemaTypes.ObjectId,
                lessonHash:  mongoose.SchemaTypes.ObjectId,
                mark:        Number,
            },
        ],
        description: String,
    },
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'modified',
        },
    },
);

// Collection
export const gradebooks = mongoose.model('gradebooks', schema);
