const express = require('express');
const Shipment = require('./../models/shipment');
const User = require('./../models/user');
const sendErrorResponse = require("../util/send-error-response");
const verifyToken = require("../util/verify-token");

const router = express.Router();

// list shipments by user
router.get('/:userId', verifyToken, async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.params.userId
    }
  });
  if (!user) {
    sendErrorResponse(res, 'User not found');
    return
  }

  // check if user same with token
  console.log(req.params.userId, req.tokenUser?.id)
  if (req.params.userId != req.tokenUser?.id) {
    sendErrorResponse(res, 'Not permitted');
    return;
  }

  Shipment.findAll({
    where: {
      userId: req.params.userId
    },
    order: [['id', 'DESC']]
  }).then(value => {
    res.send(value);
  }).catch(err => {
    sendErrorResponse(res, 'Failed to fetch shipments of user');
  });
});

// create shipment
router.post('/', verifyToken, async (req, res, next) => {
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
  if (req.body.userId != req.tokenUser?.id) {
    sendErrorResponse(res, 'Not permitted');
    return;
  }

  req.body.shipmentStatus = 'SHIPMENT_CREATED';
  Shipment.create(req.body).then(value => {
    const createdData = value?.dataValues;
    res.send(createdData);
  }).catch(err => {
    sendErrorResponse(res, 'Failed to create shipment');
  });
});

// update shipment
router.put('/', verifyToken, async (req, res, next) => {
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
  if (req.body.userId != req.tokenUser?.id) {
    sendErrorResponse(res, 'Not permitted');
    return;
  }

  Shipment.update({
    senderName: req.body.senderName,
    senderAddress: req.body.senderAddress,
    recipientName: req.body.recipientName,
    recipientAddress: req.body.recipientAddress,
    shipmentDescription: req.body.shipmentDescription,
  }, {where: {id: req.body.id}}).then(value => {
    const updatedData = value?.dataValues;
    res.send(updatedData);
  }).catch(err => {
    sendErrorResponse(res, 'Failed to update shipment');
  });
});

//change shipment status:- FOR TESTING PURPOSE ONLY
router.patch('/:shipmentId/status/:status', async (req, res, next) => {
  const availableShipments = ['SHIPMENT_CREATED', 'SHIPMENT_PICKED_UP', 'IN_TRANSIT', 'DELIVERD'];
  if(!availableShipments.includes(req.params.status)) {
    sendErrorResponse(res, 'Invalid shipment status. Please refer the README.md for available statuses.');
    return;
  }

  const shipment = await Shipment.findOne({
    where: {
      id: req.params.shipmentId || 0
    }
  });
  if (!shipment) {
    sendErrorResponse(res, 'Shipment not found');
    return;
  }

  Shipment.update({
    shipmentStatus: req.params.status
  }, {where: {id: req.params.shipmentId}}).then(value => {
    res.send({code: 200, message: 'Status updated sucessfully'});
  }).catch(err => {
    sendErrorResponse(res, 'Failed to update shipment status');
  });
});

module.exports = router;
