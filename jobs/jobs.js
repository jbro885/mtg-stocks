require("coffee-script/register");
var tcg = require('./scrapers/tcgscraper.coffee');

tcg()
  .then(console.log('done'));
