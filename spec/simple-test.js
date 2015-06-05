var user = require('../data/user');

user.getById(1).then(function(rows){
  console.log(rows);
});
