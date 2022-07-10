//dependencies
const mongoose = require("mongoose");

const CategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },

  subCategoryName: {
    type: String,
    //required: true,
  },
  description: {
    type: String,
    //required: true,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
