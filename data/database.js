var mysql      = require('mysql');
var config = require('../config.js').mysql;

module.exports = function(){
  console.log(JSON.stringify(config));
  return mysql.createConnection(config);
};
