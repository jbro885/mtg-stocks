module.exports = {
  mysql : {
    host : process.env.MYSQL_URL,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASS,
    database : process.env.MYSQL_DATABASE
  }
};
