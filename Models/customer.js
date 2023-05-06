const mongoose = require("mongoose");
const { model } = mongoose;

const customerSchema = new mongoose.Schema({
  customerFirstName: {
    type: String,
  },
  customerLastName: {
    type: String,
  },
  email: {
    type: String,
  },
  customerPhoneNumber: {
    type: String,
  },

    customerPassword: {
    type: String,
  },
   
},
{collection:"customers"}
);

module.exports = model("Customer", customerSchema);
