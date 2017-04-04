'use strict';

(function(module) {
  const aboutView = {};

  // TODO: Add any aboutView logic here. Filtering, templates, handlebars.
  // NOTE: aboutView.doSomething = function() {};

  // Make aboutView available on global scope.
  let battleView = {
    PokemonOne: {
      name: 'Ely',
      hp: 300,
      sprite: 'https://www.placekitten.com/75',
      moveOne: {
        name: 'punch',
        power: 30
      },
      moveTwo: {
        name: 'kick',
        power: 45
      }
    },
    PokemonTwo: {
      name: 'Michael',
      hp: 300,
      sprite: 'https://www.placekitten.com/75',
      moveOne: {
        name: 'punch',
        power: 30
      },
      moveTwo: {
        name: 'kick',
        power: 45
      }
    }
  };
  ///////Actual battleView.js functionality///////

  let currentHP = battleView.PokemonOne.hp;
  let healthBar = $('.health-bar');
  let bar = healthBar.find('.bar');
  let hit = healthBar.find('.hit');

  hit.css({'width': '0'});
  bar.css('width', '100%');
  bar.css({'background': '#7FFF00'})

  // hitBtn.on("click", function(){// this will be changed to an invokable function once done with testing....
  // let damage = PLACEHOLER FOR THE HP FROM THE API
  battleView.attackExecute = function(opts) {
    let damage = opts.moveOne.power;
    currentHP -= damage;
    //Calculation of damage dealt and total width of the health bar
    //change this to a PLACEHOLDER VAR
    let barWidth = (currentHP / opts.hp) * 100;
    let hitWidth = (damage / currentHP) * 100 + "%";

    // show hit bar and set the width
    hit.css('width', hitWidth);

    setTimeout(function(){
      hit.css({'width': '0'});
      bar.css('width', barWidth + "%");
    }, 300);

  //this chages the color of the damage bar
    if(currentHP < (opts.hp * 0.3)){
      bar.css({'background': 'red'})
    } else if(currentHP > (opts.hp * 0.3)){
      bar.css({'background': '#7FFF00'})
    }
    console.log("Remaining Health:"+ currentHP +" Damage:"+ damage);

    return currentHP;
  };

  module.battleView = battleView;
})(window);
