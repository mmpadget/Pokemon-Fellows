'use strict';
// Control the view with show/hide.
// Control the model business with function calls.

(function(module) {
  // See aboutController.init in routes.js
  const aboutController = {};

  aboutController.index = () => {
    $('about').show().siblings().hide();
  };

  // TODO: Add any aboutView logic here. jQuery hide, Middleware for loading data array or API data.
  // NOTE: aboutController.doSomething = (ctx, next) => {};

  // Make aboutView available on global scope.
  module.aboutController = aboutController;
})(window);
