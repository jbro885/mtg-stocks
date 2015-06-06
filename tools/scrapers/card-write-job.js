var cardService = require('./../../data/card');

module.exports = function (card, callback) {
  cardService.addCards(card)
    .then(callback(1));
};
