const express = require("express")
const productsRoute = express.Router()
const model = require("../Models/products")
const productCategory = require("../Models/product_category")

productsRoute.route("/save").post((req,res)=>{

    // const {productName,price,productImage,description,productCatogoryId,availableQuantity,sellerId}=req.body
    // const Product = new Products({
    //     productName,
    //     price,
    //     productImage,
    //     description,
    //     productCatogoryId,
    //     availableQuantity,
    //     sellerId
    // });

    
    
    model.create(req.body).then((product)=>{
        res.status(200).send({status: "success",product})
    }).catch((e)=>{
        res.status(400).send({status: "faliure"})
    })
});

productsRoute.route("/get-all").get((req, res) => {
  model.find()
      .then((product) => {
        res.status(200).send({ status: true, data:product });
      })
      .catch((e) => {
        res.status(400).send({ status: false });
      });
  });


productsRoute.route("/user-produts/:id").get((req,res)=>{
    const { id } = req.params;
    model.find({sellerId : id})
    .then((model) => {
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

  productsRoute.route("/user-produts-count/:id").get(async (req, res) => {
    try {
      const { id } = req.params;
      let fruitCount = 0;
      let vegCount = 0;
      let otherCount = 0;
  
      const modelP = await model.find({ sellerId: id });
  
      if (Array.isArray(modelP) && modelP.length > 0) {
        const modelC = await productCategory.find();
  
        if (Array.isArray(modelC) && modelC.length > 0) {
          const catFruit = modelC.find((product) => product.productCatrgoryName === 'fruits');
          const catVeg = modelC.find((product) => product.productCatrgoryName === 'vegitable');
          const catOther = modelC.find((product) => product.productCatrgoryName === 'other');
  
          fruitCount = modelP.filter((product) => product.productCatogoryId.toString() === catFruit._id.toString()).length;
          vegCount = modelP.filter((product) => product.productCatogoryId.toString() === catVeg._id.toString()).length;
          otherCount = modelP.filter((product) => product.productCatogoryId.toString() === catOther._id.toString()).length;
  
          console.log("Fruit Count:", fruitCount);
          console.log("Veg Count:", vegCount);
          console.log("Other Count:", otherCount);
  
          res.status(200).send({ fruitCount, vegCount, otherCount });
        }
      } else {
        res.status(400).send({ status: false });
      }
    } catch (error) {
      console.error(error);
      res.status(400).send({ status: false });
    }
  });

  productsRoute.route("/get-estimated-income/:id").post(async (req, res) => {
    const { id } = req.params;
    const { month } = req.body;
  
    try {
      const products = await model.find({ sellerId: id, createdDate: { $regex: `^${month}` } });
  
      if (products.length > 0) {
        let totalIncome = 0;
  
        products.forEach((product) => {
          const income = product.price * product.availableQuantity;
          totalIncome += income;
        });
  
        res.status(200).send({ status: "success", totalIncome });
      } else {
        res.status(404).send({ status: "failure", message: "No products found for the seller and month" });
      }
    } catch (error) {
      res.status(500).send({ status: "failure", message: "Internal server error" });
    }
  });
  
  

 const mongoose = require('mongoose');

productsRoute.route("/delete/:id").delete((req, res) => {
  const { id } = req.params;
  const { sellerId } = req.body;

  model.find({_id:id,sellerId:sellerId})
    .then((product) => {
      if (product[0] !== undefined) {
        console.log(product);
          model.findByIdAndDelete(id)
            .then((deletedProduct) => {
              res.status(200).send({ status: true,message:'Deleted', product: deletedProduct });
            })
            .catch((error) => {
              res.status(500).send({ status: false, message: "Internal server error" });
            });
       
      } else {
        res.status(404).send({ status: false, message: "Product not found or Seller Id does not match" });
      }
    })
    .catch((error) => {
      res.status(500).send({ status: false, message: "Internal server error" });
    });
});

  
  productsRoute.route("/edit/:id").post( (req, res) => {
    const { id } = req.params;
    const { productName, price, productImage, description, productCatogoryId, availableQuantity, sellerId } = req.body;
  
    model.findByIdAndUpdate(id, req.body)
      .then((product) => {
        if (product) {
          res.status(200).send({ status: "success", product });
        } else {
          res.status(404).send({ status: "failure", message: "Product not found" });
        }
      })
      .catch((error) => {
        res.status(500).send({ status: "failure", message: "Internal server error" });
      });
  });
  
  productsRoute.route("/image-upload/:id").post(async (req, res) => {
    const { id } = req.params;

    const existProduct = await model.find({_id:id});
    existProduct[0].productImage = req.body.productImage;
    model.findByIdAndUpdate(id, existProduct[0])
      .then((product) => {
        if (product) {
          res.status(200).send({ status: "success", data:req.body.productImage });
        } else {
          res.status(404).send({ status: "failure", message: "Product not found" });
        }
      })
      .catch((error) => {
        res.status(500).send({ status: "failure", message: "Internal server error" });
      });
  });
  


module.exports =productsRoute