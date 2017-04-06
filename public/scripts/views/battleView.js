'use strict';

(function(module) {
  let battleView = {};

  // Updated by the return value of battleView.attackExecute()
    // eslint-disable-next-line
  battleView.renderPokemon = function(pokemon, container) {
    // eslint-disable-next-line
    let template = Handlebars.compile($('#battle-template-pokemon').text());
    $(`#${container}`).append(template(pokemon));
  }

  battleView.renderDefaultDashboard = function(dashboard) {
    // eslint-disable-next-line
    let template = Handlebars.compile($('#battle-template-dashboard').text());
    $('#battle-content').append(template(dashboard));
  }

  battleView.renderFightDashboard = function(dashboard) {
    // eslint-disable-next-line
    let template = Handlebars.compile($('#battle-template-dashboard-fight').text());
    $('.dashboard-bottom-default').hide();
    $('.dashboard-bottom').append(template(dashboard));
  }

  battleView.renderSwitchDashboard = function(dashboard) {
    // eslint-disable-next-line
    let template = Handlebars.compile($('#battle-template-dashboard-switch').text());
    $('.dashboard-bottom-default').hide();
    $('.dashboard-bottom').append(template(dashboard));
  }

  battleView.healthBarInit = () => {
    console.log('Setting initial health "bar" values');
    let barOne = $('#player-one-pokemon').find('.bar');
    let barTwo = $('#player-two-pokemon').find('.bar');

    barOne.css({'width': '100%', 'background': '#7FFF00'});
    barTwo.css({'width': '100%', 'background': '#7FFF00'});
  }

  battleView.healthBarUpdate = function() {
    console.log('---- start ------setting healthbar update values with jQuery');
    let ourCurrentHP = $('#player-one-pokemon').children().filter(':visible').data('hp');
    let theirCurrentHP = $('#player-two-pokemon').children().filter(':visible').data('hp');

    let ourMaxHP = $('#player-one-pokemon').children().filter(':visible').data('maxhp');
    let theirMaxHP = $('#player-two-pokemon').children().filter(':visible').data('maxhp');

    let ourBar = $('#player-one-pokemon').children().filter(':visible').find('.bar');
    let theirBar = $('#player-two-pokemon').children().filter(':visible').find('.bar');
    console.log('------ END-----');

    //Calculation of damage dealt and total width of the health bar
    //change this to a PLACEHOLDER VAR
    let ourBarWidth = ((ourCurrentHP - Pokemon.results.theirAttackPower) / ourMaxHP) * 100;
    let theirBarWidth = ((theirCurrentHP - Pokemon.results.ourAttackPower) / theirMaxHP) * 100;

    // show hit bar and set the width
    console.log('health bar widths should have changed now');

    ourBar.css('width', `{{ourBarWidth)}%`);
    theirBar.css('width', `{{theirBarWidth}}%`);

  //this changes the color of the damage bar
    if(ourCurrentHP < (ourMaxHP * 0.3)){
      ourBar.css({'background-color': 'red'})
    }
    if(theirCurrentHP < (theirMaxHP * 0.3)){
      theirBar.css({'background-color': 'red'})
    }
    console.log('------end health "bar" update ----------');
  };

  battleView.renderBattleContent = function() {
    battleView.renderPokemon(Pokemon.pokes[0], 'player-one-pokemon'); // First Pokemon for player one: name, picture, health bar.
    battleView.renderPokemon(Pokemon.pokes[1], 'player-one-pokemon'); // Second Pokemon for player one: name, picture, health bar.
    $(`#${Pokemon.pokes[1].name}`).hide(); // Load, but hide Pokemon now, so we can show it later.
    battleView.renderPokemon(Pokemon.pokes[2], 'player-one-pokemon'); // Third Pokemon for player one: name, picture, health bar.
    $(`#${Pokemon.pokes[2].name}`).hide(); // Load, but hide Pokemon now, so we can show it later.

    battleView.renderDefaultDashboard(Pokemon.pokes[0]); // Only call renderDefaultDashboard here.

    battleView.renderFightDashboard(Pokemon.pokes[0]);
    battleView.renderFightDashboard(Pokemon.pokes[1]);
    battleView.renderFightDashboard(Pokemon.pokes[2]);
    $('.fight-template').hide();

    battleView.renderSwitchDashboard(Pokemon.pokes);
    $('#dashboard-bottom-switch').hide();
  };
  // rendering their pokemon ---------
  battleView.renderTheirPokemon = () => {
    battleView.renderPokemon(Pokemon.theirPokes[0], 'player-two-pokemon');
    battleView.renderPokemon(Pokemon.theirPokes[1], 'player-two-pokemon');
    $(`#${Pokemon.theirPokes[1].name}`).hide();
    battleView.renderPokemon(Pokemon.theirPokes[2], 'player-two-pokemon');
    $(`#${Pokemon.theirPokes[2].name}`).hide();
    battleView.healthBarInit();
  };
  // end render therePokemon------------
  battleView.addEvents = () => {
    if(socket.pokesSent && socket.pokesReceived){
      console.log('Adding events');
      battleController.selectSwitch();
      battleController.selectFight();
      battleController.selectAttack();
      battleController.selectPokemonCharacter();
    }
  }
  // Call all the things!
  battleView.init = function() {
    battleView.renderBattleContent();
    battleView.healthBarInit();
    battleView.addEvents();
  }
  module.battleView = battleView;
})(window);
