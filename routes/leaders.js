var express = require('express');
var router = express.Router();
var userService = require('../data/user');
var promise = require('bluebird');

router.get('/leaders', function(req, res) {
  userService.getLeaders().then(function(leaders){
    console.log(leaders);
    res.render('leaders', { tickerCards: req.tickerCards, user: req.user, leaderList: leaders, title: 'MTG' });
  });
});

module.exports = router;

