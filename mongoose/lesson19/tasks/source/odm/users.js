import mongoose from 'mongoose';

// Document shape
const schema = new mongoose.Schema({
    email: {
        type:     String,
        required: true,
        unique:   true,
    },
    password: {
        type: String,
    },
});

// Collection
export const users = mongoose.model('users', schema);
