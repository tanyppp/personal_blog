// store
import {
  createNamespacedHelpers
} from 'vuex';
const {
  mapState,
  mapMutations,
  mapActions
} = createNamespacedHelpers('tanyp/home');

export default {
  computed: {
    ...mapState(['content', 'author', 'currentPage', 'count', 'articleList', 'allCount', 'tag', 'keywords'])
  },
  methods: {
    ...mapMutations(['handleSizeChange', 'handleCurrentChange', 'showAllBlog', 'setTag']),
    ...mapActions(['queryEveryDay', 'queryBlogByPage', 'queryBlogByTag', 'updateBlogViews']),
    setBlogId(id) {
      this.$store.commit('tanyp/blogDetail/setBlogId', id);
      this.$store.commit('tanyp/blogDetail/setHasEnter');
      this.$store.dispatch('tanyp/blogDetail/getArticleDetail');
      this.$router.push({
        name: 'articleDetail'
      });
    }
  },
  created() {
    const params = this.$route.params;
    const len = Object.keys(params).length;
    this.queryEveryDay();
    if (len === 0) {
      this.queryBlogByPage();
    } else {
      this.setTag(params.tag);
      this.queryBlogByTag();
    }
  }
}
