'use strict';

(function(module) {
  let battleView = {};

  // Updated by the return value of battleView.attackExecute()
  let healthBar = $('.health-bar');
  let bar = healthBar.find('.bar');
  let hit = healthBar.find('.hit');
  let returnHP;

  hit.css({'width': '0'});
  bar.css('width', '100%');
  bar.css({'background': '#7FFF00'});

  // eslint-disable-next-line
  battleView.renderPokemon = function(pokemon, container) {
    // eslint-disable-next-line
    let template = Handlebars.compile($('#battle-template-pokemon').text());
    $(`#${container}`).append(template(pokemon));
    // $('#player-two-pokemon').append(template(pokemon));
    // $(`#${container}`).append(template(container));
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

  // hitBtn.on("click", function(){// this will be changed to an invokable function once done with testing....
  // let damage = PLACEHOLER FOR THE HP FROM THE API
  battleView.attackExecute = function(opts) {
    let currentHP = (returnHP) ? returnHP : opts[0].hp;
    let damage = opts[0].moveSet[0].power * .1;
    currentHP -= damage;
    //Calculation of damage dealt and total width of the health bar
    //change this to a PLACEHOLDER VAR
    let barWidth = (currentHP / opts[0].hp) * 100;
    let hitWidth = (damage / currentHP) * 100 + '%';

    // show hit bar and set the width
    hit.css('width', hitWidth);

    setTimeout(function(){
      hit.css({'width': '0'});
      bar.css('width', barWidth + '%');
    }, 300);

  //this chages the color of the damage bar
    if(currentHP < (opts[0].hp * 0.3)){
      bar.css({'background': 'red'})
    } else if(currentHP > (opts[0].hp * 0.3)){
      bar.css({'background': '#7FFF00'})
    }
    console.log('Remaining Health:' + currentHP + ' Damage:' + damage);

    returnHP = currentHP;
  };

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
    // battleView.renderPokemon(Pokemon.pokes[2], 'player-two-pokemon');

    // eslint-disable-next-line
    //battleView.renderPokemon(Pokemon.pokes[1]); // player2


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
    battleView.renderPokemon(Pokemon.theirPokes[0], 'player-two-pokemon');
    battleView.renderPokemon(Pokemon.theirPokes[1], 'player-two-pokemon');
    $(`#${Pokemon.theirPokes[1].name}`).hide();
    battleView.renderPokemon(Pokemon.theirPokes[2], 'player-two-pokemon');
    $(`#${Pokemon.theirPokes[2].name}`).hide();
  }
  // end render therePokemon------------

  // Call all the things!
  battleView.init = function() {
    battleView.renderBattleContent();
    // eslint-disable-next-line
    battleController.selectSwitch();
    // eslint-disable-next-line
    battleController.selectFight();
    // eslint-disable-next-line
    battleController.selectAttack();
    // eslint-disable-next-line
    battleController.selectPokemonCharacter();
    // battleController.shareAttacks();
    // battleController.fightMath();
    // battleController.shareResults();
    // battleController.showFight();
    // battleController.updateHealthBars();
    // battleController.pokemonFaints();
    // battleController.shareWinLossState();
    // battleController.playAgainScreen();
  }
  module.battleView = battleView;
})(window);
