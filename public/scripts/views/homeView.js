'use strict';
// Render text and html to the page.

(function(module) {
  const homeView = {};

  // TODO: Add any homeView logic here. Filtering, templates, handlebars.
  // NOTE: homeView.doSomething = function() {};
  homeView.index = function() {
    $('#home-content').show().siblings().hide();
  };

  // Make homeView available on global scope.
  module.homeView = homeView;
})(window);
