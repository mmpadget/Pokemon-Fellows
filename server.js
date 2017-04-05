'use strict';

const express = require('express');
const app = express();
// eslint-disable-next-line
const http = require('http').Server(app);
const io = require('socket.io')(http); // this requires socket.io, a live or active event/route handler.
const PORT = process.env.PORT || 3000;

let arenaNum = 1; // increment up as more player join arenas.
let arenas = []; // keep track of each arenas, on disconnect, need to handle player left behind.

app.use(express.static('./public'));

app.get('/', function(req, res){
  res.sendFile('/index.html', {root: './public'});
});

// Socket.io information channels---------
io.on('connection', function(socket){ //io.connection sets up the paths/connections
  let arena = 'arena-' + arenaNum;
  if(io.nsps['/'].adapter.rooms[arena] && io.nsps['/'].adapter.rooms[arena].length > 1){
    arenaNum++;
  }

  socket.join(arena, function(){
    // arenas[arenas.length - 1].players.push(socket);
    // console.log('there are ' + arenas.length + ' arenas');
    // console.log(arena + ' has' + arenas[arenas.length-1].players.length + ' players');

    //Send this event to everyone in the room.
    console.log('Player Conneted in ' + arena);
    io.to(arena).emit('connectToArena', {
      message: 'You are in ' + arena,
      arena: arena
    });
    if (io.nsps['/'].adapter.rooms[arena].length === 1){
      io.to(arena).emit('host', {
        message: 'You are hosting this game',
        host: true
      })
    }
  });

  socket.on('player', function(data){ // this sets up a listener route waiting for a client to send something on the 'player' route.
    socket.broadcast.to(data.arena).emit('player', data.player); // broadcast the boolean true/data.value if the listener hears another client join.
  });

  socket.on('pokes', function(data){
    socket.broadcast.to(data.arena).emit('pokes', data.pokes);
  });

  socket.on('attack', function(data){ //this is the route set up to handle moves/plays when the server recives a move,
    socket.broadcast.to(data.arena).emit('move', data.points); // it emits that move to everyone not the sender. ".broadcast"... socket.emit() would emit to every client including back to thesender.
  });
  console.log('a user connected'); // this logs to the server console/terminal
});
// end Socket.io channels------------------

http.listen(PORT, function(){
  console.log(`listening on *:${3000}`);
});
