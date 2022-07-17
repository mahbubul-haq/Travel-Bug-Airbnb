//dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessageSchema = new Schema({
  messageText: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;