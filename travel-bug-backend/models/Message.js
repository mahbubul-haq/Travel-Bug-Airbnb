//dependencies
const mongoose = require("mongoose");

const MessageSchema = new Schema({
  notificationText: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date.now,
    required: true,
  },
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Message", MessageSchema);
