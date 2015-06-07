var portfolio = require('../data/portfolio');
var promise = require('bluebird');

promise.all([
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
  portfolio.buyCard(2, 2, 2)
    .then(function (rows) {
      console.log(rows);
    })
]);
