/**
 * Created by remaus on 6/5/2015.
 */
var portfolio = require('../data/portfolio');
describe("A portfolio", function() {

  it("it exists", function (done) {

    portfolio.getPortfolio(1)
      .then(function(results) {
        expect(1).toBe(0)
        done();
      });


  });
});
