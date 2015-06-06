/**
 * Created by remaus on 6/5/2015.
 */
var portfolio = require('../data/portfolio');
describe("A portfolio", function() {
  it("it exists", function(done) {

    done();
  });

  it("it exists", function(done) {

    user.getUser(2)
      .then(function(results){
        expect(results.user_id).toEqual(2);
        done();
      });

  });
});
