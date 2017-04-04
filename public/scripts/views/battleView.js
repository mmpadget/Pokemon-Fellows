'use strict';

(function(module) {
  const aboutView = {};

  // TODO: Add any aboutView logic here. Filtering, templates, handlebars.
  // NOTE: aboutView.doSomething = function() {};

  // Make aboutView available on global scope.
  module.aboutView = aboutView;
})(window);

var hitBtn = $('button.damage'),
  healthBar = $('.health-bar'),
  bar = healthBar.find('.bar'),
  hit = healthBar.find('.hit');

healthBar.data('value', healthBar.data('total'));
hit.css({'width': '0'});
bar.css('width', '100%');
bar.css({'background': '#7FFF00'})

// hitBtn.on("click", function(){// this will be changed to an invokable function once done with testing....
// var damage = PLACEHOLER FOR THE HP FROM THE API
var attackExecute = function(damage){
  var total = healthBar.data('total'),
    value = healthBar.data('value');
  //Calculation of damage dealt and total width of the health bar
  //change this to a PLACEHOLDER VAR
  var newValue = value - damage;
  var barWidth = (newValue / total) * 100;
  var hitWidth = (damage / value) * 100 + "%";

  // show hit bar and set the width
  hit.css('width', hitWidth);
  healthBar.data('value', newValue);

  setTimeout(function(){
    hit.css({'width': '0'});
    bar.css('width', barWidth + "%");
  }, 500);

//this chages the color of the damage bar
  if( newValue < 300){
    bar.css({'background': 'red'})
  } else if(newValue > 300){
    bar.css({'background': '#7FFF00'})
  }
  console.log("Remaining Health:"+ newValue +" Damage:"+ damage);
};
