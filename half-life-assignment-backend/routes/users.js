const express = require('express');
const User = require('./../models/user');
const sendErrorResponse = require("../util/sendErrorResponse");

const router = express.Router();

// user registration
router.post('/', async (req, res, next) => {
  const user = await User.findOne({
    where: {
      email: req.email
    }
  });
  if (user) {
    sendErrorResponse(res, 'User already exist with email');
    return;
  }

  User.create(req.body).then(value => {
    const createdData = value?.dataValues;
    createdData.password = '****';
    res.send(createdData);
  }).catch(err => {
    sendErrorResponse(res, 'Failed to create user');
  });
});


module.exports = router;
