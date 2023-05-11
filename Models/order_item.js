const mongoose = require("mongoose");

const orderItemWithQuentitySchema = new mongoose.Schema({
  OrderId: {
    type: Number,
  },
  Quantity: {
    type: Number,
  },
  customerId: {
    type: Number,
  },
  productId: {
    type: Number,

}},
{collection:"orderItemWithQuentitys"}
);

// db modle name - schema name
module.exports = model("OrderItemWithQuentity", orderItemWithQuentitySchema);