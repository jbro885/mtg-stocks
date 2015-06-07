var express = require('express');
var userService = require('../data/user');
var portfolioService = require('../data/portfolio');
var promise = require('bluebird');

var router = express.Router();

router.get('/user', function(req, res) {

  portfolioService.getPortfolio(req.user.user_id)
    .then(function(cards){
      req.user.cards = cards;
      res.render('user', { user: req.user, title: 'Users' });
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

router.post('/user/tag', function(req, res) {

  var userId = parseInt(req.param('user_id'));
  var cardId = parseInt(req.param('card_id'));
  var tagName = req.param('tag');

  portfolioService.createTag(userId, cardId, tagName)
    .then(function() {
      res.send(true)
    })

});

router.delete('/user/tag', function(req, res) {

  var userId = parseInt(req.param('user_id'));
  var cardId = parseInt(req.param('card_id'));
  var tagName = req.param('tag');

  portfolioService.deleteTag(userId, cardId, tagName)
    .then(function() {
      res.send(true)
    })
});

module.exports = router;
