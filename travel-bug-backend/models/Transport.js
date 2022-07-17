//dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const TransportSchema = new Schema({
  transportName: {
    type: String,
    required: true,
  },

  transportCategory: {
    type: String,
    required: true,
  },
  timeSlots: [
    {
      startTime: {
        type: Date,
        required: true,
      },
      endTime: {
        type: Date,
        required: true,
      },
    },
  ],
  route: [
    {
      source: {
        type: String,
        required: true,
      },
      destination: {
        type: String,
        required: true,
      },
    },
  ],
  cost: {
    type: Number,
    min: 1,
    required: true,
  },
});

const Transport = mongoose.model("Transport", TransportSchema);
module.exports = Transport;
