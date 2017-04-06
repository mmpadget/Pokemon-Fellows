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

    let ourHit = $('#player-one-pokemon').children().filter(':visible').find('.hit');
    let theirHit = $('#player-two-pokemon').children().filter(':visible').find('.hit');

    let ourBar = $('#player-one-pokemon').children().filter(':visible').find('.bar')
    let theirBar = $('#player-two-pokemon').children().filter(':visible').find('.bar')
    console.log('------ END-----');

    let ourDamage = Pokemon.theirAttack.power * 1; //magic num is multiplyer to effect speed
    let theirDamage = Pokemon.ourAttack.power * 1;

    ourCurrentHP -= ourDamage;
    theirCurrentHP -= theirDamage;

    //Calculation of damage dealt and total width of the health bar
    //change this to a PLACEHOLDER VAR
    let ourBarWidth = (ourCurrentHP / ourMaxHP) * 100;
    let theirBarWidth = (theirCurrentHP / theirMaxHP) * 100;

    let ourHitWidth = (ourDamage / ourCurrentHP) * 100 + '%';
    let theirHitWidth = (theirDamage / theirCurrentHP) * 100 + '%';


    // show hit bar and set the width
    ourHit.css('width', ourHitWidth); //P1
    theirHit.css('width', theirHitWidth); //P1
    console.log('hit widths should have changed now');
    setTimeout(function(){
      ourHit.css({'width': '0'});
      theirHit.css({'width': '0'});

      ourBar.css('width', ourBarWidth + '%');
      theirBar.css('width', theirBarWidth + '%');
    }, 300);
    console.log('bar widths should change now on a delay');
  //this chages the color of the damage bar
    if(ourCurrentHP < (ourMaxHP * 0.3)){
      ourBar.css({'background': 'red'})
    } else if(ourCurrentHP > (ourMaxHP * 0.3)){
      ourBar.css({'background': '#7FFF00'})
    }
    if(theirCurrentHP < (theirMaxHP * 0.3)){
      theirBar.css({'background': 'red'})
    } else if(theirCurrentHP > (theirMaxHP * 0.3)){
      theirBar.css({'background': '#7FFF00'})
    }
    console.log('------end health "bar" update ----------');
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
