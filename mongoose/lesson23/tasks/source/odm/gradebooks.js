import mongoose from 'mongoose';

// Document shape
const schema = new mongoose.Schema(
    {
        hash: {
            type:     String,
            required: true,
            unique:   true,
        },
        image: {
            type:  String,
            match: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
        },
        year: {
            type:     Number,
            min:      new Date().valueOf(),
            max:      new Date(2099, 0, 1).valueOf(),
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
                mark:        {
                    type: Number,
                    min:  0,
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

// Collection
export const gradebooks = mongoose.model('gradebooks', schema);
