'use strict';
// Control the view with show/hide.
// Control the model business with function calls.

(function(module) {
  // See homeController.init in routes.js
  const homeController = {};

  // TODO: Middleware for loading data array or API data.
  // NOTE: homeController.doSomething = (ctx, next) => {};

  // Make aboutView available on global scope.
  module.homeController = homeController;
})(window);
