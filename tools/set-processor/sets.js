var cardService = require('../../data/card');
var allData = require('./AllSets.json');

var codes = Object.keys(allData);
var sets = [];
var cards = [];

codes.forEach(function(key){
  var _set = allData[key],
      _cards = _set.cards;

  sets.push({code: key, name: _set.name});

  _cards.forEach(function(card){
    cards.push({name: card.name, imageUrl: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid="+ card.multiverseid +"&type=card", "set": key, mid: 0, min: 0, max:0});
  });

});

/*cardService.batchAddSets(sets)
  .then(function(){
    cardService.addCards(cards);
  })*/
cardService.addCards(cards).then(function(){
    console.log("done;")
  });


