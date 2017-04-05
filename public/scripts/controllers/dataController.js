'use strict';

// MVP
// 1. Pull data from API.
// 2. Cache six Pokemon in localStorage as fallback.

// STRETCH
// 1. Load full API all at once or in multiple pieces.
// 2. Cache in local storage for future visits.
// 3. Result: reduce API calls.
// 4. Result: reduce bandwidth.
// 5. Result: faster load times.

/*
// EXAMPLE CODE

// Object.keys iterates over child objects.
function Project(opts) {
  Object.keys(opts).forEach(e => this[e] = opts[e]);
}

// All project objects stored in an array.
Project.all = [];

// Retrieve data (local/remote), process, hand to view.
Project.fetchAll = function() {
  if (localStorage.rawData) {
    // If rawData is already in local storage, load all.
    Project.loadAll(JSON.parse(localStorage.rawData));
    // Render the index page.
    // eslint-disable-next-line
    projectView.initIndexPage();
  } else {
    // Load rawData in JSON file from the server.
    $.getJSON('/data/projectData.json', function(response) {
      // Cache in localStorage so we can skip next time.
      localStorage.setItem('rawData', JSON.stringify(response));
      // Load all data into project with load all.
      Project.loadAll(response);
      // Render the index page.
      // eslint-disable-next-line
      projectView.initIndexPage();
    })
  }
}

module.Project = Project;
}(window));
*/
