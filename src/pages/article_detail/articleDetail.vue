<template>
  <div class="articleDetail">
    <template v-if="hasDetail">
      <div class="hasDetail">
        <!-- 导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ article.title }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 标题 -->
        <h2 style="text-align: center; color: rgb(0, 136, 219)">{{ article.title }}</h2>
        <!-- 说明 -->
        <div style="font-size: 14px; border-bottom: 1px solid #ccc; color: rgb(172, 90, 36)">
          <p>
            分类：
            <span v-for="(tag, i) in tagArr" :key="tag + i">
              <router-link
                class="specify specify__a"
                :to="{ name: 'home', params: { tag } }"
              >{{ tag }}</router-link>
              <span v-if="i < tagArr.length - 1">，</span>
            </span>
          </p>
          <p>
            浏览量：
            <span class="specify">{{ article.views }}</span>
          </p>
          <p>
            发布时间：
            <span class="specify">{{ article.ctime }}</span>
          </p>
          <p>
            更新时间：
            <span class="specify">{{ article.utime }}</span>
          </p>
        </div>
        <!-- 正文 -->
        <div class="content" v-html="article.content"></div>
        <div style="height: 1px; background-color: rgb(204, 204, 204); margin: 20px 0"></div>
        <base-board :blogId="article.id"/>
      </div>
    </template>
    <template v-else>
      <h1 style="text-align: center">没有相关文章哟！</h1>
    </template>
  </div>
</template>

<script>
import baseBoard from "../msg_board/components/board";
import parseQuery from "../../utils/parseQuery";
// store
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "tanyp/blogDetail"
);

export default {
  beforeRouteLeave(to, from, next) {
    this.setHasLeave();
    next();
  },
  computed: {
    ...mapState(["blogId", "article", "tagArr", "hasDetail", "hasEnter"])
  },
  methods: {
    ...mapMutations(["setBlogId", "setHasLeave", "setNoDetail"]),
    ...mapActions(["getArticleDetail"])
  },
  created() {
    if (!this.hasEnter) {
      const query = parseQuery(location.search);
      if (!query.id) {
        this.setNoDetail();
      } else {
        this.setBlogId(query.id);
        this.getArticleDetail();
      }
    }
  },
  components: {
    baseBoard
  }
};
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.specify {
  color: rgb(255, 51, 102);
  transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  &__a:hover {
    color: #409eff;
  }
}
</style>
