'use strict';
// Define all routes for semantic URL.

page('/', homeController.index); // Route to initialize

page('/battle', battleController.index); // Route to initialize battle page function.

page('/about', aboutController.index); // Route to initialize about page function.

page(); // Invokes Page.js.
