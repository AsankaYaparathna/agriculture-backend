const express = require("express")
const productCategoryRoute = express.Router()
const productCategory = require("../Models/productCategory")

productCategoryRoute.route("/create").post((req,res)=>{
    const {productCatrgoryName}=req.body
    const productcategory = new productCategory({
        productCatrgoryName,
    })
    
    productcategory.save().then((productcategory)=>{
        res.status(200).send({status: "success",productcategory})
    }).catch((e)=>{
        res.status(400).send({status: "faliure"})
    })
})



module.exports =productCategoryRoute