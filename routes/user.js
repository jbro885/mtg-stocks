var express = require('express');
var router = express.Router();
var userService = require('../data/user');
var portfolioService = require('../data/portfolio');

router.get('/user', function(req, res) {
  userService.getUser(2)
    .then(function(user){

      portfolioService.getPortfolio(2)
        .then(function(cards){
          user.cards = cards;
          res.render('user', { user: user, title: 'Users' });
        });

    });
});

router.post('/user', function(req, res) {

  var userId = req.param('user_id');
  var cardId = req.param('card_id');
  var quantity = req.param('quantity');

  portfolioService.buyCard(userId, cardId, quantity)
    .then(function() {
      res.send(true)
    })

});

router.delete('/user', function(req, res) {

  var userId = req.param('user_id');
  var cardId = req.param('card_id');
  var quantity = req.param('quantity');

  portfolioService.sellCard(userId, cardId, quantity)
    .then(function() {
      res.send(true)
    })
});

module.exports = router;
