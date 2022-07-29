//dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    //required: true,
  },
  subCategories: [ 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    }
  ],
  experiences: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExperienceHosting",
    }
  ],
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;