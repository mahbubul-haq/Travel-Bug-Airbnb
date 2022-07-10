//dependencies
const mongoose = require("mongoose");

const ActivitySchema = new Schema({
  activityTitle: {
    type: String,
    required: true,
  },
  dayTimeSlots: [
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
  activityDuration: {
    noOfHours: {
      type: Number,
    },
    noOfDays: {
      type: Number,
    },
  },
  activityCost: {
    type: String,
    required: true,
    min: 1,
  },
  additionalRequirements: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Activity", ActivitySchema);
