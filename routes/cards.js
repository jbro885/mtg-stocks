var express = require('express');
var router = express.Router();
var userService = require('../data/user');
var cardService = require('../data/card');
var promise = require('bluebird');

router.get('/cards', function(req, res) {

  promise.join(userService.getUser(2), cardService.getAllCards(), function(user, cards){
    res.render('cards', { user: user, cards: cards, title: 'Shop' });
  });

});

module.exports = router;
