var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  //res.send('user respond with a resource');
  res.render('users', { username: 'DJ', title: 'Users' });
});

module.exports = router;
