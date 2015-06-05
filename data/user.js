var db = require('./database');

var user = function(){
  var addUser = function(name, password){
    var connection = db();
    connection.connect();

    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) throw err;

      console.log('The solution is: ', rows[0].solution);
    });

    connection.end();

  };

  var getById = function(id){

  };

  return {
    addUser: addUser,
    getById: getById
  }
};
