var express = require('express');
var router = express.Router();

// user registration
router.post('/', function(req, res, next) {
  res.send(req.body);
});


module.exports = router;
