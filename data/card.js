var db = require('./database');
var Promise = require('bluebird');

var card = function(){

  var addCardQuery = function(cards) {
    var query = "INSERT INTO `card` \
           (\
             `set_id`, \
             `card_name`, \
             `currency`, \
             `cost_min`, \
             `cost_mid`, \
             `cost_max`\
           ) VALUES ";

    var values = [];
    cards.forEach(function(card) {
      if (card)
        values.push("(\
              "+card.set+", \
          \"" + card.name + "\", \
            \"$\", \
            " + card.min + ", \
            " + card.mid + ", \
            " + card.max + " \
          )");
      })

    var onDuplicate = ' on duplicate key update cost_mid=' + card.mid;

    return query + values.join(", ") + onDuplicate;
  };

  var getSets = function(){
    var defer = Promise.pending();
    var connection = db();
    connection.connect();

    connection.query(
      "select set_id, set_name from `set`"
      , function(err, sets) {
        if (err) throw err;
        defer.fulfill(sets);

      });

    connection.end();
    return defer.promise;
  };

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

  var batchAddSets = function(names) {
    var defer = Promise.pending();

    var connection = db();
    connection.connect();

    var query = "INSERT INTO `set` \
      (\
        `set_name` \
      ) VALUES ";
    for(var i in names) {
      if(i != 0) query += ",";
      query += "(\"" + names[i] + "\")";
    }

    console.log(query);
    connection.query(query, function(err, rows, fields) {
      if (err) throw err;
      else defer.fulfill(rows);
    });

    return defer.promise;
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

  var addCards = function(cards){
    var defer = Promise.pending();
    var connection = db();
    connection.connect();

    var query = addCardQuery(cards);
    console.log(query);

    connection.query(
      query,
      function(err, result) {
        if (err)
          throw err;
        defer.fulfill(result.insertId);
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
    var queryString = "select c.*, s.set_name from card c join `set` s on c.set_id = s.set_id";
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

  var findCard = function(name){
    var defer = Promise.pending();
    var connection = db();
    connection.connect();
    var queryString = "SELECT * from card WHERE card_name like '%"+name+"%'";
    connection.query(queryString, function(err, result) {
      if (!err) {
        defer.fulfill(result);
      } else {
        defer.reject(err);
        console.log('Error while performing Query.');
      }
    });

    connection.end();
    return defer.promise;
  };

  return {
    getSets: getSets,
    addSet: addSet,
    getCard: getCard,
    addCards: addCards,
    getAllCards: getAllCards,
    batchAddSets: batchAddSets,
    findCard: findCard
  }
};

module.exports = card();
