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
      startTag: {
        type: String,
        required: true,
      },
      endTag: {
        type: String,
        required: true,
      }
    },
  ],
  transportProvider: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "TransportProvider",
  },
  source: {
    long: {
      type: Number,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    
  },
  destination: {
    long: {
      type: Number,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
  },
  totalCost: {
    type: Number,
    min: 1,
    required: true,
  },
  stopages: [
    {
      long: {
        type: Number,
      },
      lat: {
        type: Number,
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
