var express = require('express');
var router = express.Router();
var userDM = require('../data/user');

/* GET users listing. */
router.get('/', function(req, res) {
  //res.send('user respond with a resource');
  var user = userDM.getById(2)
    .then(function(users){
      var user = users[0];
      res.render('users', { username: user.username, title: 'Users' });
    });
});

module.exports = router;
