var express = require('express');
var router = express.Router();
var userService = require('../data/user');
var portfolioService = require('../data/portfolio');

router.get('/', function(req, res) {
  var user = userService.getById(2)
    .then(function(users){
      var user = users[0];

      portfolioService.getPortfolio(2)
        .then(function(cards){
          user.cards = cards;
          res.render('user', { user: user, title: 'Users' });
        });

    });
});

router.post('/', function(req, res) {

  var userId = req.param('user_id');
  var cardId = req.param('card_id');
  var quantity = req.param('quantity');

  portfolioService.buyCard(userId, cardId, quantity)
    .then(function() {
      res.send(true)
    })

});

router.delete('/', function(req, res) {

  var userId = req.param('user_id');
  var cardId = req.param('card_id');
  var quantity = req.param('quantity');

  portfolioService.sellCard(userId, cardId, quantity)
    .then(function() {
      res.send(true)
    })


});

module.exports = router;
