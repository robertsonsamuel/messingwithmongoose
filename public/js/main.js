/* globals $: false , console:false , module:false , require:false*/
'use strict';

$(document).ready(init);

function init() {
  //console.log('Hello jQuery!');
$('#createButton').on('click', addRoom);



}



function addRoom(){

  var newRoom = {};
  var newItem = {};
  var $roomName = $('#modalNameEdit').val();
  var $itemName = $('#modalItemNameEdit').val();
  var $itemValue = $('#modalValueEdit').val();
  var $itemDescrip = $('#modalDescripEdit').val();
  
  newRoom.name = $roomName;
  // newRoom.items = [];

  newItem.name = $itemName;
  newItem.value = $itemValue;
  newItem.description = $itemDescrip;
  var data = {room:newRoom,item:newItem};
  // newRoom.items.push(newItem);
  // console.log(newRoom);
  $.ajax({
    url:'/rooms',
    type:'POST',
    data: data
  }).done();//console.log(newRoom));
  
// CALL MONGOOSE TO GET ID  addRoomItemDom();
  newRoom._id = 'testRoomId';

  addRoomItemDom(newRoom, newItem);

}
  

function addRoomItemDom(newRoom, newItem){
  var room ={};
  var item = {};

  room.name=newRoom.name;
  room._id=newRoom._id;

  item.name=newItem.name;
  item.value=newItem.value;
  item.description=newItem.description;
  item._id = 'newItem._id';

  //console.log("room",room,"item",item);

 var construct = '<div data-mongoroomid='+room._id+' class="col-xs-12 col-sm-12 col-md-12 col-lg-12">\
 <div id="accordion" class="panel-group"><div class="panel panel-default"><div class="panel-heading">\
 <h4 class="panel-title"><a data-toggle="collapse" data-parent="accordion" href="#'+room.name+'" \
 aria-expanded="false" class="collapsed">'+room.name+'</a></h4></div><div id="'+room.name+'" \
 class="panel-collapse collapse" aria-expanded="false" style="height: 0px;">\
 <div class="panel-body"><ul><li data-mongoitemid="'+item._id+'">'+item.name+'\
 </li></ul><br><button id="editButton" class="btn btn-success">Add Item</button>\
 <button id="editButton" class="btn btn-success">Edit Items</button><button id="deleteButton" class="btn btn-danger">Delete Item</button></div></div></div></div></div>'; 
 $('.container').append(construct); 

}



