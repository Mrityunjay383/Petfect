const express = require("express");
const router = express.Router();


const { auth } = require('../Midlewares/auth.js');
const { iListIndex } = require('../Midlewares/ilist');


const IList = require("../models/ilist");
const Request = require("../models/request");

router.get("/", auth, iListIndex, (req, res) => {
  Request.find({userID: req.user.id}, (err, foundRequests) => {
    res.render("request/yourRequest", {isLogedIn: req.isLogedIn, index: req.index, reqs: foundRequests});
  });
});

router.post("/", (req, res) => {
  const budget = req.body.budget;

  IList.findOne({userID: req.user.id}, (err, foundIList) => {

    const date = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = date.toLocaleDateString('en-GB', options);

    const newRequest = new Request({
      userID: req.user.id,
      budget: budget,
      pets: foundIList.pets,
      petAge: req.body.petAge,
      petGender: req.body.petGender,
      status: "Pending",
      reqDate: currentDate
    });

    newRequest.save((err) => {
      if(!err){
        foundIList.listIndex = 0;
        foundIList.pets = [];

        foundIList.save();

      }
    });

  });
  res.redirect("/request/conform");
});


router.get("/conform", auth, iListIndex, (req, res) => {
  res.render("request/conform", {isLogedIn: req.isLogedIn, index: req.index})
});


module.exports = router;
