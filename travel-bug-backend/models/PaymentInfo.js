//dependencies
const mongoose = require("mongoose");

const PaymentInfoSchema = new Schema({
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
    type: mongoose.Types.ObjectId,
    ref: "Location",
    required: true,
  },
});

module.exports = mongoose.model("PaymentInfo", PaymentInfoSchema);
