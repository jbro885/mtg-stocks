var express = require('express');
var router = express.Router();
var userService = require('../data/user');
var cardService = require('../data/card');

router.get('/', function(req, res) {

  userService.getUser(2)
    .then(function(user){

      cardService.getAllCards()
        .then(function(cards){
          res.render('cards', { user: user, cards: cards, title: 'Shop' });
        });

    });

});

module.exports = router;
