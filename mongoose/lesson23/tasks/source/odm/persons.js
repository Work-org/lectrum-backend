import mongoose from 'mongoose';

// Document shape
const schema = new mongoose.Schema(
    {
        hash: {
            type:     String,
            required: true,
            unique:   true,
        },
        name: {
            first: {
                type:      String,
                required:  true,
                minlength: 2,
                maxlength: 15,
            },
            last: {
                type:      String,
                required:  true,
                minlength: 2,
                maxlength: 15,
            },
        },
        image: {
            type:  String,
            match: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
        },
        dateOfBirth: {
            type: Date,
            max:  [
                () => new Date().setFullYear(new Date().getFullYear() + 1), // mim 5 year old
                'person should be 5 year',
            ],
        },
        emails: [
            {
                email: {
                    type:     String,
                    match:    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    required: true,
                    unique:   true,
                },
                primary: Boolean,
            },
        ],
        phones: [
            {
                phone:   String,
                primary: Boolean,
            },
        ],
        sex: {
            type: String,
            enum: [ 'm', 'f' ],
        },
        social: {
            facebook: String,
            linkedIn: String,
            skype:    String,
            telegram: String,
        },
        class:   mongoose.SchemaTypes.ObjectId,
        parents: [
            {
                parent: mongoose.SchemaTypes.ObjectId,
            },
        ],
        description: {
            type:      String,
            maxlength: 250,
        },
        started: Date,
    },
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'modified',
        },
    },
);

schema.index({ 'name.first': 1, 'name.last': 1 });

// Collection
export const persons = mongoose.model('persons', schema);
