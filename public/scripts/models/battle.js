'use strict';

$(function(module){
  function Pokemon(poke){
    //pokeConstructor here
    // name, hp, moves, power
    this.name = poke.poke.name;
    this.id = poke.poke.id;
    this.frontSprite = `assets/sprites/pokemon/${poke.poke.id}.png`;
    this.backSprite = `assets/sprites/pokemon//back/${poke.poke.id}.png`;
    this.sprite = this.backSprite;
    this.hp = poke.poke.stats[5].base_stat;
    this.speed = poke.poke.stats[0].base_stat;
    this.moveSet = poke.moveSet.map(function (move) {
      return {name: move.name, power: move.power};
    });
    Pokemon.pokes.push(this);
    console.log(Pokemon.pokes);
  }

  Pokemon.urlNumbersLimit = 2;
  Pokemon.urlNumbers = []; //do some math and get 3 random numbers
  Pokemon.pokes = []; // array of pokes
  Pokemon.pokeObjects = [];
  Pokemon.theirPokes = []; //array for their pokes
  Pokemon.pokeUrl = 'http://pokeapi.co/api/v2/pokemon/';
  Pokemon.numberOfMoves = 4;
  Pokemon.ourAttack = {};
  Pokemon.theirAttack = {};
  Pokemon.results = {};
  // const Player = function(){
  //   //your constructor here
  // };

  Pokemon.getSomePokes = () => {
    Pokemon.urlNumbers.forEach(function(number){
      $.get(`${Pokemon.pokeUrl}${number}/`, function(response){
        // 4 pokes. Array 0-3 // This is the HP response.stats[5].base_stat
        let poke = {poke: response, moveSet: []};

        for (let i = 0; i < Pokemon.numberOfMoves; i++) {
          $.get(response.moves[i].move.url, function(move) {
            // have a url, assign API response: name, power, base_stat
            // console.log(move);
            // See constructor: move.name is move name and move.power is move power. Move is response.
            poke.moveSet.push(move);
            if (poke.moveSet.length === 4) {
              new Pokemon(poke);
            }
            if (Pokemon.pokes.length === 3){
              //chain what happens next.
              console.log('Ajax call complete calling functions');
              Pokemon.sendToOpponent();
              // populate to page (pokes);
              battleView.init();
            }
          });
        }
      })
    });
  };

  // uses socket.emit to send out pokes.
  Pokemon.sendToOpponent = () => {
    if (Pokemon.pokes.length === 3 && socket.haveSecondPlayer && !socket.pokesSent){ //need to have 3 poke and a second player. This is called in 2 places and should run once when both conditions are met. Also in the event that both calls are added to the stack and true. this will only run once because of pokeSent flag.
      console.log('Sending pokes to second player');
      socket.sendPokemon();// this is handled in socket.js now
    }
  }

  Pokemon.getRandomNumbers = () => {
    //need urlNumbers to have 3 random number from 1-upper limit of api poke index
    Pokemon.urlNumbers = [];
    for(let i = 0; i < Pokemon.urlNumbersLimit; i++){
      let returnRandomNum = Math.floor(Math.random() * (150 - 1) + 1);
      if(Pokemon.urlNumbers[1] === Pokemon.urlNumbers[0] || Pokemon.urlNumbers[1] === Pokemon.urlNumbers[0]){
        Pokemon.urlNumbers.pop();
        i--
      }
      Pokemon.urlNumbers.push(returnRandomNum)
    }
  }
  Pokemon.getRandomNumbers();
  // Pokemon.getSomePokes();
  module.Pokemon = Pokemon;

}(window));
