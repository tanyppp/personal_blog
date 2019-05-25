const mysql = require('mysql');

function createConnection() {
  return mysql.createConnection({
    ip: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'monkey123',
    database: 'my_blog'
  })
}

module.exports = createConnection;
