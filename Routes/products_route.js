const express = require("express")
const productsRoute = express.Router()
const Products = require("../Models/products")

productsRoute.route("/save").post((req,res)=>{
    const {productName,price,productImage,description,productCatogoryId,AvailableQuantity,sellerId}=req.body
    const products = new Products({
        productName,
        price,
        productImage,
        description,
        productCatogoryId,
        AvailableQuantity,
        sellerId
    })
    
    products.save().then((products)=>{
        res.status(200).send({status: "success",products})
    }).catch((e)=>{
        res.status(400).send({status: "faliure"})
    })
})



module.exports =productsRoute