var user = require('../data/user');

user.getById(2).then(function(rows){
  console.log(rows);
});
