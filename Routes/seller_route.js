 const express = require("express")
const sellerRoute = express.Router()
const Seller = require("../Models/seller")

sellerRoute.route("/save").post((req,res)=>{
    const {sellerFirstName,sellerLastName,sellerImage,AvailableQuantity,sellerAdddress,sellerContactNumber,sellerLocation,sellerPassword,sellerEmail}=req.body
    const seller = new Seller({
        sellerFirstName,
        sellerLastName,
        sellerImage,
        AvailableQuantity,
        sellerAdddress,
        sellerContactNumber,
        sellerLocation,
        sellerPassword,
        sellerEmail
    })
    
    seller.save().then((seller)=>{
        res.status(200).send({status: "success",seller})
    }).catch((e)=>{
        res.status(400).send({status: "faliure"})
    })
})


//View data
sellerRoute.route("/get-all").get((req, res) => {
  Seller.find()
    .then((seller) => {
      res.status(200).send({ status: "success", seller });
    })
    .catch((e) => {
      res.status(400).send({ status: "failure" });
    });
});

sellerRoute.route("/login").post((req,res)=>{
  const {sellerContactNumber,sellerPassword}=req.body;

  Seller.find({sellerContactNumber : sellerContactNumber,sellerPassword: sellerPassword})
  .then((model) => {
      console.log(model);
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


sellerRoute.route("/update/:id").put((req,res)=>{
  const { id } = req.params;
  const {sellerFirstName,sellerLastName,sellerImage,AvailableQuantity,sellerAdddress,sellerContactNumber,sellerLocation,sellerPassword}=req.body
  const seller = new Seller({
      sellerFirstName,
      sellerLastName,
      sellerImage,
      AvailableQuantity,
      sellerAdddress,
      sellerContactNumber,
      sellerLocation,
      sellerPassword
  })
  
  seller.findByIdAndUpdate(id,seller,{new:true}).then((seller)=>{
      res.status(200).send({status: true,seller})
  }).catch((e)=>{
      res.status(400).send({status: false})
  })
});

sellerRoute.route("/user-produts/:id").get((req,res)=>{
  const { id } = req.params;

  Seller.find({_id : sellerEmail,sellerPassword: sellerPassword})
  .then((model) => {
      console.log(model);
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

module.exports =sellerRoute
