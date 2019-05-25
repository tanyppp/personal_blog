import API from '../api';

export default {
  namespaced: true,
  state: {
    content: "",
    author: "",
    currentPage: 1,
    count: 5,
    articleList: [],
    allCount: 0,
    tag: '',
    keywords: ''
  },
  mutations: {
    handleSizeChange(state, e) {
      state.count = e;
      if (state.tag !== '') {
        this.dispatch('tanyp/home/queryBlogByTag');
      } else if (state.keywords !== '') {
        this.dispatch('tanyp/home/queryBlogByTitle');
      } else {
        this.dispatch('tanyp/home/queryBlogByPage');
      }
    },
    handleCurrentChange(state, e) {
      e && (state.currentPage = e);
      if (state.tag !== '') {
        this.dispatch('tanyp/home/queryBlogByTag');
      } else if (state.keywords !== '') {
        this.dispatch('tanyp/home/queryBlogByTitle');
      } else {
        this.dispatch('tanyp/home/queryBlogByPage');
      }
    },
    changeEveryDay(state, {
      content,
      author
    }) {
      state.content = content;
      state.author = author;
    },
    setArticleList(state, {
      count: allCount,
      blogList: articleList
    }) {
      state.allCount = allCount;
      state.articleList = articleList;
    },
    setTag(state, tag) {
      state.tag = tag;
    },
    showAllBlog(state) {
      state.tag = '';
      state.keywords = '';
      this.commit("tanyp/home/handleCurrentChange", 1)
    },
  },
  actions: {
    queryEveryDay({
      commit
    }) {
      API.queryEveryDay().then(res => commit('changeEveryDay', res.data));
    },
    queryBlogByPage({
      commit,
      state: {
        currentPage: page,
        count
      }
    }) {
      API.queryBlogByPage({
        page,
        count
      }).then(res => commit('setArticleList', res.data));
    },
    queryBlogByTag({
      commit,
      state: {
        currentPage: page,
        count,
        tag
      }
    }) {
      API.queryBlogByTag({
        tag,
        count,
        page
      }).then(res => commit('setArticleList', res.data));
    },
    updateBlogViews(_, {
      id,
      views
    }) {
      API.updateBlogViews({
        id,
        views
      }).then(res => console.log(res));
    },
    queryBlogByTitle({
      commit,
      state: {
        currentPage: page,
        count,
        keywords
      }
    }) {
      API.queryBlogByTitle({
        title: keywords,
        page,
        count
      }).then(res => commit('setArticleList', res.data));
    }
  }
}
