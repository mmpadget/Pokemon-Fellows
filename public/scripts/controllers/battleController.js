'use strict';
// Control the view with show/hide.
// Control the model business with function calls.

(function(module) {
  // See battleController.init in routes.js
  const battleController = {};

  // Initialize the battle page view. /battle in routes.
  battleController.index = function() {
    $('.all-content').hide(); // Hide all content.
    $('#battle-content').show(); // Show battle content.
    $('body').css('background-image', 'url()');
      $('#about-click a, #home-click a').css('color', 'black');
    Pokemon.getSomePokes();
  }

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
      Pokemon.ourAttack.hp = $('#player-one-pokemon').children().filter(':visible').data('hp');
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
      console.log('Pushed select char button, Pokemon.ourAttack object created');
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
    Pokemon.selectedAttack = true;
    if(!socket.host){
      socket.sendAttack();
      console.log('Sending attack', Pokemon.ourAttack);
    }
    battleController.fightMath();
  }

  // g. fight math
  battleController.fightMath = () => {
    if (Pokemon.selectedAttack && Pokemon.attackReceived){
      // if ('their poke changed'){
      //   //change the pokemon out.
      // }
      console.log('---fight math start---');
      console.log('Pokemon.ourAttack object ', Pokemon.ourAttack);
      console.log('Pokemon.theirAttack object ', Pokemon.theirAttack);

      Pokemon.results.ourHp = Pokemon.ourAttack.hp;
      Pokemon.results.theirHp = Pokemon.theirAttack.hp;

      if (Pokemon.ourAttack.speed >= Pokemon.theirAttack.speed){
        Pokemon.results.theirAttackPower = Pokemon.theirAttack.power;
        console.log('Player One\'s pokemon has a higher speed --> they attack first.');
        Pokemon.results.theirHp = ourTurn();
        console.log('Player Two Pokémon\'s HP: ', Pokemon.results.theirHp);
        if (Pokemon.results.theirHp !== 0) {
          console.log('Player Two\'s pokemon HP is > 0 therefore, they attack, too');
          Pokemon.results.ourHp = theirTurn();
          console.log('Player One Pokémon\'s HP: ', Pokemon.results.ourHp);
        }
      } else {
        console.log('Player Two\'s pokemon has a higher speed --> they attack first.');
        Pokemon.results.ourHp = theirTurn();
        console.log('Player One Pokémon\'s HP: ', Pokemon.results.ourHp);
        if (Pokemon.results.ourHp !== 0) {
          console.log('Player One\'s pokemon HP is > 0 therefore, they attack, too');
          Pokemon.results.theirHp = ourTurn();
          console.log('Player Two Pokémon\'s HP: ', Pokemon.results.theirHp);
        }
      }

      // These functions calculate the fight results and handle if power >= hp
      function ourTurn(){
        if (Pokemon.theirAttack.hp <= Pokemon.ourAttack.power) {
          Pokemon.results.ourAttackPower = Pokemon.ourAttack.power;
          console.log('Player Two\'s pokemon fainted');
          Pokemon.results.theirAttackPower = 0;
          return 0;
        } else {
          Pokemon.results.ourAttackPower = Pokemon.ourAttack.power;
          return Pokemon.theirAttack.hp - Pokemon.ourAttack.power;
        }
      }
      function theirTurn(){
        if (Pokemon.ourAttack.hp <= Pokemon.theirAttack.power) {
          // Pokemon.results.ourFaint = true;
          // console.log('Player One Pokémon\'s HP: ', Pokemon.results.ourHp);
          console.log('Player One\'s pokemon fainted');
          Pokemon.results.ourAttackPower = 0;
          return 0;
        } else {
          Pokemon.results.theirAttackPower = Pokemon.theirAttack.power;
          return Pokemon.ourAttack.hp - Pokemon.theirAttack.power;
        }
      }

      Pokemon.results.ourPoke = Pokemon.ourAttack.name;
      Pokemon.results.theirPoke = Pokemon.theirAttack.name;
      Pokemon.results.ourAttack = Pokemon.ourAttack.attack;
      Pokemon.results.theirAttack = Pokemon.theirAttack.attack;

      console.log('this is the results object ', Pokemon.results);
      console.log('--------end fight ---------');
      battleController.shareResults();
    }
  };

  // h. share results
  battleController.shareResults = () => {
    socket.shareResults();
    console.log('our HP ', Pokemon.results.ourHp);
    console.log('their HP ', Pokemon.results.theirHp);
    console.log('Sending results');
    battleController.updateHealth();
  }

  // j. update health bars
  battleController.updateHealth = () => { //remember health is located on the pokemon and the buttons.
    console.log('Updating DOM object health values');
    $('#player-one-pokemon').children().filter(':visible').data('hp', Pokemon.results.ourHp);
    $('#player-two-pokemon').children().filter(':visible').data('hp', Pokemon.results.theirHp);
    battleController.animate();
  }

  battleController.animate = () => {
    battleView.healthBarUpdate();
    function showFight(){
      console.log('Showing fight');
      battleController.pokemonFaints();
      battleController.attackValueResets = () => {
        Pokemon.ourAttack = {};
        Pokemon.theirAttack = {};
        Pokemon.results = {};
        Pokemon.selectedAttack = false;
        Pokemon.attackReceived = false;
      }
    }
  }
  // Pokemon.ourAttack.hp = $(this).data('hp');
  // Pokemon.results.ourHp;
  // Pokemon.results.theirHp;

  //k. pokemon faints
  battleController.pokemonFaints = () => {
    // let death = false;

    if (Pokemon.results.ourHp === 0) {
      // Pokemon.results.ourPoke
      $('#player-one-pokemon').filter(':visible').hide();
      $(`button[id="${Pokemon.results.ourPoke}"]`).off('click');
    }

    if (Pokemon.results.theirHp === 0) {
      // Pokemon.results.ourPoke
      $('#player-two-pokemon').filter(':visible').hide();
      $(`button[id="${Pokemon.results.theirPoke}"]`).off('click');
    }

    // else if (Pokemon.results.theirHp) {
    //   Pokemon.results.theirPoke
    // }

    // if (death === true) {
    //   battleController.gameOver();
    // }

    // PLAYER 1
    // let death = FALSE;
    // health = 100 @ start FALSE <<< HP start
    // health > 0 @ play FALSE <<< HP current
    // health = 0 @ death TRUE
    // FOR EACH OF 3 POKEMON
    // pokemon = @ start 3
    // pokemon = @ death 0 TRUE trigger gameOver

    // PLAYER 2
    // let death = FALSE;
    // health = 100 @ start FALSE
    // health > 0 @ play FALSE
    // health = 0 @ death TRUE
    // FOR EACH OF 3 POKEMON
    // pokemon @ start = 3
    // pokemon @ death = 0 TRUE trigger gameOver

    // if (pokemon death === true) {
      // Call gameOver;
    // }
  }

    // l. share win/loss state. All pokemon are dead.
  battleController.gameOver = () => {

  }

  // battleController.scoreScreen = () => {
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
