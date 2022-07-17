//dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
});

const PaymentInfo = mongoose.model("PaymentInfo", PaymentInfoSchema);
module.exports = PaymentInfo;
