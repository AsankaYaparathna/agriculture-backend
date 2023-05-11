const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const productCategory = require("./product_category");
const seller = require("./seller"); 

const prodoutsSchema = new Schema({
  productName: {
    type: String,
  },
  price: {
    type: Number,
  },
  productImage: {
    type: String,
  },
  description: {
    type: String,
  },
  productCatogoryId: {
    type: Schema.Types.ObjectId,
    ref: "productCategory",
  },
  AvailableQuantity: {
    type: Number,
  },
    sellerId: {
    type: Schema.Types.ObjectId,
    ref: "seller",
  },
}, {
  collection: "products"
});

module.exports = model("Products", prodoutsSchema);
