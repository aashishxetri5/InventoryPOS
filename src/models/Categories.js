const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    require: true,
  },
  categoryCode: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  categoryImage: {
    type: String,
    require: true,
  },
});

const categoryModel = mongoose.model("Categories", categorySchema);

module.exports = categoryModel;
