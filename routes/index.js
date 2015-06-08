var express = require('express');
var router = express.Router();
var cardService = require('../data/card');
var promise = require('bluebird');

router.get('/', function(req, res) {
  res.render('index', { tickerCards: req.tickerCards, title: 'MTGEX: the Magic the Gathering stock market simulator home' });
});

module.exports = router;
