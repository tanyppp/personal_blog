// store
import {
  createNamespacedHelpers
} from 'vuex';
const {
  mapState,
  mapMutations,
  mapActions
} = createNamespacedHelpers('tanyp/board');

export default {
  props: {
    blogId: Number
  },
  computed: {
    ...mapState(['currentPage', 'users', 'count', 'allCount', 'page'])
  },
  methods: {
    ...mapMutations(['handleCurrentChange', 'switchIptState', 'setBlogId']),
    ...mapActions(['insertComment', 'queryCommentByPage'])
  },
  created() {
    this.setBlogId(this.blogId);
    this.queryCommentByPage();
  }
}
