const commentDAO = require('../DAO/commentDAO');
const resp = require('../utils/respUtil');
const timeUtil = require('../utils/timeUtil');

const m = new Map();

function insertComment(req, res) {
  req.on('data', function (data) {
    const {
      blogId,
      parentId,
      parentName,
      userName,
      comment,
      email
    } = JSON.parse(data.toString());
    const t = timeUtil.getNow();
    commentDAO.insertComment(blogId, parentId, parentName, userName, comment, email, t, t, function () {
      res.writeHead(200);
      res.end(resp('ok', '评论成功', null));
    });
  });
}
m.set('/insertComment', insertComment);

function queryCommentByPage(req, res) {
  const {
    page,
    count,
    blogId
  } = req.query;
  commentDAO.queryCommentByPage(page, count, blogId, function (commentRes) {
    commentRes.result.forEach(function (commentInfo) {
      commentInfo.ctime = timeUtil.getFormatTime(commentInfo.ctime);
      commentInfo.utime = timeUtil.getFormatTime(commentInfo.utime);
      commentInfo.reply_users.forEach(function (reply_user) {
        reply_user.ctime = timeUtil.getFormatTime(reply_user.ctime);
        reply_user.utime = timeUtil.getFormatTime(reply_user.utime);
      });
    });
    res.writeHead(200);
    res.end(resp('ok', '查询成功', commentRes));
  });
}
m.set('/queryCommentByPage', queryCommentByPage);

function queryRecentComment(_, res) {
  commentDAO.queryRecentComment(function (result) {
    res.writeHead(200);
    res.end(resp('ok', '查询成功', result));
  });
}
m.set('/queryRecentComment', queryRecentComment);

module.exports = m;
