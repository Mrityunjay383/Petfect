const express = require("express");
const router = express.Router();
const { auth } = require('../Midlewares/auth.js');
const { iListIndex } = require('../Midlewares/ilist');

const Pet = require("../models/pet");
const IList = require("../models/ilist");

router.get("/", auth, iListIndex, (req, res) => {


  IList.findOne({userID: req.user.id}, (err, foundIList) => {
      res.render("IList/index", {isLogedIn: req.isLogedIn, index: req.index, iListPets: foundIList});
  });

});

router.post("/", auth, (req, res) => {


  IList.findOne({userID: req.user.id}, (err, foundIList) => {
    Pet.findById(req.body.petID, (err, foundPet) => {

      const newIListpet = {
        petID: req.body.petID,
        name: foundPet.name,
        imgUrl: foundPet.imgUrl
      };

      foundIList.pets.push(newIListpet);
      foundIList.listIndex++;
      foundIList.save();


      foundPet.popularity ++;
      foundPet.save();
    });
  });

  res.redirect("/pets");
});

router.post("/rm", (req, res) => {
  const petID = req.body.petID;

  IList.findOne({userID: req.user.id}, (err, foundIList) => {
    let i = 0;
    for(let pet of foundIList.pets){
      if(pet.petID == petID){
        foundIList.pets.splice(i, 1);
        break;
      }
      i++;
    }
    foundIList.listIndex--;
    foundIList.save();
  });

  res.redirect("/IList");

});

module.exports = router;
