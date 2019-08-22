import express from "express";
const router = express.Router();

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Service
const usersService = require('../../service/users');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", async(req, res) => {

  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  res.json(await usersService.register(req.body));

});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", async(req, res) => {

  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  res.json(await usersService.login(req.body));

});

// @route GET api/users/:_id
// @desc Get selected user
// @access Private
router.get('/:_id', async(req, res) => {

  res.json(await usersService.getCurrentUser(req.params._id));

});

module.exports = router;