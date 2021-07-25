const express = require("express");
const router = express.Router();
const { auth, adminAuth } = require('../Midlewares/auth.js');

const Pet = require("../models/pet");
const Request = require("../models/request");
const User = require("../models/user");


router.get("/", auth, adminAuth, (req, res) => {
  res.render("admin/index");
});

// Add Pet Router
router.get("/addPet", auth, adminAuth, (req, res) => {
  res.render("admin/addpet");
});
router.post("/addPet", auth, adminAuth, (req, res) => {
  const newPet = new Pet({
    name: req.body.name,
    temperament: req.body.temperament,
    lifeExpectancy: req.body.lifeExpectancy,
    imgUrl: req.body.imgUrl,
    summary: req.body.summary,
    popularity: 0
  });

  newPet.save((err) => {
    if(err){
      console.log(err);
    }else{
      res.redirect("/admin");
    }
  });

});

// Requests Router
router.get("/requests", (req, res) => {

  async function userPlusReq(){
    const arrUserPlusReq = [];
    let requests;
    let user;
    await Request.find({}, (err, foundRequests) => {
      requests = foundRequests;
    });
    for(let req of requests){
        await User.findById(req.userID, (err, foundUser) => {

          const userPlusReq = {
            user: foundUser,
            requ: req
          };
          // console.log(userPlusReq);
          arrUserPlusReq.push(userPlusReq);

        });
    }
    res.render("admin/requests", {reqs: arrUserPlusReq});
  }

  userPlusReq();
});


module.exports = router
