const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  temperament: String,
  lifeExpectancy: String,
  imgUrl: String,
  summary: String,
  popularity: Number
});

module.exports = mongoose.model("Pet", petSchema);
