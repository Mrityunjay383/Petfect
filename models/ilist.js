const mongoose = require('mongoose');

const iListSchema = new mongoose.Schema({
  userID: String,
  listIndex: Number,
  pets: [Object]
});

module.exports = mongoose.model("IList", iListSchema);
