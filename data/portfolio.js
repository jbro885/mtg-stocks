/**
 * Created by remaus on 6/5/2015.
 */
var db = require('./database');
var Promise = require('bluebird');


var portfolio = function(){

  var sellCard = function(userid, cards_id, quantity){
    var connection = db();
    connection.connect();
    var defer = Promise.pending();

    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (!err) {
        console.log('You removed ' + rows[0].solution + ' ' + cards_id);
        defer.fulfill({"cards_id": cards_id, "quantity": rows[0].solution});
      } else {
        defer.reject(err);
        console.log('Error while performing Query.');
      }
    });

    connection.end();
    return defer.promise;
  };


  var getPortfolio = function(userid){
    var connection = db();
    connection.connect();
    //get quantity of each card in the user's portfolio
    var defer = Promise.pending();

    var query = 'SELECT c.cards_id, p.quantity, c.card_name from portfolio p join card c on p.cards_id = c.cards_id'
      + ' where p.quantity > 0 and p.user_id  = ' + userid;

    connection.query(query, function(err, rows, fields) {
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

  var buyCard = function(userid, cards_id, quantity){
    var connection = db();
    connection.connect();
    var defer = Promise.pending();
    var portfolio_item = [userid, cards_id, quantity];
    var query = "CALL buyCard(?, ?, ?);";

    connection.query(query, portfolio_item, function(err, result) {
      if (err)
        throw err;
      defer.fulfill(result.insertId);
    });
    connection.end();

    return defer.promise;
  };

  var sellCard = function(userid, cards_id, quantity){
    //do you own the card? how many? cap sell at user owned quantity.
    //get the price
    //compute sold dollar amount
    //decrement portfolio for cards_id
    //update user balance

      var connection = db();
      connection.connect();
      var defer = Promise.pending();
      var portfolio_item = [userid, cards_id, quantity];
      var query = "CALL sellCard(?, ?, ?);";

      connection.query(query, portfolio_item, function(err, result) {
        if (err)
          throw err;
        defer.fulfill(result.insertId);
      });
      connection.end();

      return defer.promise;
    };

  return {
    sellCard: sellCard,
    getPortfolio: getPortfolio,
    buyCard: buyCard
  }
};

module.exports = portfolio();
