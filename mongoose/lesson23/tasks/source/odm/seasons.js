import mongoose from 'mongoose';

// Document shape
const schema = new mongoose.Schema(
    {
        hash: {
            type:     String,
            required: true,
            unique:   true,
        },
        order: {
            type:     Number,
            required: true,
        },
        title: {
            type:     String,
            required: true,
            unique:   true,
        },
        image:   String,
        subject: {
            type:     mongoose.SchemaTypes.ObjectId,
            required: true,
        },
        lessons: [
            {
                lesson: mongoose.SchemaTypes.ObjectId,
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

schema.index({ title: 'text', description: 'text' });

// Collection
export const seasons = mongoose.model('seasons', schema);
