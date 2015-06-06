var userService = require('./../data/user');
var db = require('../data/database');
var Promise = require('bluebird');
var moment = require('moment');

(function main(){
  userService.getUsers()
    .then(updateUsers)
    .then(function(){
      console.log('done.')
    })
})();

var dateFormatter = function(date){
  return '"'+moment(date).format('YYYY-MM-DD HH:mm:ss')+'"';
};

var getInsertQuery = function(rows){
  return "INSERT INTO `net_worth` (`user_id`, `date`, `net_worth`) VALUES " + rows.map(rowToValue).join(', ')
};

var rowToValue = function(row){
  return '(' + [row.user_id, dateFormatter(Date.now()), row.balance + row.card_balance].join(", ") + ')';
};

var updateUsers = function(users){
  var defer = Promise.pending();
  var connection = db();
  connection.connect();
  console.log(getInsertQuery(users));
  connection.query(getInsertQuery(users), function(err, result) {
    connection.end();
    if (err) {
      defer.reject(err);
      console.log('Error while performing Query.');
    } else {
      defer.fulfill(result);
    }
  });

  return defer.promise;
};
