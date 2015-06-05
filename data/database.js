var mysql      = require('mysql');
var config = require('../config.js').mysql;

module.exports = function(){
  return mysql.createConnection(config);
};
