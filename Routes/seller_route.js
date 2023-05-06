 const express = require("express")
const sellerRoute = express.Router()
const Seller = require("../Models/seller")

sellerRoute.route("/save").post((req,res)=>{
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



module.exports =sellerRoute
