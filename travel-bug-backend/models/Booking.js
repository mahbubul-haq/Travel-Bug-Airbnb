//dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookingSchema = new Schema({
  bookingStartDate: {
    type: Date,
    required: true,
  },
  bookingEndDate: {
    type: Date,
    required: true,
  },
  noOfGuests: {
    type: Number,
    min: 1,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    type: mongoose.Types.ObjectId,
    ref: "PaymentInfo",
    required: true,
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
