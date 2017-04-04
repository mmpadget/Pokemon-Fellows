'use strict';

$(function(module){

  // socket.io variables
  const socket = io();
  socket.arena;
  socket.host = false;
  socket.haveSecondPlayer = false;
  // end socket.io vars

  let urlNumbers = []; //do some math and get 3 random numbers
  let pokes = []; // array of pokes
  let pokeObjects = [];
  let thierPokes = []; //array for their pokes
  const pokeUrl = 'http://pokeapi.co/api/v2/pokemon/';

  const PlayerConstructor = function(pokes, arena){
    //your constructor here
  };

  const Poke = function(poke){
    //pokeConstructor here
    // name, hp, moves, power
    this.name = poke.poke.name;
    this.hp = poke.poke.stats[5].base_stat;
    this.moveSet = poke.moveSet.map(function (move) {
      return {name: move.name, power: move.power};
    });
    pokes.push(this);
    console.log(pokes);
  };

  function getSomePokes(){
    urlNumbers.forEach(function(number){
      $.get(`${pokeUrl}${number}/`, function(response){
        // 4 pokes. Array 0-3 // This is the HP response.stats[5].base_stat
        let poke = {poke: response, moveSet: []};

        for (let i = 0; i < 4; i++) {
          $.get(response.moves[i].move.url, function(move) {
            // have a url, assign API response: name, power, base_stat
            // console.log(move);
            // See constructor: move.name is move name and move.power is move power. Move is response.
            poke.moveSet.push(move);
            if (poke.moveSet.length === 4) {
              new Poke(poke);
            }
          });
        }
      })
      if (pokes.length === 3){
        battleView.attackExecute(pokes);
        //chain what happens next.
        sendToOpponent();
        // populate to page (pokes);
        // push to pokes;
        // if 3 pokes, sendtootherplayer()
      }
    });
  }

  socket.on('connectToArena', function(data){
    socket.arena = data.arena;
    console.log(data.message);
  });

  function populateToPage(){
    //put them onto page.
  }

  function sendToOpponent(){
    //send them pokes with socket.io
  }

  // socket.on('sendPokes', function(pokes){ // pokes must be object with arena value.
    //populate their pokes to page. reuse populateToPage if possible.
  // });
  function getRandomNumbers(){
    //need urlNumbers to have 3 random number from 1-upper limit of api poke index
    urlNumbers = [1,4,7];
  }

  getRandomNumbers();
  // getSomePokes();
  module.socket = socket;
}(window));
