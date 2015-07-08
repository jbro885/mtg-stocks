var express = require('express');
var userService = require('../data/user');
var promise = require('bluebird');

var router = express.Router();

router.use(function(req, res, next){
  req.name = req.param('name');
  req.email = req.param('email');
  req.password = req.param('password');
  req.passwordRetype = req.param('passwordRetype');

  next();
});

router.get('/signup', function(req, res) {
  res.render('signup', { title: 'signup', done:false });
});

router.post('/signup', function(req, res) {

  if(
    req.name &&
    req.email &&
    req.password &&
    req.passwordRetype &&
    req.password === req.passwordRetype){
    userService.addUser(req.name, req.password, req.email).then(function(){
      res.redirect('/')
    })
  }
});

module.exports = router;
