const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  // Define the schema for the inventory of a hospital

  itemname: {
    type: "String",
    required: true,
  },

  category: {
    type: "String",
    required: true,
  },

  subCategory: {
    type: "String",
    required: true,
  },

  brand: {
    type: "String",
    required: true,
  },

  unit: {
    type: "String",
    required: true,
  },

  sku: {
    type: "String",
    required: true,
  },

  minimumQty: {
    type: "Number",
    required: true,
  },

  quantity: {
    type: "Number",
    required: true,
  },

  description: {
    type: "String",
    required: false,
  },

  tax: {
    type: "Number",
    required: true,
  },

  discount: {
    type: "Number",
    default: 0,
    required: true,
  },

  price: {
    type: "Number",
    required: true,
  },

  status: {
    type: "String",
    enum: ["Open", "Closed"],
    required: true,
  },

  itemImage: {
    type: "String",
    required: false,
  },
});

module.exports = mongoose.model("Items", itemSchema);
