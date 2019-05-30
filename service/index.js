const express = require('express');
const fs = require('fs');
// 在服务端启动webpack
// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const compiler = webpack(require('../build/webpack.server'));

const config = require('./config');
const loader = require('./loader');

const whiteList = ['http://localhost:3000', 'http://localhost:8000', 'http://192.168.1.106:8000'];

const app = express();

// app.use(webpackDevMiddleware(compiler));
// app.use(express.static('../dist'));

app.use(function (req, res, next) {
  const origin = req.headers.origin;
  if (whiteList.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.setHeader('Access-Control-Allow-Methods', 'PUT');
    // 允许携带凭证
    res.setHeader('Access-Control-Allow-Credentials', true);
    // 试探请求时间
    res.setHeader('Access-Control-Max-Age', 6);
    // 告诉客户端，响应头回复的数据是安全的
    res.setHeader('Access-Control-Expose-Headers', 'name');
    // 有了上面的设置，客户端就可以得到响应回复的数据
    res.setHeader('name', 'typ');
    // 设置content-type
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  }
  next();
});

app.use(express.static(config.page_path));

// 每日一句更新
app.post('/insertEveryDay', loader.get('/insertEveryDay'));
// 每日一句接口
app.get('/queryEveryDay', loader.get('/queryEveryDay'));
// 博客更新
app.post('/insertBlog', loader.get('/insertBlog'));
// 按页查询博客
app.get('/queryBlogByPage', loader.get('/queryBlogByPage'));
// 按博客id查询博客
app.get('/queryBlogById', loader.get('/queryBlogById'));
// 查询所有标签
app.get('/queryTags', loader.get('/queryTags'));
// 按照标签查询博客
app.get('/queryBlogByTag', loader.get('/queryBlogByTag'));
// 更新浏览量
app.post('/updateBlogViews', loader.get('/updateBlogViews'));
// 查询热门博客
app.get('/queryHotBlog', loader.get('/queryHotBlog'));
// 查询最近评论
app.get('/queryRecentComment', loader.get('/queryRecentComment'));
// 评论
app.post('/insertComment', loader.get('/insertComment'));
// 按页查询评论
app.get('/queryCommentByPage', loader.get('/queryCommentByPage'));
// 添加随记
app.post('/insertNote', loader.get('/insertNote'));
// 查询随记
app.get('/queryAllNote', loader.get('/queryAllNote'));
// 搜索
app.get('/queryBlogByTitle', loader.get('/queryBlogByTitle'));
//  为vue-router提供的接口，只需返回html
app.get('*', function (req, res) {
  const HTML = fs.readFileSync('../dist/index.html');
  res.end(HTML);
});

app.listen(config.port, function () {
  console.log(`服务已在端口号${config.port}启动`);
});
