var express = require('express');
var router = express.Router();
var userService = require('../data/user');
var promise = require('bluebird');

router.get('/history', function(req, res) {

  userService.getTransactionHistory(req.user.user_id)
    .then(function(transactions){
      res.render('history', { transactions: transactions, title: 'History' });
    });

});

module.exports = router;

