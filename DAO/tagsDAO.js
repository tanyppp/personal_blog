const createConnection = require('./dbutil');

function insertTags(tagArr, ctime, utime, success) {
  const len = tagArr.length;
  const indexArr = [];
  const tagIdArr = [];
  let count = 0;
  tagArr.forEach(function (tag, i) {
    queryTagsByTag(tag, function (queryResult) {
      count++;
      if (queryResult.length === 1) {
        indexArr.push(i);
        tagIdArr.push(queryResult[0].id);
      }
      if (count === len) {
        tagArr = tagArr.filter(function (_, idx) {
          return !indexArr.includes(idx);
        });
        if (tagArr.length > 0) {
          const connection = createConnection();
          let queryArr = [];
          let arr = [];
          tagArr.forEach(function (tag) {
            queryArr.push('(?, ?, ?)');
            arr.push(tag, ctime, utime);
          });
          const insertSql = "insert into tags (tag, ctime, utime) values " + queryArr.join(', ');
          connection.connect();
          connection.query(insertSql, arr, function (err, insertResult) {
            if (insertResult) {
              let id = insertResult.insertId;
              tagArr.forEach(function () {
                tagIdArr.push(id++);
              });
              success(tagIdArr);
            } else {
              console.log(err);
            }
          });
          connection.end();
        } else {
          success(tagIdArr);
        }
      }
    });
  });
}

function queryTags(success) {
  const connection = createConnection();
  const querySql = "select * from tags";
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

function queryTagsByTag(tag, success) {
  const connection = createConnection();
  const querySql = "select * from tags where tag=?";
  connection.connect();
  connection.query(querySql, tag, function (err, result) {
    if (result) {
      success(result);
    } else {
      console.log(err);
    }
  });
  connection.end();
}

module.exports = {
  insertTags,
  queryTagsByTag,
  queryTags
}
