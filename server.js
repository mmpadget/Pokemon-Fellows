'use strict';

// EXAMPLE: MINIMUM SERVER NECESSARY
// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 8888;
// app.use(express.static('./public'));
// app.get('*', (req, res) => {
//   res.sendFile('index.html', {root: './public'});
// });
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

const express = require('express');
const app = express();
// eslint-disable-next-line
const http = require('http').Server(app);
const io = require('socket.io')(http); // this requires socket.io, a live or active event/route handler.
const PORT = process.env.PORT || 3000;

let arenaNum = 1; // increment up as more player join arenas.
// keep track of each arenas, on disconnect, need to handle player left behind.

// ------ USE ------
app.use(express.static('./public'));

// ------ GET ------

// app.get('*', (req, res) => {
//   res.sendFile('index.html', { root: './public' })
// })

app.get('/', function(req, res){
  res.sendFile('index.html', {root: './public'});
});

app.get('/battle', function(req, res){
  res.sendFile('index.html', {root: './public'});
});

app.get('/about', function(req, res){
  res.sendFile('index.html', {root: './public'});
});

// EXAMPLE:
// app.get('/', (request, response) => response.sendFile('index.html', {root: '.'}));
// app.get('/new', (request, response) => response.sendFile('new.html', {root: '.'}));
// app.get('/articles', (request, response) => {
//   client.query(
//     SELECT...
//   )
//   .then(result => response.send(result.rows))
//   .catch(console.error);
// });

// ------ APP.POST ------

// EXAMPLE:
// app.post('/articles', (request, response) => {
//   client.query(
//     INSERT...
//   )
//   .then(() => {
//     client.query(
//       INSERT...
//     )
//   })
//   .then(() => response.send('Insert complete'))
//   .catch(console.error);
// });

// ------ APP.PUT ------

// EXAMPLE:
// app.put('/articles/:id', (request, response) => {
//   client.query(
//     UPDATE...
//   )
//   .then(() => {
//     client.query(
//       UPDATE...
//     )
//   })
//   .then(() => response.send('Update complete'))
//   .catch(console.error);
// });

// ------ APP.DELETE ------

// EXAMPLE:
// app.delete('/articles/:id', (request, response) => {
//   client.query(
//     DELETE...
//   )
//   .then(() => response.send('Delete complete'))
//   .catch(console.error);
// });

// ------ CALL DB ------

// EXAMPLE:
// loadDB();

// ------ APP.LISTEN ------

// EXAMPLE:
// app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));

// app.listen(PORT, function() {
//   console.log('Your app is being served on ' + PORT);
// })

// Stretch goal custom 404 page

// ------ DATABASE ------

// ------ SOCKET ------

// Socket.io information channels---------
io.on('connection', function(socket){ //io.connection sets up the paths/connections
  let arena = 'arena-' + arenaNum;
  socket.join(arena, function(){
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

  socket.on('attack', function(data){ //this is the route set up to handle attacks/switches
    socket.broadcast.to(data.arena).emit('attack', data.attack);
  });

  socket.on('results', function(data){ //this is the route set up to handle attacks/switches
    socket.broadcast.to(data.arena).emit('results', data.results);
  });

  socket.on('disconnect', function(socket){
    console.log('a user disconnected', socket)
    io.to(arena).emit('testDisconnect', true);
  });

  console.log('a user connected'); // this logs to the server console/terminal
  if(io.nsps['/'].adapter.rooms[arena] && io.nsps['/'].adapter.rooms[arena].length > 1){
    arenaNum++;
  }
});
// end Socket.io channels------------------

http.listen(PORT, function(){
  console.log(`listening on *:${3000}`);
});
