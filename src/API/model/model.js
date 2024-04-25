const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter product name"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
