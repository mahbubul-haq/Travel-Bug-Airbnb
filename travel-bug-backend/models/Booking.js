//dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookingSchema = new Schema({
  hostingID: {
    type: mongoose.Types.ObjectId,
    ref: "ExperienceHosting",
    required: true,
  },
  bookingStartDate: {
    type: Date,
    required: true,
  },
  bookingEndDate: {
    type: Date,
    //required: true,
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
  // paymentInfo: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "PaymentInfo",
  //   //required: true,
  // },
  selectedActivities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
    },
  ],
  status: {
    type: String,

    enum : ['waiting','approved','rejected','completed'],
    default: 'waiting'
},
cost : {
  type: Number,
  min:1,
  required: true,
},

  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  cost: {
    type: Number,
    min: 1,
    required: true,
  },

});
const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
