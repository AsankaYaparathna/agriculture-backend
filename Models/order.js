const mongoose = require("mongoose");
const { model } = mongoose;

const orderSchema = new mongoose.Schema({
  OrderId: {
    type: Number,
    default: 100,
  },
  orderDate: {
    type: String,
  },
  orderTime: {
    type: String,
  },
  orderStatus: {
    type: String,
  },
  customerId: {
    type: Number,
    default: 100,
  },
  orderItemWithQuantityId: {
    type: Number,
    default: 100,
  },
  orderPrice: {
    type: Number,
    default: 100,

}},
{collection:"orders"}
);

// db modle name - schema name
module.exports = model("Order", orderSchema);
