const IList = require("../models/ilist");

async function iListIndex(req, res, next){
  if(req.isAuthenticated()){
    await IList.findOne({userID: req.user.id}, (err, foundIList) => {
      req.index = foundIList.listIndex;
    });
    req.isLogedIn = true;
  }else{
    req.index = 0;
    req.isLogedIn = false;
  }
  next();
}

module.exports = { iListIndex }
