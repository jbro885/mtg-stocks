/**
 * Created by remaus on 6/5/2015.
 */
var db = require('./database');

var portfolio = function(){
  var connection = db();
  connection.connect();

  var addCard = function(userid, cardname, quantity){

    //get quantity of this card in the user's existing portfolio
    //need to add to existing portfolio for this card
    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) throw err;

      console.log('The quantity is: ', rows[0].solution);
    });

    connection.end();

  };

  var getCard = function(userid, cardname){
    //get quantity of this card in the user's existing portfolio
    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) throw err;

      console.log('You own this number of ' + cardname + ' ' + rows[0].solution);
    });

    connection.end();
    return {cardname:1};
  };

  var getPortfolio = function(userid){
    //get quantity of each card in the user's portfolio
    var defer = Promise.pending();

    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (!err) {
        console.log('You own ' + rows[0].solution);
        defer.fulfill(rows);
      } else {
        defer.reject(err);
        console.log('Error while performing Query.');
      }
    });

    connection.end();
    return {'magic1':1, 'magic2':3};
  };

  var buyCard = function(userid, cardname, quantity){
    //get quantity of this card in the user's existing portfolio
    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) throw err;

      console.log('You own ' + rows[0].solution);
    });

    connection.end();
    return {'requested':quantity, 'bought':quantity};
  };

  var sellCard = function(userid, cardname, quantity){
    //do you own the card? how many? cap sell at user owned quantity.
    //get the price
    //compute sold dollar amount
    //decrement portfolio for cardname
    //update user balance

    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) throw err;

      console.log('You own ' + rows[0].solution);
    });

    connection.end();
    return {'requested':quantity, 'sold':quantity};
  };

  return {
    addCard: addCard,
    getCard: getCard,
    getPortfolio: getPortfolio,
    buyCard: buyCard,
    sellCard: sellCard
  }
};

module.exports = portfolio();
