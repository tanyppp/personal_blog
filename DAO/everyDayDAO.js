const createConnection = require('./dbutil');

function insertEveryDay(content, author, ctime, success) {
  const connection = createConnection();
  const insertSql = "insert into every_day (content, author, ctime) values (?, ?, ?)";
  const params = [content, author, ctime];
  connection.connect();
  connection.query(insertSql, params, function (err, result) {
    if (result) {
      success(result);
    } else {
      console.log(err);
    }
  });
  connection.end();
}

function queryEveryDay(success) {
  const connection = createConnection();
  const querySql = "select * from every_day order by ctime desc limit 0, 1";
  connection.connect();
  connection.query(querySql, function (err, result) {
    if (result) {
      success(result);
    } else {
      console.log(err);
    }
  });
  connection.end();
}

module.exports = {
  insertEveryDay,
  queryEveryDay
}
