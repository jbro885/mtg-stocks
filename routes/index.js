var express = require('express');
var router = express.Router();
var userService = require('../data/user');
var portfolioService = require('../data/portfolio');

router.get('/', function(req, res) {

  userService.getUser(2)
    .then(function(user){

      portfolioService.getPortfolio(2)
        .then(function(cards){
          user.cards = cards;
          res.render('index', { user: user, title: 'MTG' });
        });

    });

});



module.exports = router;
