var db = require('./database');
var Promise = require('bluebird');

var user = function(){

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

  var getById = function(id){
    var defer = Promise.pending();
    var connection = db();
    connection.connect();
    var queryString = "SELECT username, balance from user where user_id="+id;
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

  var getLeaders = function(){
    var defer = Promise.pending();
    var connection = db();
    connection.connect();
    var queryString = "SELECT username, balance FROM user ORDER BY balance DESC LIMIT 10";
    connection.query(queryString, function(err, rows, fields) {
      connection.end();
      if (err) {
        defer.reject(err);
        console.log('Error while performing Query.');
      } else {
        defer.fulfill(rows);
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
    getById: getById,
    getLeaders: getLeaders,
    incrementBalance: incrementBalance,
    decrementBalance: decrementBalance
  }
};

module.exports = user();
