const createConnection = require('./dbutil');
const sendEmail = require('../utils/sendEmail');

function insertComment(blogId, parentId, parentName, userName, comment, email, ctime, utime, success) {
  const connection = createConnection();
  const insertSql = "insert into comments (blog_id, parent_id, parent_name, user_name, comment, email, ctime, utime) values (?, ?, ?, ?, ?, ?, ?, ?)";
  const params = [parseInt(blogId), parseInt(parentId), parentName, userName, comment, email, ctime, utime];
  connection.connect();
  connection.query(insertSql, params, function (err, result) {
    if (result) {
      success(result);
      if (parentId > -1) {
        queryCommentById(parentId, function (comRes) {
          if (comRes.length > 0 && comRes[0].email) {
            const subject = userName + ' 回复你啦~【岁月如歌|个人博客】';
            const text = comment;
            sendEmail(comRes[0].email, subject, text);
          }
        });
      }
    } else {
      console.log(err);
    }
  });
  connection.end();
}

function queryCommentById(id, success) {
  const connection = createConnection();
  const querySql = "select * from comments where id=?";
  connection.connect();
  connection.query(querySql, id, function (err, result) {
    if (result) {
      success(result);
    } else {
      console.log(err);
    }
  });
  connection.end();
}

function queryRecentComment(success) {
  const connection = createConnection();
  const querySql = "select * from comments where parent_id=-1 order by ctime desc limit 0, 6";
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

function queryCommentByPage(page, count, blogId, success) {
  const connection = createConnection();
  const querySql = "select * from comments where blog_id=? order by ctime desc";
  connection.connect();
  connection.query(querySql, blogId, function (err, result) {
    if (result) {
      const newRes = [];
      result.forEach(commentInfo => {
        commentInfo.showIpt = false;
        if (commentInfo.parent_id === -1) {
          commentInfo.reply_users = [];
          newRes.push(commentInfo);
        }
      });
      const reverseRes = result.reverse();
      const filterRes = reverseRes.filter(item => item.parent_id > -1);

      function getReplyUser(res, id, arr = []) {
        res.forEach(item => {
          if (item.parent_id === id) {
            arr.push(item);
            return getReplyUser(res, item.id, arr);
          }
        });
        return arr;
      }
      newRes.forEach(commentInfo => {
        const arr = getReplyUser(filterRes, commentInfo.id);
        if (arr.length > 0) {
          commentInfo.reply_users = arr;
        }
      });
      success({
        allCount: newRes.length,
        result: newRes.slice((page - 1) * count, (page - 1) * count + parseInt(count))
      });
    } else {
      console.log(err);
    }
  });
  connection.end();
}

module.exports = {
  insertComment,
  queryCommentById,
  queryCommentByPage,
  queryRecentComment
}
