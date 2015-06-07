var card = require('../data/card');
var promise = require('bluebird');

promise.all([

  card.getAllCards().then(function(rows){
    console.log(rows);
  }),
  card.findCard('Akroan').then(function(result) {
    console.log(result);
  })

]);

