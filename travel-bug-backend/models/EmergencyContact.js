//dependencies
const mongoose = require('mongoose');

const EmergencyContactSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    relationship:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phoneNo:{
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('EmergencyContact', EmergencyContactSchema);