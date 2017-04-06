'use strict';
// Control the view with show/hide.
// Control the model business with function calls.

(function(module) {
  const battleController = {};

  // Initialize the battle page view. /battle in routes.
  battleController.index = function() {
    $('.all-content').hide(); // Hide all content.
    $('#battle-content').show(); // Show battle content.
    $('body').css('background-image', 'url()');
    $('#about-click a, #home-click a').css('color', 'black');
    Pokemon.getSomePokes();
  }

  battleController.selectSwitch = function() {
    $('#switch-button').on('click', function() {
      $('#dashboard-bottom-default').hide();
      $('#dashboard-bottom-switch').show();
      console.log('Clicked selectSwitch Button');
      $('#instructions-text').text('Click on a Pokémon.');
    });
  }

  battleController.selectFight = function() {
    $('#fight-button').on('click', function() {
      $('#dashboard-bottom-fight').hide();
      $('#dashboard-bottom-default').hide();
      $(`section[name="${$('.pokemon-selector').filter(':visible').attr('id')}"]`).show();
      console.log('Clicked selectFight Button');
      $('#instructions-text').text('Click on an attack.');
    });
  }

  battleController.selectAttack = function() {
    $('.attack').on('click', function() {
      Pokemon.ourAttack.power = $(this).data('power');
      Pokemon.ourAttack.attack = $(this).attr('name');
      Pokemon.ourAttack.hp = $('#player-one-pokemon').children().filter(':visible').data('hp');
      Pokemon.ourAttack.speed = $(`#${$(this).parent().attr('name')}`).data('speed');
      Pokemon.ourAttack.name = $(this).parent().attr('name');
      battleController.shareAttacks();//send attacks asap
      $('.fight-template').hide();
      console.log('Pushed Attack button, Pokemon.ourAttack object created');
      $('#instructions-text').text('Waiting on the other player...');
    });
  }

  battleController.selectPokemonCharacter = function() {
    $('.pokemon-character').on('click', function() {
      console.log(`Our pokemon will change to ${$(this).attr('id')}`);
      Pokemon.ourPokeChanged = true;
      Pokemon.ourAttack.speed = 0;
      Pokemon.ourAttack.hp = $(this).data('hp');
      Pokemon.ourAttack.name = $(this).attr('id');
      Pokemon.ourAttack.attack = false;
      Pokemon.ourAttack.power = 0;
      battleController.shareAttacks();//send attacks asap
      // console.log('Pushed select char button, Pokemon.ourAttack object created');
      $('#dashboard-bottom-switch').hide();
      $(`#${Pokemon.pokes[0].name}`).hide();
      $(`#${$(this).attr('id')}`).siblings().hide();
      $(`#${$(this).attr('id')}`).show();
      console.log('Clicked selectPokemonCharacter Button');
      $('#instructions-text').text('Waiting on the other player...');
    });
  }

  battleController.shareAttacks = () => {
    Pokemon.selectedAttack = true;
    if(!socket.host){
      socket.sendAttack();
      console.log('Sending attack', Pokemon.ourAttack);
    }
    battleController.fightMath();
  }

  battleController.fightMath = (handleSwitchedPokeCallback) => {
    if (Pokemon.selectedAttack && Pokemon.attackReceived){
      if (handleSwitchedPokeCallback) handleSwitchedPokeCallback();
      $('#dashboard-bottom-default').show();
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
        console.log(`${Pokemon.ourAttack.name} has a higher speed --> and attacks first.`);
        Pokemon.results.theirHp = ourTurn();
        console.log(`${Pokemon.theirAttack.name}'s HP: ${Pokemon.results.theirHp}`);
        if (Pokemon.results.theirHp !== 0) {
          console.log(`${Pokemon.theirAttack.name}'s HP is > 0 therefore, they attack, too`);
          Pokemon.results.ourHp = theirTurn();
          console.log(`${Pokemon.ourAttack.name}'s HP: ${Pokemon.results.ourHp}`);
        }
      } else {
        Pokemon.results.ourAttackPower = Pokemon.ourAttack.power;
        console.log(`${Pokemon.theirAttack.name} has a higher speed --> attacks first.`);
        Pokemon.results.ourHp = theirTurn();
        console.log(`${Pokemon.ourAttack.name}'s HP: ${Pokemon.results.ourHp}`);
        if (Pokemon.results.ourHp !== 0) {
          console.log(`${Pokemon.ourAttack.name}'s HP is > 0 therefore, they attack, too`);
          Pokemon.results.theirHp = ourTurn();
          console.log(`${Pokemon.theirAttack.name}'s HP: ${Pokemon.results.theirHp}`);
        }
      }

      // These functions calculate the fight results and handle if power >= hp
      function ourTurn(){
        if (Pokemon.theirAttack.hp <= Pokemon.ourAttack.power) {
          Pokemon.results.theirFaint = true;
          console.log(`${Pokemon.theirAttack.name} fainted ${Pokemon.results.theirFaint}`);
          Pokemon.results.theirAttackPower = 0;
          return 0;
        } else {
          Pokemon.results.theirAttackPower = Pokemon.theirAttack.power;
          return Pokemon.theirAttack.hp - Pokemon.ourAttack.power;
        }
      }
      function theirTurn(){
        if (Pokemon.ourAttack.hp <= Pokemon.theirAttack.power) {
          Pokemon.results.ourFaint = true;
          console.log(`${Pokemon.ourAttack.name} fainted ${Pokemon.results.ourFaint}`);
          Pokemon.results.ourAttackPower = 0;
          return 0;
        } else {
          Pokemon.results.ourAttackPower = Pokemon.ourAttack.power;
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
      // $('#instructions-text').text('Opponent\'s HP: ', Pokemon.results.theirHp);
    }
  };

  battleController.shareResults = () => {
    socket.shareResults();
    console.log('our HP ', Pokemon.results.ourHp);
    console.log('their HP ', Pokemon.results.theirHp);
    console.log('Sending results');
    battleController.updateHealth();
  }

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
      Pokemon.attackValueResets();
      $('#dashboard-bottom-default').show();
    }
    showFight();
  }

  battleController.pokemonFaints = () => {
    console.log('handling faints');
    if (Pokemon.results.ourFaint) {
      console.log('Ours fainted and are removed');
      $('#player-one-pokemon').children().filter(':visible').remove();
      $('#player-one-pokemon').children().first().show()
      $(`button[id="${Pokemon.results.ourPoke}"]`).off('click').css('background', '#303d51');
      $('#instructions-text').text('All your Pokémon have fainted. You lose!');
    }
    if (Pokemon.results.theirFaint) {
      console.log('Theirs fainted and is removed');
      $('#player-two-pokemon').children().filter(':visible').remove();
      $('#player-two-pokemon').children().first().show()
      $('#instructions-text').text('Your Pokémon triumphed. You win!');
    }
  }

  battleController.gameOver = () => {
    console.log('gameOver Not yet working... or ever called');
  };

  module.battleController = battleController;
})(window);
