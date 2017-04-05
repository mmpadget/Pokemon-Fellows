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
  battleController.selectSwitch = function() {
    $('#switch-button').on('click', function() {
      console.log('Pushed Switch Pokemon Button');
      $('#dashboard-bottom-default').hide();
      $('#dashboard-bottom-switch').show();
    });
  }

  battleController.selectFight = function() {
    $('#fight-button').on('click', function() {
      $('#dashboard-bottom-fight').hide();
      // console.log('Pushed Fight Button in selectFight');
      $('#dashboard-bottom-default').hide();
      $(`section[name="${$('.pokemon-selector').filter(':visible').attr('id')}"]`).show();
    });
  }

  // e. select attack
  battleController.selectAttack = function() {
    $('.attack').on('click', function() {
      Pokemon.sendStats.power = $(this).data('power');
      Pokemon.sendStats.attack = $(this).attr('name');
      Pokemon.sendStats.hp = $(`#${$(this).parent().attr('name')}`).data('hp');
      Pokemon.sendStats.speed = $(`#${$(this).parent().attr('name')}`).data('speed');
      Pokemon.sendStats.name = $(this).parent().attr('name');
      // debugger;
      console.log(Pokemon.sendStats);
      console.log('Pushed Attack Button in selectAttack');
      // let power = $(this).data('power');
      // console.log(power);
      $('.fight-template').hide();
      $('#dashboard-bottom-default').show();
    });
  }

  battleController.selectPokemonCharacter = function() {
    $('.pokemon-character').on('click', function() {
      Pokemon.sendStats.speed = $(this).data('speed');
      Pokemon.sendStats.hp = $(this).data('hp');
      Pokemon.sendStats.name = $(this).attr('id');
      Pokemon.sendStats.attack = false;
      Pokemon.sendStats.power = 0;
      console.log(Pokemon.sendStats);
      $('#dashboard-bottom-switch').hide();
      $('#dashboard-bottom-default').show();
      // eslint-disable-next-line
      $(`#${Pokemon.pokes[0].name}`).hide();
      $(`#${$(this).attr('id')}`).siblings().hide();
      $(`#${$(this).attr('id')}`).show();
    });
  }

  // f. share attacks
  // function shareAttacks() {
  //   $('')
  // }

  // g. fight math
  // function fightMath() {
  //
  // }

  // h. share results
  // function shareResults() {
  //
  // }

  // i. show fight
  // function showFight() {
  //
  // }

  // j. update health bars
  // function updateHealthBars() {
  //
  // }

  // k. pokemon faints
  // function pokemonFaints() {
  //
  // }

  // l. share win/loss state
  // function shareWinLossState() {
  //
  // }

  // m. play again screen
  // function playAgainScreen() {
  //
  // }

  // MAKE A FUNCTION PICKING BETWEEN 1-0 for true or false to pick who goes first
  // function whoGoesFirst() {
  //   let playerPicker = Math.random();
  //   let playerReturn = playerPicker < 0.5 ? Math.floor(playerPicker) : Math.ceil(playerPicker);
  //   return playerReturn;
  // }
  // Make aboutView available on global scope.
  module.battleController = battleController;
})(window);
