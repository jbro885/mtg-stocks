var db = require('./database');
var Promise = require('bluebird');

var user = function(){
  var addUser = function(name, password){
    var connection = db();
    connection.connect();
    connection.query('INSERT INTO user (username, user_password) VALUES (', function(err, rows, fields) {
      connection.end();
      if (!err) {
        defer.fulfill(rows);
      } else {
        defer.reject(err);
        console.log('Error while performing Query.');
      }
    });

  };

  var getById = function(id){
    var defer = Promise.pending();

    var connection = db();
    connection.connect();
    var queryString = "SELECT username from user where user_id="+id;
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

  return {
    addUser: addUser,
    getById: getById
  }
};

module.exports = user();
