'use strict';
// Control the view with show/hide.
// Control the model business with function calls.

(function(module) {
  // See aboutController.init in routes.js
  const aboutController = {};

  // Initialize the about page view. /about in routes.
  aboutController.index = function() {
    $('.all-content').hide();
    $('#title-header').hide(); // Hide all content.
    $('#about-us-page').show(); // Show about content.
    $('#about-us-page').css('background-image', 'url("assets/splashBackground.png")');
    $('.nav-bar').css('margin-top', '179%');
    // $('header').css('background-image', 'url(assets/arenaItems/spaceDropHead.png)');

    // $('#about-us-page').css('background-image', 'url(assets/arenaItems/spaceDrop.png)');
  }
  // #about-us-page, #home-content, #battle-content, .all-content

  // Make aboutView available on global scope.
  module.aboutController = aboutController;
})(window);
