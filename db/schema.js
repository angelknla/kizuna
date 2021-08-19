const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCeate = require("mongoose-findorcreate");
// Setting schema variables
let objectId = mongoose.Schema.Types.ObjectId;

// Creating schemas
const userSchema = new mongoose.Schema({
  username:String,
  password:String,
  googleId:String,
  userRole: String,
  awardRecordID: [{
    awards_id: objectId
  }, {
    awards_id: objectId
  }],
  companies_id: objectId,
  feedbackID: [{
    feedbacks_id: objectId
  }, {
    feedbacks_id: objectId
  }],
  personaldetails_id: objectId,
  projectsID: [{
    projects_id: objectId
  }, {
    projetcs_id: objectId
  }],
  tasksID: [{
    tasks_id: objectId
  }, {
    tasks_id: objectId
  }, {
    tasks_id: objectId
  }]
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCeate);
const User = mongoose.model("User", userSchema);

// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

const taskSchema = new mongoose.Schema({
  taskName: String,
  taskDescription: String,
  startDate: Date,
  dueDate: Date,
  reminderSet: Boolean,
  reminderTime: Number,
  reminderDate: Date,
  users_id: objectId
});
const Task = mongoose.model("Task", taskSchema);


const projectSchema = new mongoose.Schema({
  projectName: String,
  projectDescription: String,
  memberInCharge: {
    users_id: objectId
  },
  teamMembersID: [{
    users_id: objectId
  }, {
    users_id: objectId
  }],
  startDate: Date,
  dueDate: Date,
  tasksID: [{
    tasks_id: objectId
  }, {
    tasks_id: objectId
  }]
});
const Project = mongoose.model("Project", projectSchema);


const personalDetailsSchema = new mongoose.Schema({
  users_id: objectId,
  name: String,
  surname: String,
  dateOfJoin: Date,
  salary: Number,
  phoneNumber: String,
  emailAddress: String,
  homeAddress: String
});
const PersonalDetails = mongoose.model("PersonalDetails", personalDetailsSchema);


const feedbackSchema = new mongoose.Schema({
  comments: [String],
  scores: {
    accuracy: Number,
    quality: Number,
    friendliness: Number,
    responsiveness: Number,
    lateness: Number,
    overall: Number
  },
  recieverID: {
    users_id: objectId
  },
  authorID: {
    users_id: objectId
  },
  date: Date
});
const Feedback = mongoose.model("Feedback", feedbackSchema);


const companySchema = new mongoose.Schema({
  address: String,
  employeeListID: [{
    users_id: objectId
  }, {
    users_id: objectId
  }, {
    users_id: objectId
  }],
  companyName: String
});
const Company = mongoose.model("Company", companySchema);


const awardSchema = new mongoose.Schema({
  dueDate: Date,
  users_id: objectId,
  awardType: String
});
const Award = mongoose.model("Award", awardSchema);


// Defining schemas exports
module.exports = {
  User,
  Task,
  Project,
  PersonalDetails,
  Feedback,
  Company,
  Award
}

// Alternative exports method (Changing clashing names)

// module.exports = {
//   userModel:User,
//   taskModel: Task,
//   projectModel: Project,
//   personalDetailsModel: PersonalDetails,
//   feedbackModel: Feedback,
//   companyModel: Company,
//   awardModel: Award
// }
