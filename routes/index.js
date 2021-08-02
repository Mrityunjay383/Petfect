const express = require("express");
const router = express.Router();
const { isLogedIn } = require('../Midlewares/auth');
const { iListIndex } = require('../Midlewares/ilist');
const { recieveMessage } = require('../Midlewares/nodemailer');

const Noti = require("../models/noti");

router.get("/home", isLogedIn, iListIndex, (req, res) => {

  if(req.isAuthenticated()){
    res.render("index", {isLogedIn: req.isLogedIn, index: req.index, user: req.user});
  }else{
    res.render("index", {isLogedIn: req.isLogedIn, index: req.index});
  }
});

router.get("/", (req, res) => {
  res.render("commingSoon");
});
router.get("/noti/:emailId", (req, res) => {
  const emailId = req.params.emailId;

  let newNoti = new Noti({
    emailId: emailId
  });
  newNoti.save((err) => {
    res.json({status: "Sucess"})
  });
});

router.post("/contact", (req, res, next) => {
  req.contactDetails = {
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message
  };

  next()

}, recieveMessage);



module.exports = router
