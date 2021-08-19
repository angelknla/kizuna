const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
function home(app) {

  app.get("/home", function(req,res){
    if (req.isAuthenticated()){
      res.render("index");
    } else {
      res.redirect("/");
    }
  });

}

module.exports = home;
