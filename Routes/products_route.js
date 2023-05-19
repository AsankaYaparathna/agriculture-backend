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
  
      const modelP = await Products.find({ sellerId: id });
  
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
  

module.exports =productsRoute