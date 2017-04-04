'use strict';
// Control the view with show/hide.
// Control the model business with function calls.

(function(module) {
  // See battleController.init in routes.js
  const battleController = {};

  // TODO: Invoke Pokemon API function (defined in models).
  // TODO: Add any aboutView logic here. jQuery hide, Middleware for loading data array or API data.
  // NOTE: battleController.doSomething = (ctx, next) => {};


// MAKE A FUNCTION PICKING BETWEEN 1-0 for true or false to pick who goes first
  function whoGoesFirst() {
    let playerPicker = Math.random();
    let playerReturn = playerPicker < 0.5 ? Math.floor(playerPicker) : Math.ceil(playerPicker);
    return playerReturn;
  }
  // Make aboutView available on global scope.
  module.battleController = battleController;
})(window);
