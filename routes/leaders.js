var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

  var user = userService.getById(2)
    .then(function(users){
      var user = users[0];

      portfolioService.getPortfolio(2)
        .then(function(cards){
          user.cards = cards;
          res.render('leaders', { user: user, title: 'MTG' });
        });

    });
  res.render('leaders', {})

});


module.exports = router;
