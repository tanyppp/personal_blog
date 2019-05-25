import API from '../api';

export default {
  namespaced: true,
  state: {
    currentPage: 1,
    users: [],
    allCount: 10,
    count: 10,
    blogId: -2
  },
  mutations: {
    handleCurrentChange(state, p) {
      state.currentPage = p;
      this.dispatch('tanyp/board/queryCommentByPage');
    },
    switchIptState(state, curUser) {
      const bool = curUser.showIpt;
      state.users.forEach(user => {
        user.showIpt = false;
        user.reply_users.forEach(reply_user => {
          reply_user && (reply_user.showIpt = false);
        });
      });
      curUser.showIpt = !bool;
    },
    setBlogId(state, id) {
      state.currentPage = 1;
      state.blogId = id;
    }
  },
  actions: {
    insertComment(_, params) {
      API.insertComment(params).then(res => {
        alert(res.msg);
        this.dispatch('tanyp/board/queryCommentByPage');
      });
    },
    queryCommentByPage({
      state,
      state: {
        currentPage: page,
        count,
        blogId
      }
    }) {
      API.queryCommentByPage({
        page,
        count,
        blogId
      }).then(res => {
        state.allCount = res.data.allCount;
        state.users = res.data.result;
      });
    }
  }
}
