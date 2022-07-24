//dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const SubCategorySchema = new Schema({
  subCategoryName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    //required: true,
  },
  categoryName: {
    type: String,
    required: true,
    ref: "Category",
  },
  experiences: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExperienceHosting",
    }
  ],
});

const SubCategory = mongoose.model("SubCategory", SubCategorySchema);
module.exports = SubCategory;