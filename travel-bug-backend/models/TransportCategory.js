//dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const TransportCategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
 
});

const TransportCategory = mongoose.model("TransportCategory", TransportCategorySchema);
module.exports = TransportCategory;