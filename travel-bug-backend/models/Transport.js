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
      start: {
        type: String,
        required: true,
      },
      end: {
        type: String,
        required: true,
      },
    },
  ],
  transportProvider: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "TransportProvider",
  },

  route: [
    {
      source: {
        longitude: {
          type: Number,
        },
        latitude: {
          type: Number,
        },
        required: true,
      },
      destination: {
        longitude: {
          type: Number,
        },
        latitude: {
          type: Number,
        },
        required: true,
      },
      cost: {
        type: Number,
        min: 1,
        required: true,
      },
    },
  ],

});

const Transport = mongoose.model("Transport", TransportSchema);
module.exports = Transport;
