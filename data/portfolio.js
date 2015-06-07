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

    var query = 'SELECT t.card_id, t.tag_name from tag t where t.user_id = ' + userid + ' and t.is_deleted = 0';

    var tags;
    connection.query(query, function(err, rows, fields) {
      if(!err) {
        console.log("tags:");
        console.log(rows);
        tags = rows;
      } else {
        console.log(err);
      }
    });

    query = 'SELECT c.cards_id, p.quantity, c.card_name, c.cost_mid, c.image_url, s.set_name from portfolio p join card c on p.cards_id = c.cards_id join `set` s on c.set_id = s.set_id'
      + ' where p.quantity > 0 and p.user_id  = ' + userid;

    connection.query(query, function(err, rows, fields) {
      if (!err) {
        for(var i in rows) {
          card_id = rows[i].cards_id;
          console.log(card_id);
          for(var tag in tags) {
            if(tags[tag].card_id == card_id) {
              if(rows[i].tags == undefined) rows[i].tags = [];
              rows[i].tags.push(tags[tag].tag_name);
              console.log("tag array -->"+rows[i].tags);
            }
          }
        }
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

    var createTag = function(userId, cardId, tagName){
      var connection = db();
      connection.connect();
      var defer = Promise.pending();
      var query = 'INSERT INTO tag (`user_id`, `card_id`, `tag_name`) VALUES ('+userId+', '+cardId+', \''+tagName+'\');';
      connection.query(query, function(err, rows, fields) {
        if (!err) {
          defer.fulfill(rows);
        } else {
          defer.reject(err);
          console.log('Error while performing Query.');
        }
      });
    };

    var deleteTag = function(userId, cardId, tagName){
      var connection = db();
      connection.connect();
      var defer = Promise.pending();
      var query = 'UPDATE tag SET is_deleted = 1 WHERE user_id = '+userId+' AND card_id = '+cardId+' AND tag_name = "'+tagName+'"';
      connection.query(query, function(err, rows, fields) {
        if (!err) {
          defer.fulfill(rows);
        } else {
          defer.reject(err);
          console.log('Error while performing Query.');
        }
      });
    };

  return {
    sellCard: sellCard,
    getPortfolio: getPortfolio,
    buyCard: buyCard,
    createTag: createTag,
    deleteTag: deleteTag
  }
};

module.exports = portfolio();
