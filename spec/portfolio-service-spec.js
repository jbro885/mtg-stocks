/**
 * Created by remaus on 6/5/2015.
 */
var portfolio = require('../data/portfolio');
var user = require('../data/user');

describe("A portfolio", function() {

  it("can buy cards", function(done) {

    var balance = 0;

    user.getUser(2)
      .then(function(user){
        balance = user.balance;
      })
      .then(function(){
        return portfolio.buyCard(2, 42, 1);
      })
      .then(function(){
        return user.getUser(2)
      })
      .then(function(user){
        expect(user.balance).toBeLessThan(balance);
      })
      .then(done);

  });

  it("can sell cards", function(done) {

    var balance = 0;

    user.getUser(2)
      .then(function(user){
        balance = user.balance;
      })
      .then(function(){
        return portfolio.sellCard(2, 42, 1);
      })
      .then(function(){
        return user.getUser(2)
      })
      .then(function(user){
        expect(user.balance).toBeGreaterThan(balance);
      })
      .then(done);

  });
});
