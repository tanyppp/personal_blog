const createConnection = require('./dbutil');

function insertNote(note, ctime, utime, success) {
  const connection = createConnection();
  const insertSql = "insert into note (note, ctime, utime) values (?, ?, ?)";
  const params = [note, ctime, utime];
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

function queryAllNote(success) {
  const connection = createConnection();
  const querySql = "select * from note order by ctime desc";
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
  insertNote,
  queryAllNote
}
