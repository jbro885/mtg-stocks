var db = require('./database');
var Promise = require('bluebird');

var user = function(){
  var addUser = function(name, password){
    var connection = db();
    connection.connect(function(err){
      if(!err) {
        console.log("Database is connected ... \n\n");
      } else {
        console.log("Error connecting database ... \n\n");
      }
    });

    /*app.get("/",function(req,res){
      connection.query('insert into user (username, user_password) VALUES ', function(err, rows, fields) {
        connection.end();
        if (!err)
          console.log('The solution is: ', rows);
        else
          console.log('Error while performing Query.');
      });
    });

    app.listen(3000);*/

  };

  var getById = function(id){
    var defer = Promise.pending();

    var connection = db();
    connection.query('SELECT user_id from user LIMIT 2', function(err, rows, fields) {
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
