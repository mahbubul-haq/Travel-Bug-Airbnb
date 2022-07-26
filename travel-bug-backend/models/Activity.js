//dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ActivitySchema = new Schema({
  activityTitle: {
    type: String,
    required: true,
  },
  dayTimeSlots: {
    type: Object
  }
  ,
  activityDuration: {
   type: Object,
  },
  activityCost: {
    type: Number,
    required: true,
    min: 1,
  },
  additionalRequirements: [
    {
      type: String,
    },
  ],
  hostingId :
  {
    type: mongoose.Schema.Types.ObjectId,
    ref:"ExperienceHosting"
  }
});

const Activity = mongoose.model("Activity", ActivitySchema);
module.exports = Activity;