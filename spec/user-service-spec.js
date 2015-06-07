var user = require('../data/user');

describe("A user", function() {
  it("it exists", function(done) {

    user.getUser(2)
      .then(function(results){
        expect(results.user_id).toEqual(2);
        done();
    });

  });
});
