var express = require('express');
var router = express.Router();
var userService = require('../data/user');
var portfolioService = require('../data/portfolio');

router.get('/leaders', function(req, res) {

  var leaders;
  userService.getLeaders()
    .then(function (user) {
      var leaderList = [];
      user.forEach(function (userLeader) {
        portfolioService.getPortfolio(userLeader.user_id)
          .then(function (cards) {
            cards.user = userLeader;
            leaderList.push(cards);
          });
      });

      res.render('leaders', {leaderList: leaderList, title: 'Leaders'});

    });

});


module.exports = router;
