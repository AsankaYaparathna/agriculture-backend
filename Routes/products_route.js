const express = require("express")
const productsRoute = express.Router()
const Products = require("../Models/products")
const productCategory = require("../Models/product_category")

productsRoute.route("/save").post((req,res)=>{

    const {productName,price,productImage,description,productCatogoryId,availableQuantity,sellerId}=req.body
    const Product = new Products({
        productName,
        price,
        productImage,
        description,
        productCatogoryId,
        availableQuantity,
        sellerId
    });

    
    
    Product.save().then((product)=>{
        res.status(200).send({status: "success",product})
    }).catch((e)=>{
        res.status(400).send({status: "faliure"})
    })
});

productsRoute.route("/get-all").get((req, res) => {
    Products.find()
      .then((product) => {
        res.status(200).send({ status: true, data:product });
      })
      .catch((e) => {
        res.status(400).send({ status: false });
      });
  });


productsRoute.route("/user-produts/:id").get((req,res)=>{
    const { id } = req.params;
    Products.find({sellerId : id})
    .then((model) => {
        //console.log(model);
        if(Array.isArray(model) && model.length > 0){
            res.status(200).send({ status: true, data: model });
        }
        else{
            res.status(400).send({ status: false });
        }
      
    })
    .catch((e) => {
      res.status(400).send({ status: false });
    });
  });
  
  productsRoute.route("/user-produts-withCategory/:id").get((req,res)=>{
    const { id } = req.params;
    var cat = productCategory.find();

    console.log('cat',cat);
    Products.find({sellerId : id})
    .then((model) => {
       // console.log(model);
        if(Array.isArray(model) && model.length > 0){
            res.status(200).send({ status: true, data: model });
        }
        else{
            res.status(400).send({ status: false });
        }
      
    })
    .catch((e) => {
      res.status(400).send({ status: false });
    });
  });
  

module.exports =productsRoute