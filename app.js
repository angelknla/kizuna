// Importing needed modules
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const register = require("./controllers/register.js");
const login = require("./controllers/login.js");
const home = require("./controllers/home.js");

var secret = process.env.SOME_LONG_UNGUESSABLE_STRING;

// Express app
const app = express();

// Setting features to be used
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret:secret,
  resave:false,
  saveUninitialized:false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Connect to mongodb through mongoose locally
mongoose.connect("mongodb://localhost:27017/systemDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.set("useCreateIndex", true);

//Controllers.
login(app);
register(app);
home(app);

// Setting up the server
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
});
