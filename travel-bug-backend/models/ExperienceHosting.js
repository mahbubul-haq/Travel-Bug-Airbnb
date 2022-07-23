//dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ExperienceHostingSchema = new Schema({
  hostingTitle: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  hostingDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  draft: {
    type: Boolean,
    default: true,
    required: true,
  },
  individualOrTeam: {
    type: String,
    default: "individual",
    enum: ["individual", "team"],
    required: true,
  },
  totalCost: {
    type: Number,
    min: 1,
    required: true,
  },
  itemsToBring: [
    {
      type: String,
    },
  ],
  maxGroupSize: {
    type: Number,
    min: 1,
    default: 1,
    required: true,
  },
  minAge: {
    type: Number,
    min: 1,
  },
  additionalRequirements: [
    {
      type: String,
    },
  ],
  hostingPhotos: [
    {
      type: String,
    }
  ],
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

module.exports = mongoose.model("ExperienceHosting", ExperienceHostingSchema);
