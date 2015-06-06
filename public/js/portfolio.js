var portfolio = function(){
  var buy = function(data, success, error){
    $.ajax('/user', {
      data : data,
      method: 'DELETE'
    }).success(success).error(error)
  };

  var sell = function(data, success, error){
    $.ajax('/user', {
      data : data,
      method: 'POST'
    }).success(success).error(error)
  };

  return {
    buy: buy,
    sell: sell
  }
}();
