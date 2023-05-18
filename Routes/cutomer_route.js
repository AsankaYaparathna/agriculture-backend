const express = require("express")
const customerRoute = express.Router()
const Customer = require("../Models/customer")

customerRoute.route("/save").post((req,res)=>{
    const {customerFirstName,customerLastName,email,customerPhoneNumber,customerPassword}=req.body
    const customer = new Customer({
        customerFirstName,
        customerLastName,
        email,
        customerPhoneNumber,
        customerPassword
    })
    
    customer.save().then((customer)=>{
        res.status(200).send({status: "success",customer})
    }).catch((e)=>{
        res.status(400).send({status: "faliure"})
    })
});

customerRoute.route("/login").post((req,res)=>{
    const {email,customerPassword}=req.body;

    Customer.find({email : email,customerPassword: customerPassword})
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

    //console.log(req.body);
    // customer.save().then((customer)=>{
    //     res.status(200).send({status: "success",customer})
    // }).catch((e)=>{
    //     res.status(400).send({status: "faliure"})
    // })
});




module.exports =customerRoute