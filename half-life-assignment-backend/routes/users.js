const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('./../models/user');
const sendErrorResponse = require("../util/send-error-response");
const constants = require("../const/constants");

const router = express.Router();

// user registration
router.post('/', async (req, res, next) => {
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  });
  if (user) {
    sendErrorResponse(res, 'User already exist with email');
    return;
  }

  // encrypt password
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  User.create(req.body).then(value => {
    const createdData = value?.dataValues;
    createdData.password = '****';
    res.send(createdData);
  }).catch(err => {
    sendErrorResponse(res, 'Failed to create user');
  });
});

// user login
router.post('/login', async (req, res, next) => {
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  });
  if (!user) {
    sendErrorResponse(res, 'User not found with the provided email. Please sign up to create new account');
    return;
  }

  //comparing passwords
  const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
  );
  if (!passwordIsValid) {
    sendErrorResponse(res, 'Email and password mismatch. Please try again');
    return;
  }

  //signing token
  user.password = '****'
  const token = jwt.sign({...user?.dataValues}, constants.JWT_SECRET, {
    expiresIn: 86400 // 24 hours
  });

  // send response
  res.send({
    accessToken: token,
    user: user
  });
});

module.exports = router;
