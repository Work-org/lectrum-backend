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
            min:      0,
            required: true,
            index:    true,
        },
        title: {
            type:      String,
            required:  true,
            unique:    true,
            maxlength: 30,
        },
        image: {
            type:  String,
            match: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
        },
        room: {
            type:     Number,
            min:      0,
            required: true,
            index:    true,
        },
        floor: {
            type: Number,
            min:  0,
        },
        gradebooks: [
            {
                gradebook: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref:  'gradebooks',
                },
            },
        ],
        description: {
            type:      String,
            maxlength: 250,
        },
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
