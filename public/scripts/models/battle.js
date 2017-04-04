'use strict';

$(function(module){
  function Pokemon(poke){
    //pokeConstructor here
    // name, hp, moves, power
    this.name = poke.poke.name;
    this.hp = poke.poke.stats[5].base_stat;
    this.moveSet = poke.moveSet.map(function (move) {
      return {name: move.name, power: move.power};
    });
    Pokemon.pokes.push(this);
    console.log(Pokemon.pokes);
  }

  // socket.io variables
  const socket = io(); //acceptable linter error, io is defined in the js file added by the socket.io node module.
  socket.arena;
  socket.host = false;
  socket.haveSecondPlayer = false;
  // end socket.io vars

  Pokemon.urlNumbers = []; //do some math and get 3 random numbers
  Pokemon.pokes = []; // array of pokes
  Pokemon.pokeObjects = [];
  Pokemon.theirPokes = []; //array for their pokes
  Pokemon.pokeUrl = 'http://pokeapi.co/api/v2/pokemon/';

  // const Player = function(){
  //   //your constructor here
  // };

  Pokemon.getSomePokes = () => {
    Pokemon.urlNumbers.forEach(function(number){
      $.get(`${Pokemon.pokeUrl}${number}/`, function(response){
        // 4 pokes. Array 0-3 // This is the HP response.stats[5].base_stat
        let poke = {poke: response, moveSet: []};

        for (let i = 0; i < 4; i++) {
          $.get(response.moves[i].move.url, function(move) {
            // have a url, assign API response: name, power, base_stat
            // console.log(move);
            // See constructor: move.name is move name and move.power is move power. Move is response.
            poke.moveSet.push(move);
            if (poke.moveSet.length === 4) {
              new Pokemon(poke);
            }
          });
        }
      })
      if (Pokemon.pokes.length === 3){
        battleView.attackExecute(Pokemon.pokes);
        //chain what happens next.
        Pokemon.sendToOpponent();
        // populate to page (pokes);
        // push to pokes;
        // if 3 pokes, sendtootherplayer()
      }
    });
  };

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
    socket.arena = data.arena;
    console.log(data.message);
  });

  Pokemon.populateToPage = () => {
    //put them onto page.
  }

  Pokemon.sendToOpponent = () => {
    //send them pokes with socket.io
  }

  // socket.on('sendPokes', function(pokes){ // pokes must be object with arena value.
    //populate their pokes to page. reuse populateToPage if possible.
  // });
  Pokemon.getRandomNumbers = () => {
    //need urlNumbers to have 3 random number from 1-upper limit of api poke index
    Pokemon.urlNumbers = [1,4,7];
  }

  Pokemon.getRandomNumbers();
  Pokemon.getSomePokes();
  module.Pokemon = Pokemon;
}(window));
