var express = require('express');
var router = express.Router();
var userService = require('../data/user');
var cardService = require('../data/card');
var promise = require('bluebird');

router.get('/cards', function(req, res) {

  cardService.getAllCards()
    .then(function(cards){
      res.render('cards', { tickerCards: req.tickerCards, user: req.user, cards: cards, title: 'Shop' });
    }, function(err, blah){
      console.log(err + blah)
    })

});

module.exports = router;
