<template>
  <div class="home">
    <!-- 导航 -->
    <el-breadcrumb
      v-if="tag !== '' || keywords !== ''"
      style="padding: 0 10px 20px"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item @click.native="showAllBlog" :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ tag || keywords }}</el-breadcrumb-item>
    </el-breadcrumb>
    <daily-sentence :sentence="content" :author="author"/>
    <article-item
      class="home__articleItem"
      v-for="(item, i) in articleList"
      :key="item.title + i"
      :articleItem="item"
      @set-blogid="setBlogId"
      @article-tag="queryBlogByTag"
    />
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      layout="total, sizes, prev, pager, next"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20, 25]"
      :page-size="count"
      :pager-count="5"
      :total="allCount"
    />
  </div>
</template>

<script>
import dailySentence from "./components/dailySentence";
import articleItem from "./components/articleItem";
// mixin
import Mixin from "../../mixins/home";

export default {
  mixins: [Mixin],
  components: {
    dailySentence,
    articleItem
  }
};
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.home {
  &__articleItem,
  .el-pagination {
    margin-top: 30px;
  }
}
</style>
