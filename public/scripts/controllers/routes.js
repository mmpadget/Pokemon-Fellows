'use strict';
// Define all routes for semantic URL.

// eslint-disable-next-line
page('/', homeController.index); // Route to initialize
// page('/', homeController.init); // Alt route to initialize home page function.
// eslint-disable-next-line
page('/battle', battleController.index); // Route to initialize battle page function.
// eslint-disable-next-line
page('/about', aboutController.index); // Route to initialize about page function.
// eslint-disable-next-line
page(); // Invokes Page.js.
