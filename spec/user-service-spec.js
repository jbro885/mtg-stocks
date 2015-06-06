var user = require('../data/user');

describe("A user", function() {
  it("it exists", function(done) {

    user.getById(2)
      .then(function(results){
        expect(1).toBe(2);
        done();
      }, function(results){
        expect(1).toBe(2);
        done();
      });

  });
});
