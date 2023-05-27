const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const seller = require("./seller"); 

const modelSchema = new Schema({
  title: { type: String, },
  massage: { type: String, },
  sellerId: { type: Schema.Types.ObjectId, ref: "seller", },
}, {
  collection: "contactUs"
});

module.exports = model("ContactUs", modelSchema);
