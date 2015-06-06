var express = require('express');
var router = express.Router();
var userService = require('../data/user');
var portfolioService = require('../data/portfolio');
var promise = require('bluebird');

router.get('/', function(req, res) {

  promise.join(userService.getUser(2), portfolioService.getPortfolio(2), function(user, cards){
    res.render('index', { user: {}, title: 'MTG' });
  });

});

module.exports = router;
