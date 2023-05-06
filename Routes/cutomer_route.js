const express = require("express")
const customerRoute = express.Router()
const Customer = require("../Models/customer")

customerRoute.route("/save").post((req,res)=>{
    const {customerFirstName,customerLastName,email,customerPhoneNumber}=req.body
    const customer = new Customer({
        customerFirstName,
        customerLastName,
        email,
        customerPhoneNumber
    })
    
    customer.save().then((customer)=>{
        res.status(200).send({status: "success",customer})
    }).catch((e)=>{
        res.status(400).send({status: "faliure"})
    })
})



module.exports =customerRoute