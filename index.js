const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();;
const cors = require("cors");
const customerRoute = require("./Routes/cutomer_route");
const feedbackRoute = require("./Routes/feedback_route");
const productCategoryRoute = require("./Routes/product_category_route")
const sellerRoute = require("./Routes/seller_route");
const productsRoute = require("./Routes/products_route");
const contactUsRoute = require("./Routes/contactUs_route");

const app = express();
const PORT = 5001;

mongoose.connect(process.env.con)

const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database Successfully"));

app.use(cors());
app.use(express.json());
app.use("/customer", customerRoute);
app.use("/feedback", feedbackRoute);
app.use("/catergory",productCategoryRoute);
app.use("/seller",sellerRoute);
app.use("/products", productsRoute);
app.use("/contactUs", contactUsRoute);


app.listen(PORT, () => {
  console.log("Server is running on Port:", PORT);
});
