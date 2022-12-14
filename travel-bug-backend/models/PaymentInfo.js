//dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const PaymentInfoSchema = new Schema({
  bookingID: {
    type: mongoose.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  paidAmount: {
    type: Number,
    min: 1,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  billingAddress: {
    type:Object,
    required: true,
  },
});

const PaymentInfo = mongoose.model("PaymentInfo", PaymentInfoSchema);
module.exports = PaymentInfo;
