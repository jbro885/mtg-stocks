var portfolio = require('../data/portfolio');
var promise = require('bluebird');

promise.all([
  portfolio.addCard(1, 'queen', 3)
    .then(function (rows) {
      console.log(rows);
    }),
  portfolio.getCard(1, 'king')
    .then(function(rows){
      console.log(rows);
    }),
  portfolio.getPortfolio(1)
    .then(function (rows) {
      console.log(rows);
    })
]);
