/**
 * Created by remaus on 6/5/2015.
 */
var db = require('./database');
var Promise = require('bluebird');


var portfolio = function(){

  var addCard = function(userid, cardname, quantity){
    var connection = db();
    connection.connect();
    var defer = Promise.pending();
    //get quantity of this card in the user's existing portfolio
    //need to add to existing portfolio for this card
    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (!err) {
        console.log('You now have ' + rows[0].solution);
        defer.fulfill({'magic_add':5});
      } else {
        defer.reject(err);
        console.log('Error while performing Query.');
      }
    });

    connection.end();
    return defer.promise;
  };

  var getCard = function(userid, cardname){
    var connection = db();
    connection.connect();
    var defer = Promise.pending();
    //get quantity of this card in the user's existing portfolio
    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (!err) {
        console.log('You now have ' + rows[0].solution);
        defer.fulfill({'magic_get':6});
      } else {
        defer.reject(err);
        console.log('Error while performing Query.');
      }
    });

    connection.end();
    return defer.promise;
  };

  var removeCard = function(userid, cardname, quantity){
    var connection = db();
    connection.connect();
    var defer = Promise.pending();

    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (!err) {
        console.log('You now have ' + rows[0].solution);
        defer.fulfill({'magic_remove':7});
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

    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (!err) {
        console.log('You own ' + rows[0].solution);
        defer.fulfill({'magic1':1, 'magic2':3});
      } else {
        defer.reject(err);
        console.log('Error while performing Query.');
      }
    });

    connection.end();
    return defer.promise;
  };

  var buyCard = function(userid, cardname, quantity){
    var connection = db();
    connection.connect();
    var defer = Promise.pending();
    //get quantity of this card in the user's existing portfolio
    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (!err) {
        console.log('You now have ' + rows[0].solution);
        defer.fulfill({'magic_remove':7});
      } else {
        defer.reject(err);
        console.log('Error while performing Query.');
      }
    });

    connection.end();
    return defer.promise;
  };

  var sellCard = function(userid, cardname, quantity){
    var connection = db();
    connection.connect();
    var defer = Promise.pending();
    //do you own the card? how many? cap sell at user owned quantity.
    //get the price
    //compute sold dollar amount
    //decrement portfolio for cardname
    //update user balance

    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (!err) {
        console.log('You now have ' + rows[0].solution);
        defer.fulfill({'magic_remove':7});
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
