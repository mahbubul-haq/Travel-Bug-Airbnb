//dependencies
const mongoose = require('mongoose');

const LocationSchema = new Schema({
    country:{
        type: String,
        required: true,
    },
    district:{
        type: String,
        required: true,
    },
    thana:{
        type: String,
        required: true,
    },
    zipcode:{
        type: String,
        required: true,
    },
    street:{
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Location', LocationSchema);