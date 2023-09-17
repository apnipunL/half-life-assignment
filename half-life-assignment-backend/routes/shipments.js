const express = require('express');
const Shipment = require('./../models/shipment');
const User = require('./../models/user');
const sendErrorResponse = require("../util/sendErrorResponse");

const router = express.Router();

// list shipments by user
router.get('/:userId', async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.params.userId
    }
  });
  if (!user) {
    sendErrorResponse(res, 'User not found');
    return
  }

  Shipment.findAll({
    where: {
      userId: req.params.userId
    }
  }).then(value => {
    res.send(value);
  }).catch(err => {
    sendErrorResponse(res, 'Failed to fetch shipments of user');
  });
});

// create shipment
router.post('/', async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.body.userId || 0
    }
  });
  if (!user) {
    sendErrorResponse(res, 'User not found');
    return;
  }

  // check if user same with token

  req.body.shipmentStatus = 'SHIPMENT_CREATED';
  Shipment.create(req.body).then(value => {
    const createdData = value?.dataValues;
    res.send(createdData);
  }).catch(err => {
    sendErrorResponse(res, 'Failed to create shipment');
  });
});

module.exports = router;
