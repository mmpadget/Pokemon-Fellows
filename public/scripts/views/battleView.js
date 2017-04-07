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
    let $ourBar = $('#player-one-pokemon').children(':visible').find('.hp-bar');
    let $theirBar = $('#player-two-pokemon').children(':visible').find('.hp-bar');

    $ourBar.css({'width': '100%'});
    $theirBar.css({'width': '100%'});
  }

  battleView.healthBarUpdate = function() {
    let $ourBars = $('#player-one-pokemon').children(':visible').find('.health-bar').children();
    let $theirBar = $('#player-two-pokemon').children(':visible').find('.health-bar').children();

    let ourMaxHitPoints = $('#player-one-pokemon').children(':visible').data('maxhp');
    let theirMaxHitPoints = $('#player-two-pokemon').children(':visible').data('maxhp');
    let ourHealthBarsLeft = 10 - (Math.floor((1 - (Pokemon.results.ourHp / ourMaxHitPoints)) * 10));

    let theirHealthBarsLeft = 10 - (Math.floor((1 - (Pokemon.results.theirHp / theirMaxHitPoints)) * 10));

    $('#player-one-pokemon').children(':visible').data('hp', Pokemon.results.ourHp);
    $('#player-two-pokemon').children(':visible').data('hp', Pokemon.results.theirHp);

    ourBarsToSubtract = $ourBars.length % ourHealthBarsLeft;
    for (var i = 0; i < ourBarsToSubtract; i++) {
      $ourBars.last().remove();
    }
    theirBarsToSubtract = $theirBars.length % theirHealthBarsLeft;
    for (var i = 0; i < theirBarsToSubtract; i++) {
      $theirBars.last().remove();
    }
    debugger;
  }

  battleView.renderBattleContent = function() {
    // eslint-disable-next-line
    battleView.renderPokemon(Pokemon.pokes[0], 'player-one-pokemon'); // First Pokemon for player one: name, picture, health bar.
    // eslint-disable-next-line
    battleView.renderPokemon(Pokemon.pokes[1], 'player-one-pokemon'); // Second Pokemon for player one: name, picture, health bar.
    // eslint-disable-next-line
    $(`#${Pokemon.pokes[1].name}`).hide(); // Load, but hide Pokemon now, so we can show it later.
    // eslint-disable-next-line
    battleView.renderPokemon(Pokemon.pokes[2], 'player-one-pokemon'); // Third Pokemon for player one: name, picture, health bar.
    // eslint-disable-next-line
    $(`#${Pokemon.pokes[2].name}`).hide(); // Load, but hide Pokemon now, so we can show it later.

    // eslint-disable-next-line
    battleView.renderDefaultDashboard(Pokemon.pokes[0]); // Only call renderDefaultDashboard here.

    // eslint-disable-next-line
    battleView.renderFightDashboard(Pokemon.pokes[0]);
    battleView.renderFightDashboard(Pokemon.pokes[1]);
    battleView.renderFightDashboard(Pokemon.pokes[2]);
    $('.fight-template').hide();

    // eslint-disable-next-line
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
    battleView.healthBarInit();
  };
  // end render therePokemon------------
  battleView.addEvents = () => {
    if(socket.pokesSent && socket.pokesReceived){
      console.log('Adding events');
      battleController.selectSwitch();
      // eslint-disable-next-line
      battleController.selectFight();
      // eslint-disable-next-line
      battleController.selectAttack();
      // eslint-disable-next-line
      battleController.selectPokemonCharacter();
    }
  }

  battleView.updateChangedPokemon = (changePokeTo) => {
    console.log(`their pokemon switch to ${changePokeTo.name} instead of attacking`);
    $('#player-two-pokemon').children().hide();
    $('#player-two-pokemon').find(`[id="${changePokeTo.name}"]`).show();
  };
  // Call all the things!
  battleView.init = function() {
    battleView.renderBattleContent();
    // eslint-disable-next-line
    battleView.addEvents();
    battleView.healthBarInit();
  }
  module.battleView = battleView;
})(window);
