//dependencies
const mongoose = require("mongoose");
const User = require("./User");

const EmergencyContactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  relationship: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  // user:{
  //     type: mongoose.Types.ObjectId,
  //     required: true,
  //     ref: "User",
  // },
});

module.exports = mongoose.model("EmergencyContact", EmergencyContactSchema);
