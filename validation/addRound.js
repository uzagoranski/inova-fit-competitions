const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateAddRoundInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.date = !isEmpty(data.date) ? data.date : "";
  data.stravaSegmentId = !isEmpty(data.stravaSegmentId) ? data.stravaSegmentId : "";

  // Date checks
  if (Validator.isEmpty(data.date)) {
    errors.date = "Date field is required";
  } 

  // Id checks
  if (Validator.isEmpty(data.stravaSegmentId)) {
    errors.stravaSegmentId = "Strava Segment ID field is required";
  } 
  
return {
    errors,
    isValid: isEmpty(errors)
  };
};