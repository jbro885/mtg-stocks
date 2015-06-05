require("coffee-script/register");
var tcg = require('./scrapers/tcgscraper.coffee');
var imageJob = require('./scrapers/imagescraper.coffee');

tcg()
  .then(console.log('done'));

url = "http://shop.tcgplayer.com/magic/collector's-edition/zombie-master-(ce)";

imageJob(url)
  .then(console.log)