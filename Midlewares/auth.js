function auth(req, res, next){

  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect("/auth/notLogined");
  }
}

function adminAuth(req, res, next){
  if(req.user.role === "Admin"){
    next();
  }else{
    res.send("You have to be admin to asses this page");
  }
}

function isLogedIn(req, res, next){
  req.isLogedIn = false;
  if(req.isAuthenticated()){
    req.isLogedIn = true;
  }
  next();
}


module.exports = {auth, adminAuth, isLogedIn};
