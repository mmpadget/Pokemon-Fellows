'use strict';

// $(function(module){
  //runs on page load
  let arena;
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
    // this.name = name...
    // this.hp = hp...
    // console.log(poke,'what is here???');
    this.moves = poke.moves.map(function (move) {
      return {name: move.name, power: move.power};
    });
    pokeObjects.push(this);
    console.log(pokeObjects);
  };

  // First hold in local storage.

  // Then build constructor.

  function getSomePokes(pokes, urlNumbers){
    urlNumbers.forEach(function(number){
      $.get(`${pokeUrl}${number}/`, function(response){
        // 4 pokes. Array 0-3 // This is the HP response.stats[5].base_stat
        let poke = {poke: response, moves: []};

        for (let i = 0; i < 4; i++) {
          $.get(response.moves[i].move.url, function(move) {
            // have a url, assign API response: name, power, base_stat
            // console.log(move);
            // See constructor: move.name is move name and move.power is move power. Move is response.

            poke.moves.push(move);
            // console.log(poke);
            console.log('i: ', i);
            if (i === 3) {
              new Poke(poke);
            }
          });
        }

        //build the constructor
        //pokes.push(poke);;
      })
      //chain what happens next.
      // populate to page (pokes);
      // push to pokes;
      // if 6 pokes, sendtootherplayer()
    });
  }

  function populateToPage(pokes){
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
  getSomePokes(pokes, urlNumbers);
// })(window);
