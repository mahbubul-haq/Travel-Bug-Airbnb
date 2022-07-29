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
  hostingDuration: {
      type: Object,
  },
  hostAvailability: {
    type: Object,
  },
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
  maxRefundDays: {
    type: Number,
    min: 1,
  },
  partialPayAllowed: {
    type: Boolean,
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
  subCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    }
  ],
  activities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
    }
  ],
});

module.exports = mongoose.model("ExperienceHosting", ExperienceHostingSchema);
