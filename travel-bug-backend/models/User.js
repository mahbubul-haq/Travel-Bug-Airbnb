//dependencies
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        // required: true,
    },
    lastName: {
        type: String,
        // required: true,
    },
    phoneNo: {
        type: String,
        // required: true,
        // unique: true,
    },
    nid: {
        type: String,
        // unique: true,
    },
    userDetails: {
        type: String,
    },
    gender: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;