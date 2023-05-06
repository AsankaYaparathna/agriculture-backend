const mongoose = require("mongoose");
const { model } = require("mongoose");
const customer = require("./customer")
const seller = require ("./seller")

const FeedbackSchema = new mongoose.Schema({
  feedbackStarCount: {
    type: Number,
  },
  customerId: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "customer",
},
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seller",
},

},
{collection:"feedbacks"}
);

// db model name - schema name
module.exports = model("Feedback", FeedbackSchema);
