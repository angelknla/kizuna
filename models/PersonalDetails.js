const schemas = require("../db/schema.js");

// Class function
module.exports = function () {
  // Normal object constructor/attributes
  this.name;
  this.surname ;
  this.dateOfJoin;
  this.salary;
  this.phoneNumber;
  this.emailAddress;
  this.homeAddress;

// Create Mongoose Model
  this.create = function (name, surname, dateOfJoin, salary, phoneNumber, username, homeAddress) {
    const newDetails = new schemas.PersonalDetails({
      name: name,
      surname: surname,
      dateOfJoin: dateOfJoin,
      salary: salary,
      phoneNumber: phoneNumber,
      emailAddress: username,
      homeAddress: homeAddress
    })
    return newDetails;
  }

}
