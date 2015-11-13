'use strict';

let express = require('express');
let router = express.Router();

let Room = require('../models/room');

router.get('/', (req, res) => {
  Room.find({}, function(err, rooms){
    res.status(err ? 400 : 200).send(err || rooms);
  });
});

router.get('/:id', (req, res) => {
  Room.findById(req.params.id, function(err, room){
    res.status(err ? 400 : 200).send(err ? 'room not found' : room);
  });
});

router.put('/:id', (req, res) => {
  Room.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, room) {
    res.status(err ? 400 : 200).send(err ? 'room update failed' : room);
  });
});

router.delete('/:id', (req, res) => {
  Room.findByIdAndRemove(req.params.id, function(err, room) {
    res.status(err ? 400 : 200).send(err ? 'room delete failed' : 'room deleted.');
  });
});

router.post('/', (req, res) => {
  let room = new Room(req.body);
  room.save(err => {
    res.status(err ? 400 : 200).send(err || `${req.body.name} added.`);
  });
});

module.exports = router;
