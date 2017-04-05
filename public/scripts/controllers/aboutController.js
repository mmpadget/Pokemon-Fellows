'use strict';
// Control the view with show/hide.
// Control the model business with function calls.

(function(module) {
  // See aboutController.init in routes.js
  const aboutController = {};

  // Initialize the about page view. /about in routes.
  aboutController.index = function() {
    $('.all-content').hide(); // Hide all content.
    $('#about-us-page').show(); // Show about content.
  }
  // #about-us-page, #home-content, #battle-content, .all-content

  // Make aboutView available on global scope.
  module.aboutController = aboutController;
})(window);
