const express = require("express")
const modelRoute = express.Router()
const model = require("../Models/contactUs")

modelRoute.route("/save").post((req,res)=>{
    model.create(req.body).then((contactUs)=>{
        res.status(200).send({status: "success",data:contactUs})
    }).catch((e)=>{
        res.status(400).send({status: "faliure"})
    })
});
modelRoute.route("/getall").get((req,res)=>{
  
    model.find().then((contactUs)=>{
        res.status(200).send({status: "success",data:contactUs})
    }).catch((e)=>{
        res.status(400).send({status: "faliure"})
    })
});
module.exports = modelRoute