const express = require("express");
const router = express.Router();
const User = require("../models/user");
const IList = require("../models/ilist");

const session = require('express-session');
const passport = require('passport');

const sendOtpObj = require('../Midlewares/otpSenderNodeMailer');

router.get("/notLogined", (req, res) => {
  res.render("auth/redirectLogin")
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, (err) => {
    if(err){
      console.log(err);
    }else{
      passport.authenticate("local")(req, res, () => {
        if(typeof(req.session.backUrl) != "undefined"){
          res.redirect("/pets"+req.session.backUrl);
        }else{
          res.redirect("/pets");
        }
      });
    }
  });
});


router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", (req, res) => {
  User.register({username: req.body.username}, req.body.password, (err, user) => {
    if(err){
      console.log(err);
      res.redirect("/auth/register");
    }else{
      user.name = req.body.name;
      user.pNumber = req.body.pNumber;

      user.address = {
        line1: req.body.addLine1,
        line2: req.body.addLine2,
        city: req.body.city,
        postalCode: req.body.postalCode,
        state: req.body.state
      };
      user.role = "Customer";

      user.save();

      const newIList = new IList({
        userID: user._id,
        listIndex: 0,
        pets: []
      });

      newIList.save();

      passport.authenticate("local")(req, res, () => {

        if(typeof(req.session.backUrl) != "undefined"){
          res.redirect("/pets"+req.session.backUrl);
        }else{
          res.redirect("/pets");
        }
      });
    }
  });
});


router.get("/sendOtp/:emailId", (req, res) => {
  const emailId = req.params.emailId;

  const generatedOtp = sendOtpObj.sendOtp(emailId);

  res.json({otp: generatedOtp});
});

module.exports = router
