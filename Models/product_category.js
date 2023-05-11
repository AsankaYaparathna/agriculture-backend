const mongoose = require("mongoose");
const { model } = mongoose;

const prodoutCategorySchema = new mongoose.Schema({
  productCatrgoryName: {
    type: String,
  },
},
{collection:"productCategories"}
);

// db modle name - schema name
module.exports = model("productCategory", prodoutCategorySchema);
