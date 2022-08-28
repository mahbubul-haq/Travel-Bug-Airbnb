//dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ExperienceHostingSchema = new Schema({
  hostingTitle: {
    type: String,
  },

  description: {
    type: String,
  },
  hostingDate: {
    type: Date,
    default: Date.now,
  },
  hostingStartDate: {
    type: Date,
    default: Date.now,
  },
  hostingEndDate: {
    type: Date,
    default: Date.now,
  },
  draft: {
    type: Boolean,
    default: false,
  },
  individualOrTeam: {
    type: String,
    default: "individual",
    enum: ["individual", "team"],
  },
  totalCost: {
    type: Number,
    min: 1,
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
    default: false,
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
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
  }
});

module.exports = mongoose.model("ExperienceHosting", ExperienceHostingSchema);
