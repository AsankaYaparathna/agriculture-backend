const express = require("express")
const productCategoryRoute = express.Router()
const productCategory = require("../Models/product_category")

productCategoryRoute.route("/create").post((req,res)=>{
    const {productCatrgoryName}=req.body
    const productcategory = new productCategory({
        productCatrgoryName,
    })
    
    productCategory.save().then((productcategory)=>{
        res.status(200).send({status: "success",productcategory})
    }).catch((e)=>{
        res.status(400).send({status: "faliure"})
    });
});

productCategoryRoute.route("/get-all").get((req,res)=>{
    productCategory.find()
    .then((product) => {
      res.status(200).send({ status: true, data:product });
    })
    .catch((e) => {
      res.status(400).send({ status: false });
    });
});


module.exports =productCategoryRoute