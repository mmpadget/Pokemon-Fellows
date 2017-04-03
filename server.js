'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http); // this requires socket.io, a live or active event/route handler.
const PORT = process.env.PORT || 3000;

let arenaNum = 1; // increment up as more player join arenas.

app.use(express.static('./public'));

app.get('/', function(req, res){
  res.sendFile('/index.html', {root: './public'});
});

// Socket.io information channels---------
// currently not set up to handle more than 2 clients. IE if three clients open the page it is going to be very confused at the moment.
io.on('connection', function(socket){ //io.connection sets up the paths/connections
  if(io.nsps['/'].adapter.rooms["arena-"+arenaNum] && io.nsps['/'].adapter.rooms["arena-"+arenaNum].length > 1)
    arenaNum++;
  socket.join("arena-"+arenaNum);
  //Send this event to everyone in the room.
  socket.to("arena-"+arenaNum).emit('connectToArena', {
    message: "You are in Arena. "+arenaNum,
    arena: "arena-"+arenaNum
  });

  socket.broadcast.to("arena-"+arenaNum).emit('player', true); //socket.emit transmits the player route to others. The optional ".broadcast" limits the emition to everyone other than the connector. This sends the boolean true to any other connected client. Lets them know a new player has joined.

  socket.on('player', function(data){ // this sets up a listener route waiting for a client to send something on the 'player' route.
    socket.broadcast.to(data.arena).emit('player', data.value); // broadcast the boolean true/data.value if the listener hears another client join.
  });

  socket.on('move', function(data){ //this is the route set up to handle moves/plays when the server recives a move,
    socket.broadcast.to(data.arena).emit('move', data.points); // it emits that move to everyone not the sender. ".broadcast"... socket.emit() would emit to every client including back to thesender.
  });
  console.log('a user connected'); // this logs to the server console/terminal
});
// end Socket.io channels------------------

http.listen(PORT, function(){
  console.log(`listening on *:${3000}`);
});
