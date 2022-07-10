//dependencies
const mongoose = require("mongoose");

const NotificationSchema = new Schema({
  notificationTitle: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date.now,
    required: true,
  },
  destinationLink: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Notification", NotificationSchema);
