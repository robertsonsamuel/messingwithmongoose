/* globals $: false , console:false , module:false , require:false*/
'use strict';

let express = require('express');
let router = express.Router();

let Room = require('../models/room');
let Item = require('../models/item');

router.get('/', (req, res) => {
  Room.find({}, function(err, rooms){
    console.log(rooms);
    res.status(err ? 400 : 200);
    res.send(err || rooms);
  });

});


router.put('/:roomId/addItem/:itemId', function(req, res) {
  Room.findById(req.params.roomId, function(err, room){
    if(err) return res.status(400).send(err.message);
    Item.findById(req.params.itemId, function(err, item){
      if(err) return res.status(400).send(err.message);
      if(room.items.indexOf(item._id) !== -1) {
        return res.status(400).send('item already in room');
      }
      room.items.push(item._id);
      room.save(function(err){
        res.status(err ? 400 : 200).send(err ? 'item add failed' : 'item added');
      });
    });
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
  console.log(req.body.item)
  let room = new Room(req.body.room);
  let item = new Item(req.body.item);
  console.log("item:",  item, "\n room:", room)
  // room.items.push(item);
  room.items.push(item._id);
  // console.log(room);

  item.save((err, savedItem)=>{
    err ? res.status(400).send(item) : console.log(savedItem);
  });
  room.save((err, savedRoom) => {
   //res.status(err ? 400 : 200).send(err || savedRoom);
    });
  
  });

module.exports = router;
