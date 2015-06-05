var cardService = require('./../../data/card');

module.exports = function (card, callback) {
  cardService.add(card)
    .then(callback());
};
