'use strict';

$(function(){
  //runs on page load
  let arena;
  let urlNumbers = []//do some math and get 3 random numbers
  let pokes = []// array of pokes
  let thierPokes = []//array for their pokes

  const PlayerConstructor = function(pokes, arena){
    //your constructor here
    const PokeConst = function(pokes){
      //pokeConstructor here
    };
  };



  function getSomePokes(pokes, urlNumbers){
    urlNumbers.forEach({
      $.get(`url/${urlNumbers[index]}`, function(response){
        //build the constructor
        pokes.push(response);
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
  });
  function getRandomNumbers(){
    //need urlNumbers to have 3 random number from 1-upper limit of api poke index
    urlNumbers = [1,4,7];
  }
  getRandomNumbers();
  getSomePokes(pokes, urlNumbers);
})
