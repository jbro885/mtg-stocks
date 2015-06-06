var portfolio = require('../data/portfolio');
var promise = require('bluebird');

promise.all([
  portfolio.getCard(1, 3)
    .then(function(rows){
      console.log(rows);
    }),
  portfolio.addCard(1, 3, 3)
    .then(function (result) {
      console.log(result);
    }),
  portfolio.getCard(1, 3)
    .then(function(rows){
      console.log(rows);
    }),
  portfolio.sellCard(1, 'bower', 3)
    .then(function (rows) {
      console.log(rows);
    }),
  portfolio.getPortfolio(1)
    .then(function (rows) {
      console.log(rows);
    }),
  portfolio.sellCard(1, 'stiletto', 4)
    .then(function (rows) {
      console.log(rows);
    }),
  portfolio.buyCard(1, 'iceperson', 3)
    .then(function (rows) {
      console.log(rows);
    })
]);
