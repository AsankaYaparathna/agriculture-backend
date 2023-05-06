const express = require("express");
const feedbackRoute = express.Router();
const Feedback = require("../Models/feedbacks");

feedbackRoute.route("/create").post((req, res) => {
  const { feedbackStarCount, customerId, sellerId } = req.body;
  const feedback = new Feedback({
    feedbackStarCount,
    customerId,
    sellerId
  });

  feedback
    .save()
    .then((feedback) => {
      res.status(200).send({ status: "Sucess", feedback });
    })
    .catch((e) => {
      res.status(400).send({ status: "Faliure" });
    });
});

module.exports = feedbackRoute;
