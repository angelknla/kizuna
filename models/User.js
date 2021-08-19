const schemas = require("../db/schema.js");

//Class fucntion
module.exports = function () {
  // Normal object constructor/attributes
  this.username;
  this.password;
  this.userRole;

// Create Mongoose Model
  this.create = function (username, password, userRole) {
    const newUser = new schemas.User({
      username: username,
      password: password,
      userRole: userRole
    })
    return newUser;
  }

}


// Alternative method with functions instead of a class functions

// const schemas = require("../db/schema.js");
// const User= schemas.userModel;
//
// function create(username,password,userRole) {
//   const newUser = new User({
//     username : username,
//     password : password,
//     userRole : userRole
//   })
//     return newUser;
// }
//
// module.exports = {
//     create: create
// }
