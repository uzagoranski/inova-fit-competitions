// Models
const User = require("../models/User");

// Get user by email
module.exports.getUserByEmail = async function getUserByEmail(email) {
  
  let response;

  try {
    response = await User.findOne({ email: email });
  }
  catch(err) {
    response = err;
  }

  return response;

}

// Add new user
module.exports.register = async function register(user) {
  
  let response;

  try {
    response = await user.save();
  }
  catch(err) {
    response = err;
  }

  return response;

}

// Get user by id
module.exports.getUserByID = async function getUserByID(_id) {

  let response;

  try {
    response = await User.findById(_id);
  }
  catch(err) {
    response = err;
  }

  return response;  

}

// Get all Strava authenticated users
module.exports.getStravaUsers = async function getStravaUsers() {
  
  let response;

  try {
    response = await User.where("stravaUserID").ne("");
  }
  catch(err) {
    response = err;
  }

  return response;

}