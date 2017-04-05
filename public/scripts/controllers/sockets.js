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
    socket.pokesReceived = true;
    battleView.addEvents();
    console.log('We have all their pokes');
    battleView.renderTheirPokemon();
  });

  socket.on('attack', function(attack){
    console.log('their attack ', attack);
    Pokemon.theirAttack = attack; //data is pokes array comeing from second player
    console.log('We have their attack');
    Pokemon.attackReceived = true;
    battleController.fightMath();
  });

  socket.on('results', function(results){
    console.log('the results of fight', results);
    Pokemon.results = results; //data is pokes array comeing from second player
    battleController.updateHealth();
  });

  // disconnect listener
  socket.on('testDisconnect', function(data){
    // doSomethingOnUserDisconnect();//make this something graceful
    console.log('a user disconnected: do something', data)
  });
  // end Socket.io listeners -------------------

  // functions with broadcasts ---------------
  socket.sendPokemon = () => {
    socket.emit('pokes', {arena: socket.arena, pokes: Pokemon.pokes});
    socket.pokesSent = true;
  }

  socket.sendAttack = () => {
    socket.emit('attack', {arena: socket.arena, attack: Pokemon.ourAttack});
    // socket.pokesSent = true;
  }

  socket.shareResults= () => {
    let results ={};
    results.ourAttack = Pokemon.results.theirAttack;
    results.theirAttack = Pokemon.results.ourAttack;
    results.ourHp = Pokemon.results.theirHp;
    results.theirHp = Pokemon.results.ourHp;
    results.ourPoke = Pokemon.results.theirPoke;
    results.theirPoke = Pokemon.results.ourPoke;
    socket.emit('results', {arena: socket.arena, results: results});
  }

  module.socket = socket;
}(window));
