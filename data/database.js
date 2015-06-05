var mysql      = require('mysql');
var config = require('../config.js').mysql;

console.log(config);

var connection = mysql.createConnection(config);

module.exports = function(){
  return connection;
};
