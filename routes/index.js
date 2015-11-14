/* globals $: false , console:false , module:false , require:false*/
'use strict';

var express = require('express');
var router = express.Router();
var Room = require('../models/room');


router.get('/', function(req, res) {
  Room.find({}, function(err,rooms){
      res.render('index' , { rooms:rooms} );
    }).populate('items');
  });

router.post('/', function(req, res) {
  // console.log(req.query);
  res.send(req.query);
});


module.exports = router;
