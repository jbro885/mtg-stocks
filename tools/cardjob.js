require("coffee-script/register");
var card = require('./scrapers/cardscraper.coffee');

card('Journey Into Nyx')
  .then(console.log);
