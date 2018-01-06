var express = require('express');
var app = express();
var server = app.listen(8080);

var socket = require('socket.io');
var io = socket(server);

users = [];
connections = [];

console.log('server running ...')

io.sockets.on('connection', function(socket){ // socket param is like this, the instante socket connecting to the server 
 connections.push(socket);
 console.log('Connected: %s sockets connected', connections.length);

//user disconnect
 socket.on('disconnect',function(data){
 users.splice(users.indexOf(socket.username),1);
 updateUsernames(); 
 connections.splice(connections.indexOf(socket),1);
 console.log('Disconnected: %s sockets conected', connections.length);
});
 //send message
 socket.on('send message', function(data){
 
  io.sockets.emit('new message',{msg: data, user: socket.username});
 });

 //typing...
 socket.on('typing',function(data){
 	console.log(data+ " is typing...");
 	socket.broadcast.emit('typing',data);
 });

 //new User

 socket.on('new user', function(data,callback){
  callback(true);
  socket.username = data;
  users.push(socket.username);
  updateUsernames();
 });

 function updateUsernames(){
  io.sockets.emit('get users', users)
 }
});﻿