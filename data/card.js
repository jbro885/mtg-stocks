var db = require('./database');
var Promise = require('');

var card = function(){
  var addSet = function(name){
    var connection = db();
    connection.connect();

    connection.query(
      "INSERT INTO `set` \
      (\
        `set_name` \
      ) VALUES (\
        " + name + "\
      )"
      , function(err, inserted) {
        if (err) throw err;

        console.log('The solution is: ', rows[0].solution);
      });

    connection.end();
  };

  var removeSet = function(){
    var connection = db();
    connection.connect();

    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) throw err;

      console.log('The solution is: ', rows[0].solution);
    });

    connection.end();
  };

  var addCard = function(card){
    var defer = Promise.pending();
    var connection = db();
    connection.connect();

    connection.query(
      "INSERT INTO `card` \
      (\
        `set_id`, \
        `card_name`, \
        `currency`, \
        `cost_min`, \
        `cost_mid`, \
        `cost_max`\
      ) VALUES (\
        1, \
        "+ card.name +", \
        '$', \
        null, \
        "+ card.min +", \
        "+ card.mid +", \
        "+ card.max +" \
      )"
      , function(err, result) {
        if (err) throw err;

        console.log('The solution is: ', rows[0].solution);
      });

    connection.end();
    defer.promise;
  };

  var getCard = function(id){
    var connection = db();
    connection.connect();

    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) throw err;

      console.log('The solution is: ', rows[0].solution);
    });

    connection.end();
  };

  return {
    addSet: addSet,
    getCard: getCard,
    addCard: addCard
  }
};

module.exports = card();
