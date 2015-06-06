var express = require('express');
var userService = require('../data/user');
var portfolioService = require('../data/portfolio');

var router = express.Router();

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

router.get('/user/graph', function(req, res) {
  userService.getUser(2)
    .then(function(user) {
      res.render('netWorthGraph', {user: user, title: 'Users'});
    });
});

router.post('/user/cards', function(req, res) {

  var userId = parseInt(req.param('user_id'));
  var cardId = parseInt(req.param('card_id'));
  var quantity = parseInt(req.param('quantity'));

  portfolioService.buyCard(userId, cardId, quantity)
    .then(function() {
      res.send(true)
    })

});

router.delete('/user/cards', function(req, res) {

  var userId = parseInt(req.param('user_id'));
  var cardId = parseInt(req.param('card_id'));
  var quantity = parseInt(req.param('quantity'));

  portfolioService.sellCard(userId, cardId, quantity)
    .then(function() {
      res.send(true)
    })
});

module.exports = router;
