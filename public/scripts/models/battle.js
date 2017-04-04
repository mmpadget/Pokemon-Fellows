'use strict';

// $(function(module){
  //runs on page load
  let arena;
  let urlNumbers = []//do some math and get 3 random numbers
  let pokes = []// array of pokes
  let thierPokes = []//array for their pokes
  const pokeUrl = 'http://pokeapi.co/api/v2/pokemon/'

  const PlayerConstructor = function(pokes, arena){
    //your constructor here
    const PokeConst = function(pokes){
      //pokeConstructor here
    };
  };



  function getSomePokes(pokes, urlNumbers){
    urlNumbers.forEach(function(number){
      $.get(`${pokeUrl}${number}/`, function(response){
        // 4 pokes. Array 0-3 // This is the HP response.stats[5].base_stat
        let poke = {poke: response, moves: []};
        for (var i = 0; i < 4; i++) {
          $.get(response.moves[i].move.url, function(move) {
            // have a url, assign API response: name, power, base_stat
            // console.log(move);
            // See constructor: move.name is move name and move.power is move power. Move is response.
            poke.moves.push(move);
          });
        }
        //build the constructor
        pokes.push(poke);
      });
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
