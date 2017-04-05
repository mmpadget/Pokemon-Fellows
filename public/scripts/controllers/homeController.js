'use strict';
// Control the view with show/hide.
// Control the model business with function calls.

(function(module) {
  // See homeController.init in routes.js
  const homeController = {};

  // Initialize the home page view. / in routes.
  homeController.index = function() {
    $('.all-content').hide(); // Hide all content.
    $('#home-content').show(); // Show home content.
  }

  // eslint-disable-next-line
  // homeController.index = () => homeView.index(); // Alternate definition.

  // Make aboutView available on global scope.
  module.homeController = homeController;
})(window);
