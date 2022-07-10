//dependencies
const mongoose = require("mongoose");

const ExperienceHostingSchema = new Schema({
  hostingTitle: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    //required: true,
  },
  hostingDate: {
    type: Date.now,
    required: true,
  },
  draft: {
    type: Boolean,
    required: true,
  },
  indivisualOrTeam: {
    type: String,
    enum: ["indivisual", "team"],
    //required: true,
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
  hostingPhotos: {
    type: [String],
    min: 5,
  },
  host: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  categories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  ],
  activities: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Activity",
    },
  ],
});

module.exports = mongoose.model("ExperienceHosting", ExperienceHostingSchema);
