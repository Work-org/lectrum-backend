import mongoose from 'mongoose';
import { validatorPath } from '../helpers';

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
                () => Date.now() - 5.6802514 * 1e11,
                'teacher should be 18 years',
            ],
        },
        emails: [
            {
                email: {
                    match:    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    type:     String,
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
        subjects: [
            {
                subject: mongoose.SchemaTypes.ObjectId,
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

schema.path('phones').validate(function(value) {
    const regex = /^38\d{3}-\d{3}-\d{4}$/;

    const isValid = value.every(({ phone }) => regex.test(phone));

    return isValid;
}, 'Phone should have format 38XXX-XXX-XXXX');
schema.path('subjects').validate(validatorPath('subject'));

// Collection
export const teachers = mongoose.model('teachers', schema);
