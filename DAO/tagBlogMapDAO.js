const createConnection = require('./dbutil');

function insertTagBlogMap(tagIdArr, blogId, ctime, utime, success) {
  const queryArr = [];
  const arr = [];
  tagIdArr.forEach(function (tagId) {
    queryArr.push('(?, ?, ?, ?)');
    arr.push(tagId);
    arr.push(blogId);
    arr.push(ctime);
    arr.push(utime);
  });
  const connection = createConnection();
  const insertSql = "insert into tag_blog_mapping (tag_id, blog_id, ctime, utime) values " + queryArr.join(", ");
  connection.connect();
  connection.query(insertSql, arr, function (err, result) {
    if (result) {
      success(result);
    } else {
      console.log(err);
    }
  });
  connection.end();
}

function queryTagBlogMapByTagId(tagId, success) {
  const connection = createConnection();
  const querySql = "select * from tag_blog_mapping where tag_id=?";
  connection.connect();
  connection.query(querySql, tagId, function (err, result) {
    if (result) {
      success(result);
    } else {
      console.log(err);
    }
  });
  connection.end();
}

module.exports = {
  insertTagBlogMap,
  queryTagBlogMapByTagId
}
