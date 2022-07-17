//dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const LocationSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  thana: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
});

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;
