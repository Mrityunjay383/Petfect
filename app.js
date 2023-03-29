require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require("cookie-parser");


// Routers
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const petsRouter = require("./routes/pets");
const iListRouter = require("./routes/ilist");
const requestRouter = require("./routes/request");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(cookieParser());
app.enable('trust proxy'); // add this line
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
  proxy: true, // add this line
  cookie: {
    secure: true,
    maxAge: 3600000,
  }
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);



// Using Routes
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/pets", petsRouter);
app.use("/IList", iListRouter);
app.use("/request", requestRouter);

app.use(function(req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }
});


app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});
