'use strict';
// Control the view with show/hide.
// Control the model business with function calls.

(function(module) {
  // See battleController.init in routes.js
  const battleController = {};

  // TODO: Invoke Pokemon API function (defined in models).
  // TODO: Add any aboutView logic here. jQuery hide, Middleware for loading data array or API data.
  // NOTE: battleController.doSomething = (ctx, next) => {};

  // d. select pokemon
  function selectPokemon() {
    $('')
  }
  selectPokemon();

  battleController.selectFight = function() {
    // eslint-disable-next-line
    $('#fight-button').on('click', function() {
      // console.log('Pushed Fight Button in selectFight');
      $('#dashboard-bottom-default').hide();
      $('#dashboard-bottom-fight').show();
    });
  }

  // e. select attack
  battleController.selectAttack = function() {
    $('.attack').on('click', function() {
      console.log('Pushed Attack Button in selectAttack');
      // let power = $(this).data('power');
      // console.log(power);
      $('#dashboard-bottom-fight').hide();
      $('#dashboard-bottom-default').show();
    });
  }

  // f. share attacks
  function shareAttacks() {
    $('')
  }

  // g. fight math
  function fightMath() {

  }

  // h. share results
  function shareResults() {

  }

  // i. show fight
  function showFight() {

  }

  // j. update health bars
  function updateHealthBars() {

  }

  // k. pokemon faints
  function pokemonFaints() {

  }

  // l. share win/loss state
  function shareWinLossState() {

  }

  // m. play again screen
  function playAgainScreen() {

  }

  // MAKE A FUNCTION PICKING BETWEEN 1-0 for true or false to pick who goes first
  // function whoGoesFirst() {
  //   let playerPicker = Math.random();
  //   let playerReturn = playerPicker < 0.5 ? Math.floor(playerPicker) : Math.ceil(playerPicker);
  //   return playerReturn;
  // }
  // Make aboutView available on global scope.
  module.battleController = battleController;
})(window);
