require("coffee-script/register");
var imageJob = require('./scrapers/imagescraper.coffee');
var cardService = require('./../data/card');

var url = "http://shop.tcgplayer.com/magic/";

cardService.getAllCards()
  .each(function(card){
    console.log(card);
    if (card.set_name){
      var s = card.set_name.replace(/[\/: ]/g, '-').replace(/(-)*/g, '-').toLowerCase();
      var c = card.card_name.replace(/[\/: ]/g, '-').toLowerCase();
      return imageJob(url+ s + '/' + c, c);
    }
    return 0;
  }).then(function(){
    console.log('done')
  });
