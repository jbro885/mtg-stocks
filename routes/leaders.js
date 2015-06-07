var express = require('express');
var router = express.Router();
var userService = require('../data/user');
var promise = require('bluebird');

router.get('/leaders', function(req, res) {
  res.render('leaders', { user: req.user, leaderList: leaders, title: 'MTG' });
});

module.exports = router;

