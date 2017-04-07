'use strict';

(function(module) {
  let battleView = {};

  // Updated by the return value of battleView.attackExecute()
  battleView.renderPokemon = function(pokemon, container) {
    let template = Handlebars.compile($('#battle-template-pokemon').text());
    $(`#${container}`).append(template(pokemon));
  }

  battleView.renderDefaultDashboard = function(dashboard) {
    let template = Handlebars.compile($('#battle-template-dashboard').text());
    $('#battle-content').append(template(dashboard));
    $('.faint').hide();
    $('.alive').show();
  }

  battleView.renderFightDashboard = function(dashboard) {
    let template = Handlebars.compile($('#battle-template-dashboard-fight').text());
    $('.dashboard-bottom-default').hide();
    $('.dashboard-bottom').append(template(dashboard));
  }

  battleView.renderSwitchDashboard = function(dashboard) {
    let template = Handlebars.compile($('#battle-template-dashboard-switch').text());
    $('.dashboard-bottom-default').hide();
    $('.dashboard-bottom').append(template(dashboard));
  }

  // battleView.healthBarInit = () => {
  //   console.log('Setting initial health "bar" values');
  //   let barOne = $('#player-one-pokemon').find('.bar');
  //   let barTwo = $('#player-two-pokemon').find('.bar');
  //
  //   barOne.css({'width': '100%'});
  //   barTwo.css({'width': '100%'});
  // }

  battleView.healthBarUpdate = function() {
    let $ourBars = $('#player-one-pokemon').children(':visible').find('.health-bar').children();
    let $theirBars = $('#player-two-pokemon').children(':visible').find('.health-bar').children();

    let ourMaxHitPoints = $('#player-one-pokemon').children(':visible').data('maxhp');
    let theirMaxHitPoints = $('#player-two-pokemon').children(':visible').data('maxhp');
    let ourHealthBarsLeft = 10 - (Math.floor((1 - (Pokemon.results.ourHp / ourMaxHitPoints)) * 10));

    let theirHealthBarsLeft = 10 - (Math.floor((1 - (Pokemon.results.theirHp / theirMaxHitPoints)) * 10));

    $('#player-one-pokemon').children(':visible').data('hp', Pokemon.results.ourHp);
    $('#player-two-pokemon').children(':visible').data('hp', Pokemon.results.theirHp);

    let ourBarsToSubtract = $ourBars.length % ourHealthBarsLeft;
    for (var i = 0; i < ourBarsToSubtract; i++) {
      $ourBars.last().remove();
    }
    let theirBarsToSubtract = $theirBars.length % theirHealthBarsLeft;
    for (var i = 0; i < theirBarsToSubtract; i++) {
      $theirBars.last().remove();
    }
    // debugger;
  }

  battleView.renderBattleContent = function() {
    battleView.renderPokemon(Pokemon.pokes[0], 'player-one-pokemon'); // First Pokemon for player one: name, picture, health bar.
    battleView.renderPokemon(Pokemon.pokes[1], 'player-one-pokemon'); // Second Pokemon for player one: name, picture, health bar.
    $(`#${Pokemon.pokes[1].name}`).hide(); // Load, but hide Pokemon now, so we can show it later.
    battleView.renderPokemon(Pokemon.pokes[2], 'player-one-pokemon'); // Third Pokemon for player one: name, picture, health bar.
    $(`#${Pokemon.pokes[2].name}`).hide(); // Load, but hide Pokemon now, so we can show it later.
    battleView.renderDefaultDashboard(Pokemon.pokes[0]); // Only call renderDefaultDashboard here.
    console.log('Give button click instructions.');
    $('#instructions-text').text('Click on fight or switch Pokémon.');
    battleView.renderFightDashboard(Pokemon.pokes[0]);
    battleView.renderFightDashboard(Pokemon.pokes[1]);
    battleView.renderFightDashboard(Pokemon.pokes[2]);
    $('.fight-template').hide();

    battleView.renderSwitchDashboard(Pokemon.pokes);
    $('#dashboard-bottom-switch').hide();
  };
  // rendering their pokemon ---------
  battleView.renderTheirPokemon = () => {
    Pokemon.thierPokes = Pokemon.theirPokes.map(poke =>
      poke.sprite = poke.frontSprite
    );
    battleView.renderPokemon(Pokemon.theirPokes[0], 'player-two-pokemon');
    battleView.renderPokemon(Pokemon.theirPokes[1], 'player-two-pokemon');
    $(`#${Pokemon.theirPokes[1].name}`).hide();
    battleView.renderPokemon(Pokemon.theirPokes[2], 'player-two-pokemon');
    $(`#${Pokemon.theirPokes[2].name}`).hide();
    // battleView.healthBarInit();
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

  battleView.updateChangedPokemon = (changePokeTo) => {
    console.log(`their pokemon switch to ${changePokeTo.name} instead of attacking`);
    $('#player-two-pokemon').children().hide();
    $('#player-two-pokemon').find(`[id="${changePokeTo.name}"]`).show();
  };

  battleView.updateMyChangedPokemon = (name) => {
    console.log(`our pokemon switch to ${name} instead of attacking`);
    $('#player-one-pokemon').children().hide();
    $('#player-one-pokemon').find(`[id="${name}"]`).show();
  }
  // Call all the things!
  battleView.init = function() {
    battleView.renderBattleContent();
    battleView.addEvents();
    // battleView.healthBarInit();
  }
  module.battleView = battleView;
})(window);
