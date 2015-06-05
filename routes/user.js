var express = require('express');
var router = express.Router();
var userDM = require('../data/user');

router.get('/', function(req, res) {
  var user = userDM.getById(2)
    .then(function(users){
      var user = users[0];
      res.render('user', { username: user.username, title: 'Users' });
    });
});

module.exports = router;
