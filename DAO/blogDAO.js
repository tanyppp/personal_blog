const createConnection = require('./dbutil');
const tagsDAO = require('./tagsDAO');
const tagBlogMapDAO = require('./tagBlogMapDAO');

function insertBlog(title, content, views, tags, ctime, utime, success) {
  const connection = createConnection();
  const insertSql = "insert into blog (title, content, views, tags, ctime, utime) values (?, ?, ?, ?, ?, ?)";
  const params = [title, content, views, tags, ctime, utime];
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

function queryBlogByPage(page, count, success) {
  queryBlogCount(function (countArr) {
    const connection = createConnection();
    const querySql = "select * from blog order by ctime desc limit ?, ?";
    const params = [(page - 1) * count, parseInt(count)];
    connection.connect();
    connection.query(querySql, params, function (err, result) {
      if (result) {
        success({
          blogList: result,
          count: countArr[0].count
        });
      } else {
        console.log(err);
      }
    });
    connection.end();
  });
}

function queryBlogByTitle(title, page, count, success) {
  queryBlogCountByTitle(title, function (allCount) {
    const connection = createConnection();
    const querySql = "select * from blog where title like ? order by ctime desc limit ?, ?";
    const params = ['%' + title + '%', (page - 1) * count, parseInt(count)];
    connection.connect();
    connection.query(querySql, params, function (err, result) {
      if (result) {
        success({
          blogList: result,
          count: allCount[0].count
        });
      } else {
        console.log(err);
      }
    });
    connection.end();
  });
}

function queryBlogById(id, success) {
  const connection = createConnection();
  let params = [];
  let querySql;
  if (Array.isArray(id)) {
    const queryStr = [];
    id.forEach(function () {
      queryStr.push('id=?');
    });
    querySql = "select * from blog where " + queryStr.join(' OR ') + " order by ctime desc";
    params = id;
  } else {
    querySql = "select * from blog where id=?";
    params.push(id);
  }
  connection.connect();
  connection.query(querySql, params, function (err, result) {
    if (result) {
      success(result);
    } else {
      console.log(err);
    }
  });
  connection.end();
}

function queryBlogCount(success) {
  const connection = createConnection();
  const querySql = "select count(0) as count from blog";
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

function queryBlogCountByTitle(title, success) {
  const connection = createConnection();
  const querySql = "select count(0) as count from blog where title like ?";
  const param = '%' + title + '%';
  connection.connect();
  connection.query(querySql, param, function (err, result) {
    if (result) {
      success(result);
    } else {
      console.log(err);
    }
  });
  connection.end();
}

function queryBlogByTag(tag, page, count, success) {
  tagsDAO.queryTagsByTag(tag, function (tagRes) {
    const tagId = tagRes[0].id;
    tagBlogMapDAO.queryTagBlogMapByTagId(tagId, function (mapRes) {
      const blogIdMap = mapRes.map(function (mapResItem) {
        return mapResItem.blog_id;
      });
      queryBlogById(blogIdMap, function (blogRes) {
        const len = blogRes.length;
        const start = (page - 1) * count;
        const end = start + parseInt(count);
        success({
          count: len,
          blogList: blogRes.slice(start, end)
        });
      });
    });
  });
}

function updateBlogViewsById(id, views, success) {
  const connection = createConnection();
  const updateSql = "update blog set views=? where id=?";
  const params = [views + 1, id];
  connection.connect();
  connection.query(updateSql, params, function (err, result) {
    if (result) {
      success(result);
    } else {
      console.log(err);
    }
  });
  connection.end();
}

function queryHotBlog(num, success) {
  const connection = createConnection();
  const querySql = "select * from blog order by views desc limit ?";
  connection.connect();
  connection.query(querySql, parseInt(num), function (err, result) {
    if (result) {
      success(result);
    } else {
      console.log(err);
    }
  });
  connection.end();
}

module.exports = {
  insertBlog,
  queryBlogByPage,
  queryBlogById,
  queryBlogCount,
  queryBlogCountByTitle,
  queryBlogByTag,
  updateBlogViewsById,
  queryHotBlog,
  queryBlogByTitle
}
