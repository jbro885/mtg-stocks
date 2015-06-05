var imageJob = require('./scrapers/imagescraper.coffee');

var url = "http://shop.tcgplayer.com/magic/";

imageJob(url)
  .then(console.log)
