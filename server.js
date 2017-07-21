// =============================================================
// Dependencies
// =============================================================
// Server framework for Node.js
var express = require("express");

// Logs errors to the console making it easier to debug during development
var logger = require("morgan");

// =============================================================
// Create an express server
// =============================================================
var app = express();

// =============================================================
// Use morgan
// =============================================================
// Log app activity to the console and debug
app.use(logger("dev"));

// =============================================================
// Establish a port
// =============================================================
// The PORT will be defined by the deployment site or set to localhost:8080.
var PORT = process.env.PORT || 3000;

// =============================================================
// Identify the public folder as a static directory
// =============================================================
app.use(express.static(process.cwd() + '/public'));

// =============================================================
// Routes
// =============================================================
// Routes provide the server with a "map" of how to respond when users request data from various URLs.

// Require html routes and pass the app (express server) as an argument to the returned function and immediately invoke it
require("./routing/html_routes")(app);

// =============================================================
// Start the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
