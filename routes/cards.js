var express = require('express');
var router = express.Router();
var userService = require('../data/user');
var cardService = require('../data/card');

router.get('/', function(req, res) {

  var user = userService.getById(2)
    .then(function(users){
      var user = users[0];

      cardService.getAllCards()
        .then(function(cards){
          res.render('cards', { user: user, cards: cards, title: 'Cards' });
        });

    });

});

module.exports = router;
