const express = require("express");
const router = express.Router();
const { iListIndex } = require('../Midlewares/ilist');


const Pet = require("../models/pet");

router.get("/", iListIndex, (req, res) => {
  req.session.backUrl = undefined;
  Pet.find((err, foundPets) => {
    res.render("pets/index", {pets: foundPets, isLogedIn: req.isLogedIn, index: req.index});
  });
});

router.get("/pet/:petName", iListIndex, (req, res) => {

  const petName = req.params.petName;

  Pet.findOne({name: petName}, (err, foundPet) => {
    if(!foundPet){
      res.send(petName + " is not currently in our Database");
    }else{
      req.session.backUrl = req.url;
      res.render("pets/indiPet", {pet: foundPet, isLogedIn: req.isLogedIn, index: req.index});
    }
  });
});

router.get("/finder", iListIndex, (req, res) => {
  res.render("pets/finder", {isLogedIn: req.isLogedIn, index: req.index});
});

router.post("/search", (req, res) => {
  const name = req.body.petName;
  const redirectURL = "pet/"+name;
  res.redirect(redirectURL);
});

router.get("/specificRequest", iListIndex, (req, res) => {
  res.render("pets/spec", {isLogedIn: req.isLogedIn, index: req.index})
});

module.exports = router;
