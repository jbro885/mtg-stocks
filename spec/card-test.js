var user = require('../data/card');

user.getAllCards().then(function(rows){
  console.log(rows);
});

