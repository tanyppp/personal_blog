const blogDAO = require('../DAO/blogDAO');
const tagsDAO = require('../DAO/tagsDAO');
const tagBlogMapDAO = require('../DAO/tagBlogMapDAO');
const resp = require('../utils/respUtil');
const timeUtil = require('../utils/timeUtil');

const m = new Map();

function insertBlog(req, res) {
  req.on('data', function (data) {
    const t = timeUtil.getNow();
    const {
      title,
      content,
      tags
    } = JSON.parse(data.toString().replace(/[\r\n]/g, ''));
    blogDAO.insertBlog(title, content, 0, tags, t, t, function (blogRes) {
      const blogId = blogRes.insertId;
      const tagArr = tags.replace(/,/g, '，').split('，');
      tagsDAO.insertTags(tagArr, t, t, function (tagRes) {
        tagBlogMapDAO.insertTagBlogMap(tagRes, blogId, t, t, function () {
          res.writeHead(200);
          res.end(resp('ok', '插入成功', null));
        });
      });
    });
  });
}
m.set('/insertBlog', insertBlog);

function queryBlogByPage(req, res) {
  blogDAO.queryBlogByPage(req.query.page, req.query.count, function (result) {
    result.blogList.forEach(function (blog) {
      blog.ctime = timeUtil.getFormatTime(blog.ctime);
      blog.utime = timeUtil.getFormatTime(blog.utime);
    });
    res.writeHead(200);
    res.end(resp('ok', '查询成功', result));
  });
}
m.set('/queryBlogByPage', queryBlogByPage);

function queryBlogById(req, res) {
  blogDAO.queryBlogById(req.query.id, function (result) {
    result.forEach(function (blog) {
      blog.ctime = timeUtil.getFormatTime(blog.ctime);
      blog.utime = timeUtil.getFormatTime(blog.utime);
    });
    res.writeHead(200);
    res.end(resp('ok', '查询成功', result[0]));
  });
}
m.set('/queryBlogById', queryBlogById);

function queryBlogByTag(req, res) {
  const {
    tag,
    page,
    count
  } = req.query;
  blogDAO.queryBlogByTag(tag, page, count, function (result) {
    result.blogList.forEach(function (blog) {
      blog.ctime = timeUtil.getFormatTime(blog.ctime);
      blog.utime = timeUtil.getFormatTime(blog.utime);
    });
    res.writeHead(200);
    res.end(resp('ok', '查询成功', result));
  });
}
m.set('/queryBlogByTag', queryBlogByTag);

function updateBlogViews(req, res) {
  req.on('data', function (data) {
    const {
      id,
      views
    } = JSON.parse(data.toString().replace(/[\r\n]/g, ''));
    blogDAO.updateBlogViewsById(id, views, function () {
      res.writeHead(200);
      res.end(resp('ok', '更新成功', null));
    });
  });
}
m.set('/updateBlogViews', updateBlogViews);

function queryHotBlog(req, res) {
  const {
    num
  } = req.query;
  blogDAO.queryHotBlog(num, function (result) {
    res.writeHead(200);
    res.end(resp('ok', '查找成功', result));
  });
}
m.set('/queryHotBlog', queryHotBlog);

function queryBlogByTitle(req, res) {
  const {
    title,
    page,
    count
  } = req.query;
  blogDAO.queryBlogByTitle(title, page, count, function (result) {
    result.blogList.forEach(function (blog) {
      blog.ctime = timeUtil.getFormatTime(blog.ctime);
      blog.utime = timeUtil.getFormatTime(blog.utime);
    });
    res.writeHead(200);
    res.end(resp('ok', '查找成功', result));
  });
}
m.set('/queryBlogByTitle', queryBlogByTitle);

module.exports = m;
