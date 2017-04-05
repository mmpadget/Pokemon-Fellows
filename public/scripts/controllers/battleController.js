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
      Pokemon.ourAttack.power = $(this).data('power');
      Pokemon.ourAttack.attack = $(this).attr('name');
      Pokemon.ourAttack.hp = $(`#${$(this).parent().attr('name')}`).data('hp');
      Pokemon.ourAttack.speed = $(`#${$(this).parent().attr('name')}`).data('speed');
      Pokemon.ourAttack.name = $(this).parent().attr('name');
      battleController.shareAttacks();//send attacks asap
      console.log('Pushed Attack Button, Pokemon.ourAttack object created');
      $('.fight-template').hide();
      $('#dashboard-bottom-default').show();
    });
  }

  battleController.selectPokemonCharacter = function() {
    $('.pokemon-character').on('click', function() {
      Pokemon.ourAttack.speed = 0;
      Pokemon.ourAttack.hp = $(this).data('hp');
      Pokemon.ourAttack.name = $(this).attr('id');
      Pokemon.ourAttack.attack = false;
      Pokemon.ourAttack.power = 0;
      battleController.shareAttacks();//send attacks asap
      console.log('Pushed select chaer button, Pokemon.ourAttack object created');
      $('#dashboard-bottom-switch').hide();
      $('#dashboard-bottom-default').show();
      // eslint-disable-next-line
      $(`#${Pokemon.pokes[0].name}`).hide();
      $(`#${$(this).attr('id')}`).siblings().hide();
      $(`#${$(this).attr('id')}`).show();
    });
  }

  // f. share attacks
  battleController.shareAttacks = () => {
    if(!socket.host){
      socket.sendAttack();
    }
  }

  // g. fight math
  battleController.fightMath = () => {
    if ('their poke changed'){
      //change the pokemon out.
    }
    console.log('---fight math start---');
    console.log('ourAttack is ', ourAttack);
    console.log('theirAttack is ', theirAttack);
    if (Pokemon.ourAttack.speed >= Pokemon.theirAttack.speed){
      ourTurn();
      theirTurn();
    } else {
      theirTurn();
      ourTurn();
    }
    function ourTurn(){
      console.log('out turn');
      Pokemon.results.theirHp = Pokemon.theirAttack.hp - Pokemon.ourAttack.power;
    }
    function theirTurn(){
      Pokemon.results.ourHp = Pokemon.ourAttack.hp - Pokemon.theirAttack.power;
    }
    Pokemon.results.ourPoke = Pokemon.ourAttack.name;
    Pokemon.results.theirPoke = Pokemon.theirAttack.name;
    Pokemon.results.theirAttack = Pokemon.theirAttack.attack;
    Pokemon.results.ourAttack = Pokemon.ourAttack.attack;
    console.log('fight results ', Pokemon.results);
  };

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
