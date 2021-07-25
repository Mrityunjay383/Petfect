const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  userID: String,
  budget: Number,
  pets: [Object],
  petAge: String,
  petGender: String,
  status: String,
  reqDate: String
});


module.exports = mongoose.model("Request", requestSchema);
