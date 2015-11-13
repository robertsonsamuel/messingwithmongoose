'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render("index");
});

router.post('/', function(req, res) {
  // console.log(req.query);
  res.send(req.query);
});


module.exports = router;
