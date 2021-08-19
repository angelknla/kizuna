require("dotenv").config();
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const schemas = require("../db/schema.js");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCeate = require("mongoose-findorcreate");
const User = require("../models/User.js");
let aUser = new User();
const PersonalDetails = require("../models/PersonalDetails.js");
let aDetails = new PersonalDetails();

passport.use(schemas.User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  schemas.User.findById(id, function(err, user) {
    done(err, user);
  });
});
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/home",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    schemas.User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

function register (app) {

  app.get('/auth/google/',
    passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/google/home',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/home');
    });

  app.get("/register", function(req, res) {
    res.render("registration");
  });

  app.post("/register", function(req, res) {

    const newDetails = aDetails.create(
      req.body.name,
      req.body.surname,
      req.body.dateOfJoin,
      req.body.salary,
      req.body.phoneNumber,
      req.body.username,
      req.body.homeAddress
    );

    const newUser = aUser.create(
      req.body.username,
      req.body.password,
      req.body.role
    );

    if(newUser.username !== "" && newUser.password !== "" ){
      schemas.User.findOne({username:newUser.username}, function(err, results){
        if (results){
          res.render("login");
        } else {
          newDetails.save();
          schemas.User.register({username:newUser.username}, newUser.password, function(err, user){
            if (err){
              console.log(err);
              res.redirect("/register");
            } else {
              schemas.PersonalDetails.updateOne({emailAddress: req.body.username},{users_id: newUser._id},function(err){
                if(!err){
                  schemas.User.updateOne({username:newUser.username},{personaldetails_id:newDetails._id, userRole:newUser.userRole}, function(err){
                    if(!err){
                      console.log("Succesfully added new user to database");
                      passport.authenticate("local")(req,res, function(){res.redirect("/")})
                    }
                  })
                }
              })
            }
          })
        }
      })

    } else {
      res.redirect("/register"); //empty username or password
    }
});
}

module.exports = register;
