export const baseURL = 'http://localhost:8000';
export const URLS = {
  insertEveryDay: {
    url: '/insertEveryDay',
    method: 'post'
  },
  queryEveryDay: {
    url: '/queryEveryDay',
    method: 'get'
  },
  insertBlog: {
    url: '/insertBlog',
    method: 'post'
  },
  queryBlogByPage: {
    url: '/queryBlogByPage',
    method: 'get'
  },
  queryBlogById: {
    url: '/queryBlogById',
    method: 'get'
  },
  queryTags: {
    url: '/queryTags',
    method: 'get'
  },
  queryBlogByTag: {
    url: '/queryBlogByTag',
    method: 'get'
  },
  updateBlogViews: {
    url: '/updateBlogViews',
    method: 'post'
  },
  queryHotBlog: {
    url: '/queryHotBlog',
    method: 'get'
  },
  insertComment: {
    url: '/insertComment',
    method: 'post'
  },
  queryCommentByPage: {
    url: '/queryCommentByPage',
    method: 'get'
  },
  queryRecentComment: {
    url: '/queryRecentComment',
    method: 'get'
  },
  insertNote: {
    url: '/insertNote',
    method: 'post'
  },
  queryAllNote: {
    url: '/queryAllNote',
    method: 'get'
  },
  queryBlogByTitle: {
    url: '/queryBlogByTitle',
    method: 'get'
  }
};
