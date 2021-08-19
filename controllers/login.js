const schemas = require("../db/schema.js");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

function login(app){

  app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/");
  })

  app.get("/", function(req, res) {
    res.render("login");
  });

  app.post("/", function(req, res) {

    const user = new schemas.User({
      username:req.body.username,
      password: req.body.password
    });

    req.login(user, function(err){
      if (err){
        console.log(err);
      }
      else {
        passport.authenticate("local")(req,res, function(){
          res.redirect("/home");
        });
      }
    })

  });
}

module.exports = login;
