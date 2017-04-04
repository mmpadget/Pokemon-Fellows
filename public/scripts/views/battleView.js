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

  const renderPokemon = function(pokemon) {
    let template = Handlebars.compile($('#battle-template-pokemon').text());
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
    let hitWidth = (damage / currentHP) * 100 + "%";

    // show hit bar and set the width
    hit.css('width', hitWidth);

    setTimeout(function(){
      hit.css({'width': '0'});
      bar.css('width', barWidth + "%");
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

  module.battleView = battleView;
})(window);
