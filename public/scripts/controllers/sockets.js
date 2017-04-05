'use strict';

$(function(module){
  // socket.io variables
  // eslint-disable-next-line
  const socket = io(); //acceptable linter error, io is defined in the js file added by the socket.io node module.
  socket.arena;
  socket.host = false;
  socket.haveSecondPlayer = false;
  socket.pokesSent = false;
  // end socket.io vars

  // socket.io listeners--------------------
  socket.on('connectToArena', function(data){
    socket.arena = data.arena;
    console.log(data.message);
    socket.emit('player', {arena: socket.arena, player: true}); // on connect to server, broadcast I'm a player to arena.
  });

  socket.on('host', function(data){
    socket.host = data.host;
    console.log(data.message);
  });

  socket.on('player', function(data){
    socket.haveSecondPlayer = data; //data is boolean true if comeing from second player
    Pokemon.sendToOpponent();
    console.log('There is a second Player');
  });

  socket.on('pokes', function(data){
    Pokemon.theirPokes = data; //data is pokes array comeing from second player
    console.log('We have all their pokes');
    battleView.renderTheirPokemon();
  });
  // end Socket.io listeners -------------------

  // functions with broadcasts ---------------
  socket.sendPokemon = () => {
    socket.emit('pokes', {arena: socket.arena, pokes: Pokemon.pokes});
    socket.pokesSent = true;
  }
  module.socket = socket;
}(window));
