var express = require('express');
var router = express.Router();
var userService = require('../data/user');
var promise = require('bluebird');

router.get('/leaders', function(req, res) {


  promise.join(userService.getUser(2), userService.getLeaders(), function(user, leaders){
    res.render('leaders', { user: user, leaderList: leaders, title: 'MTG' });
  });
});

module.exports = router;

