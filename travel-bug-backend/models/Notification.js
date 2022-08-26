//dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotificationSchema = new Schema({
  notificationTitle: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  unread: {
    type: Boolean,
    default: true,
    required: true,
  },
  bookingID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;
