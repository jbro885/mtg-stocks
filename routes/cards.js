var express = require('express');
var router = express.Router();
var cardService = require('../data/card');

router.get('/', function(req, res) {
  cardService.getCard(2)
    .then(function(cards){
      res.render('cards', { cards: cards, title: 'Cards' });
    });
});

module.exports = router;
