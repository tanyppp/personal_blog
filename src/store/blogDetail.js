import API from '../api';

export default {
  namespaced: true,
  state: {
    blogId: 0,
    article: {},
    tagArr: [],
    hasDetail: true,
    hasEnter: false
  },
  mutations: {
    setBlogId(state, id) {
      state.blogId = id;
    },
    setHasEnter(state) {
      !state.hasEnter && (state.hasEnter = true);
    },
    setHasLeave(state) {
      state.hasEnter = false;
    },
    setNoDetail(state) {
      state.hasDetail = false;
    }
  },
  actions: {
    getArticleDetail({
      state,
      state: {
        blogId
      }
    }) {
      API.queryBlogById({
        id: blogId
      }).then(res => {
        if (res.data) {
          state.hasDetail = true;
          state.article = res.data;
          state.tagArr = res.data.tags.split("，");
          this.dispatch("tanyp/home/updateBlogViews", {
            id: state.article.id,
            views: state.article.views
          });
        } else {
          state.hasDetail = false;
        }
      });
    }
  }
}
