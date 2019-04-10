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
            index:    true,
        },
        title: {
            type:     String,
            required: true,
            unique:   true,
        },
        image: String,
        room:  {
            type:     Number,
            required: true,
            index:    true,
        },
        floor:      Number,
        gradebooks: [
            {
                gradebook: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref:  'gradebooks',
                },
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
export const classes = mongoose.model('classes', schema);
