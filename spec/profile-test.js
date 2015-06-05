var portfolio = require('../data/portfolio');

portfolio.getPortfolio(1)
  .then(function(rows){
  console.log(rows);
});
