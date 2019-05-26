const mysql = require('mysql');

function createConnection() {
  return mysql.createConnection({
    ip: '192.168.1.106',
    port: '3306',
    user: 'root',
    password: 'monkey123',
    database: 'my_blog'
  })
}

module.exports = createConnection;
