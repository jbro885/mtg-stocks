var user = require('../data/user');
var promise = require('bluebird');

promise.all([

  user.getById(2).then(function(rows){
    console.log(rows);
  }),
  user.getById(12).then(function(rows){
    console.log(rows);
  }),
  user.incrementBalance(12, 10).then(function(result){
    console.log(result);
  }),
  user.decrementBalance(22, 10).then(function(result){
    console.log(result);
  }),
  user.getLeaders().then(function(rows){
    console.log(rows);
  })

]);




