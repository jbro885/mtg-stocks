var express = require('express');
var router = express.Router();
var cardService = require('../data/card');

router.get('/', function(req, res) {
  cardService.getAllCards()
    .then(function(cards){
      res.render('cards', { cards: cards, title: 'Cards' });
    });
});

module.exports = router;
