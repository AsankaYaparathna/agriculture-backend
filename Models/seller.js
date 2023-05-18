const mongoose = require("mongoose");
const { model } = mongoose;

const sellerSchema = new mongoose.Schema({
  sellerFirstName: {type: String,},
  sellerLastName: {type: String,},
  sellerImage: {type: String,},
  AvailableQuantity: {type: Number,},
  sellerAdddress: {type: String,},
  sellerContactNumber: {type: String,},
  sellerLocation: {type: String,},
  sellerPassword: {type: String,},
  sellerEmail: {type: String,},
},
{collection:"sellers"}
);
const Seller = mongoose.model('seller', sellerSchema);
// db modle name - schema name
module.exports = model("seller", sellerSchema);
//module.exports = Seller;