/**
 * Created by remaus on 6/5/2015.
 */
var db = require('./database');
var Promise = require('bluebird');


var portfolio = function(){

  var addCard = function(userid, cards_id, quantity){
    var connection = db();
    connection.connect();
    var defer = Promise.pending();
    //get quantity of this card in the user's existing portfolio
    //need to add to existing portfolio for this card
    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (!err) {
        console.log('You now have ' + rows[0].solution + ' ' + cards_id + ' cards');
        defer.fulfill({"cards_id": cards_id, "quantity": rows[0].solution});
      } else {
        defer.reject(err);
        console.log('Error while performing Query.');
      }
    });

    connection.end();
    return defer.promise;
  };

  var getCard = function(userid, cards_id){
    var connection = db();
    connection.connect();
    var defer = Promise.pending();
    //get quantity of this card in the user's existing portfolio
    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (!err) {
        console.log('You own ' + rows[0].solution + ' of card ' + cards_id);
        defer.fulfill({"cards_id": cards_id, "quantity": rows[0].solution});
      } else {
        defer.reject(err);
        console.log('Error while performing Query.');
      }
    });

    connection.end();
    return defer.promise;
  };

  var removeCard = function(userid, cards_id, quantity){
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

    connection.query("SELECT 1 + 1 AS  quantity, 77 as cards_id", function(err, rows, fields) {
      if (!err) {
        console.log('Your portfolio contains ' + rows[0].quantity + ' of ' + rows[0].cards_id);
        defer.fulfill([
          {"cards_id":rows[0].cards_id, "quantity":rows[0].quantity},
          {"cards_id":rows[0].cards_id, "quantity":rows[0].quantity}
        ]);
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
    //get quantity of this card in the user's existing portfolio
    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (!err) {
        console.log('You purchased ' + rows[0].solution + ' of card ' + cards_id);
        defer.fulfill({'cards_id':cards_id, 'quantity':rows[0].solution});
      } else {
        defer.reject(err);
        console.log('Error while performing Query.');
      }
    });

    connection.end();
    return defer.promise;
  };

  var sellCard = function(userid, cards_id, quantity){
    var connection = db();
    connection.connect();
    var defer = Promise.pending();
    //do you own the card? how many? cap sell at user owned quantity.
    //get the price
    //compute sold dollar amount
    //decrement portfolio for cards_id
    //update user balance

    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (!err) {
        console.log('You sold ' + rows[0].solution + ' of card ' + cards_id);
        defer.fulfill({'cards_id': cards_id, 'quantity':7});
      } else {
        defer.reject(err);
        console.log('Error while performing Query.');
      }
    });

    connection.end();
    return defer.promise;
  };

  return {
    addCard: addCard,
    removeCard: removeCard,
    getCard: getCard,
    getPortfolio: getPortfolio,
    buyCard: buyCard,
    sellCard: sellCard
  }
};

module.exports = portfolio();
