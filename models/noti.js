const mongoose = require('mongoose');

const notiSchema = new mongoose.Schema({
  emailId: String
});

module.exports = mongoose.model("notify", notiSchema);
