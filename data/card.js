var db = require('./database');
var Promise = require('bluebird');

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
        defer.fulfill(result.insertId)
        console.log('The solution is: ', rows[0].solution);
      });

    connection.end();
    return defer.promise;
  };

  var getCard = function(id){
    var defer = Promise.pending();
    var connection = db();
    connection.connect();
    var data = [id];
    connection.query('select * from card where cards_id = ?', data, function(err, rows, fields) {
      if (err) throw err;
      defer.resolve(rows);
    });

    connection.end();
    return defer.promise;
  };

  var getAllCards = function(){
    var defer = Promise.pending();
    var connection = db();
    connection.connect();
    var queryString = "SELECT * from card ";
    connection.query(queryString, function(err, rows, fields) {
      if (!err) {
        defer.fulfill(rows);
      } else {
        defer.reject(err);
        console.log('Error while performing Query.');
      }
    });

    connection.end();
    return defer.promise;
  };

  return {
    addSet: addSet,
    getCard: getCard,
    addCard: addCard,
    getAllCards: getAllCards
  }
};

module.exports = card();
