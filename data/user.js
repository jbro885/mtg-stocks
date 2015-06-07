var db = require('./database');
var Promise = require('bluebird');

var user = function(){

  var getLeaders;
  var addUser = function(name, password){
    var defer = Promise.pending();
    var connection = db();
    connection.connect();
    var data = [{'username':name},{'password':password},{'balance':50}];
    connection.query('INSERT INTO user SET ?', data,  function(err, result) {
      connection.end();
      if (!err) {
        defer.fulfill(result);
      } else {
        defer.reject(err);
        console.log('Error while performing Query.');
      }
    });

    return defer.promise;
  };

  var getUser = function(id){
    var defer = Promise.pending();
    var connection = db();
    connection.connect();
    var queryString = " \
    SELECT u.user_id, u.username, u.balance, IFNULL(SUM(p.quantity * c.cost_mid), 0) as card_balance \
    FROM user u \
    LEFT OUTER JOIN portfolio p on u.user_id = p.user_id \
    LEFT OUTER JOIN card c on p.cards_id = c.cards_id \
    WHERE p.user_id  = ? \
    GROUP BY u.user_id, u.username, u.balance";

    connection.query(queryString, [id], function(err, rows, fields) {
      connection.end();
      if (!err) {
        defer.fulfill(rows[0]);
      } else {
        defer.reject(err);
        console.log('Error while performing Query.');
      }
    });

    return defer.promise;
  };

  var getUsers = function(){
    var defer = Promise.pending();
    var connection = db();
    connection.connect();
    var queryString = " \
    SELECT u.user_id, u.username, u.balance, IFNULL(SUM(p.quantity * c.cost_mid), 0) as card_balance \
    FROM user u \
    LEFT OUTER JOIN portfolio p on u.user_id = p.user_id \
    LEFT OUTER JOIN card c on p.cards_id = c.cards_id \
    GROUP BY u.user_id, u.username, u.balance";

    connection.query(queryString, function(err, rows, fields) {
      connection.end();
      if (!err) {
        defer.fulfill(rows);
      } else {
        defer.reject(err);
        console.log('Error while performing Query.');
      }
    });

    return defer.promise;
  };

  var getLeaders = function () {
    var defer = Promise.pending();
    var connection = db();
    connection.connect();
    var queryString = " \
    SELECT u.user_id, u.username, IFNULL(SUM(p.quantity * c.cost_mid), 0) + u.balance as balance \
    FROM user u \
    LEFT OUTER JOIN portfolio p on u.user_id = p.user_id \
    LEFT OUTER JOIN card c on p.cards_id = c.cards_id \
    GROUP BY u.user_id, u.username, u.balance \
    ORDER BY balance DESC \
    LIMIT 10; ";

    connection.query(queryString, function (err, rows, fields) {
      if (err) {
        defer.reject(err);
        console.log('Error while performing Query.');
      } else {
        defer.fulfill(rows);
      }
    });
    connection.end();
    return defer.promise;
  };

  var byUsername = function(username){
    var defer = Promise.pending();
    var connection = db();
    connection.connect();

    var queryString = "select * from user where username = '" + username + "'";
    connection.query(queryString, function(err, result) {
      connection.end();
      if (result.length == 0 && err) {
        defer.reject(err);
        console.log('Error while performing Query.');
      } else {
        defer.fulfill(result[0]);
      }
    });

    return defer.promise;
  };

  var incrementBalance = function(id, amount){
    var defer = Promise.pending();
    var connection = db();
    connection.connect();

   var queryString = "UPDATE user set balance = balance + " + amount + " where user_id=" + id;
    connection.query(queryString, function(err, result) {
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

  var decrementBalance = function(id, amount){
    var defer = Promise.pending();
    var connection = db();
    getLeaders: getLeaders,
      connection.connect();
    var queryString = "UPDATE user set balance = balance - " + amount + " where user_id=" + id;
    connection.query(queryString, function(err, result) {
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

  return {
    addUser: addUser,
    getUser: getUser,
    getUsers: getUsers,
    getLeaders: getLeaders,
    getUserByUsername: byUsername,
    incrementBalance: incrementBalance,
    decrementBalance: decrementBalance
  }
};

module.exports = user();
