'use strict';

$(function(module){
  // socket.io variables
  // eslint-disable-next-line
  const socket = io(); //acceptable linter error, io is defined in the js file added by the socket.io node module.
  socket.arena;
  socket.host = false;
  socket.haveSecondPlayer = false;
  socket.socketStatesReset = () => {
    socket.pokesSent = false;
    socket.attacksSent = false;
  }
  socket.socketStatesReset();
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
    socket.haveSecondPlayer = data; //data is boolean true if coming from second player
    Pokemon.sendToOpponent();
    console.log('There is a second Player');
  });

  socket.on('pokes', function(data){
    data.forEach(ele => ele.sprite = ele.frontSprite);
    Pokemon.theirPokes = data; //data is pokes array coming from second player
    socket.pokesReceived = true;
    battleView.addEvents();
    console.log('We have all their pokes');
    battleView.renderTheirPokemon();
  });

  socket.on('attack', function(attack){
    console.log('Recieved their attack ', attack);
    Pokemon.theirAttack = attack; //data is pokes array comeing from second player
    Pokemon.attackReceived = true;
    if (Pokemon.ourPokeChanged) {
      battleView.updateMyChangedPokemon(Pokemon.ourAttack.name);
    }
    battleController.fightMath();
  });

  socket.on('results', function(results){
    console.log('the results of fight', results);
    Pokemon.results = results; //data is pokes array comeing from second player
    battleController.updateHealth();
  });

  // disconnect listener
  socket.on('disconnect', function(data){
    battleController.gameOver('disconnect');
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
    socket.attacksSent = true;
  }

  socket.shareResults= () => {
    let results ={};//switcharoo for other client, not "host"
    results.ourAttack = Pokemon.results.theirAttack;
    results.theirAttack = Pokemon.results.ourAttack;
    results.ourHp = Pokemon.results.theirHp;
    results.theirHp = Pokemon.results.ourHp;
    results.ourPoke = Pokemon.results.theirPoke;
    results.theirPoke = Pokemon.results.ourPoke;
    results.ourAttackPower = Pokemon.results.theirAttackPower;
    results.theirAttackPower = Pokemon.results.ourAttackPower;
    results.ourFaint = Pokemon.results.theirFaint;
    results.theirFaint = Pokemon.results.ourFaint;
    socket.emit('results', {arena: socket.arena, results: results});
  }

  module.socket = socket;
}(window));
