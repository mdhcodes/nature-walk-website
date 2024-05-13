// Node module to handle file paths and deliver HTML pages to users through routes.
// Routes identify the paths to the html files.
const path = require("path");


module.exports = function(app) {

  // Deliver the file named life.html to the user.
  app.get('/life', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/life.html'));
  });

  // Deliver the file named index.html to the user
  // If the user did not define a url or types anything other than /index or /life, send them to the home page.
  app.use( function(req, res) { // No url defined as a parameter
    res.sendFile(path.join(__dirname + '/../public/index.html'));
  });

};