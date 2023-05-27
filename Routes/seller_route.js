 const express = require("express")
const sellerRoute = express.Router()
const Seller = require("../Models/seller")

sellerRoute.route("/save").post((req,res)=>{
    const {sellerFirstName,sellerLastName,sellerImage,AvailableQuantity,sellerAdddress,sellerContactNumber,sellerLocation,sellerPassword,sellerEmail,latitude,longitude}=req.body
    const seller = new Seller({
        sellerFirstName,
        sellerLastName,
        sellerImage,
        AvailableQuantity,
        sellerAdddress,
        sellerContactNumber,
        sellerLocation,
        sellerPassword,
        sellerEmail,
        latitude,
        longitude
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

sellerRoute.route("/get-ById/:id").get((req, res) => {
  const { id } = req.params;
  Seller.find({_id:id})
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
  const {sellerFirstName,sellerLastName,sellerImage,AvailableQuantity,sellerAdddress,sellerContactNumber,sellerLocation,sellerPassword,latitude,longitude}=req.body
  const seller = new Seller({
      sellerFirstName,
      sellerLastName,
      sellerImage,
      AvailableQuantity,
      sellerAdddress,
      sellerContactNumber,
      sellerLocation,
      sellerPassword,
      latitude,
      longitude
  })
  
  seller.findByIdAndUpdate(id,seller,{new:true}).then((seller)=>{
      res.status(200).send({status: true,seller})
  }).catch((e)=>{
      res.status(400).send({status: false})
  })
});

// sellerRoute.route("/user-produts/:id").get((req,res)=>{
//   const { id } = req.params;

//   Seller.find({_id : sellerEmail,sellerPassword: sellerPassword})
//   .then((model) => {
//       console.log(model);
//       if(Array.isArray(model) && model.length > 0){
//           res.status(200).send({ status: true, data: model });
//       }
//       else{
//           res.status(400).send({ status: false });
//       }
    
//   })
//   .catch((e) => {
//     res.status(400).send({ status: false });
//   });
// });

sellerRoute.route("/image-upload/:id").post(async (req, res) => {
  const { id } = req.params;
  const existProduct = await Seller.find({_id:id});
  existProduct[0].sellerImage = req.body.sellerImage;
  Seller.findByIdAndUpdate(id, existProduct[0])
    .then((product) => {
      if (product) {
        res.status(200).send({ status: "success", data:req.body.sellerImage });
      } else {
        res.status(404).send({ status: "failure", message: "Seller not found" });
      }
    })
    .catch((error) => {
      res.status(500).send({ status: "failure", message: "Internal server error" });
    });
});

sellerRoute.route("/update/:id").put((req, res) => {
  const { id } = req.params;
  const {
    sellerFirstName,
    sellerLastName,
    sellerImage,
    sellerAdddress,
    sellerContactNumber,
    sellerLocation,
    sellerPassword,
  } = req.body;
  const seller = new Seller({
    sellerFirstName,
    sellerLastName,
    sellerImage,
    sellerAdddress,
    sellerContactNumber,
    sellerLocation,
    sellerPassword,
  });

  seller
    .findByIdAndUpdate(id, seller, { new: true })
    .then(seller => {
      res.status(200).send({ status: true, seller });
    })
    .catch(e => {
      res.status(400).send({ status: false });
    });
});

module.exports =sellerRoute
