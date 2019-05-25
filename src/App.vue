<template>
  <el-container class="main" direction="vertical">
    <el-header class="nav">
      <el-row>
        <span class="title" @click="goHome">岁月如歌 | 个人博客</span>
        <div class="el-menu-nav">
          <div class="nav__left">
            <router-link class="nav__link" tag="span" to="/" @click="showAllTagBlog">首页</router-link>
            <router-link class="nav__link" tag="span" to="/notes">随记</router-link>
            <router-link class="nav__link" tag="span" to="/about">关于</router-link>
            <router-link class="nav__link" tag="span" to="/msgBoard">留言</router-link>
          </div>
          <div class="nav__right">
            <el-input v-model="searchWords" placeholder="请输入关键字" size="medium" clearable></el-input>
            <el-button type="primary" size="medium" @click="searchKeywords">搜索</el-button>
          </div>
        </div>
      </el-row>
    </el-header>

    <el-main class="section">
      <el-row class="section__wrap">
        <el-col :span="15">
          <router-view class="section__wrap__view"/>
        </el-col>
        <el-col class="section__wrap__right" :span="8" :offset="1">
          <random-tag :tags="tags" @search-tag="searchTag"/>
          <recent-hot :hotBlogList="hotBlogList" @go-blog="goBlog"/>
          <last-comment :recentComment="recentComment" @go-href="goHref"/>
        </el-col>
      </el-row>
    </el-main>

    <el-footer class="footer">This is my all life.</el-footer>
  </el-container>
</template>

<script>
import randomTag from "./components/randomTag";
import recentHot from "./components/recentHot";
import lastComment from "./components/lastComment";

import API from "./api";
import calcTime from "./utils/calcTime";

import "./styles/var.scss";

export default {
  data() {
    return {
      searchWords: "",
      tags: [],
      hotBlogList: [],
      recentComment: []
    };
  },
  methods: {
    goHome() {
      this.$router.push("/");
      this.showAllTagBlog();
    },
    queryTags() {
      API.queryTags().then(res => (this.tags = res.data));
    },
    queryHotBlog() {
      const num = 10;
      API.queryHotBlog({ num }).then(res => (this.hotBlogList = res.data));
    },
    queryRecentComment() {
      API.queryRecentComment().then(res => {
        res.data.forEach(
          recent => (recent.lastTime = calcTime(recent.ctime * 1000))
        );
        this.recentComment = res.data;
      });
    },
    searchKeywords() {
      const searchWords = this.searchWords;
      this.$router.push({ name: "home" });
      this.$store.state.tanyp.home.tag = "";
      this.$store.state.tanyp.home.keywords = searchWords;
      this.$store.commit("tanyp/home/handleCurrentChange", 1);
    },
    searchTag(tag) {
      this.$router.push({ name: "home" });
      this.$store.state.tanyp.home.keywords = "";
      this.$store.state.tanyp.home.tag = tag;
      this.$store.commit("tanyp/home/handleCurrentChange", 1);
    },
    showAllTagBlog() {
      this.$store.state.tanyp.home.tag = "";
      this.$store.commit("tanyp/home/handleCurrentChange", 1);
    },
    goBlog(id) {
      this.$store.commit("tanyp/blogDetail/setBlogId", id);
      this.$store.commit("tanyp/board/setBlogId", id);
      this.$store.commit("tanyp/blogDetail/setHasEnter");
      this.$store.dispatch("tanyp/blogDetail/getArticleDetail");
      this.$store.dispatch("tanyp/board/queryCommentByPage");
      this.$router.push({ name: "articleDetail" });
    },
    goHref(item) {
      const blogId = item.blog_id;
      let path = "";
      switch (blogId) {
        case -1:
          path = "/about";
          break;
        case -2:
          path = "/msgBoard";
          break;
        default:
          path = "/articleDetail";
          break;
      }
      if (path === "/articleDetail") {
        this.goBlog(blogId);
      } else {
        this.$router.push(path);
      }
      location.hash = "#" + item.id;
    }
  },
  created() {
    this.queryTags();
    this.queryHotBlog();
    this.queryRecentComment();
  },
  components: {
    randomTag,
    recentHot,
    lastComment
  }
};
</script>

<style lang='scss' rel='stylesheet/scss'>
@import "./styles/util.scss";
@import "./styles/var.scss";

body {
  min-width: 1042px;
}

.nav {
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  &__link {
    display: inline-block;
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    outline: none;
    cursor: pointer;
  }
  .is-active {
    color: $linkActiveColor;
  }
  & > .el-row {
    @include center(80%);
    @include fx-v-center();
    .title {
      color: $gray;
      font-size: 18px;
      width: 160px;
      cursor: pointer;
      margin-right: 20px;
      &:hover {
        color: $black;
      }
    }
    .el-menu-nav {
      flex: 1;
      border: none;
      @include fx-m-between();
      .nav__right {
        @include fx-v-center();
        .el-input {
          margin: 0 20px;
        }
      }
    }
  }
}
.section {
  &__wrap {
    @include center(80%);
    min-width: 824px;
    &__right {
      & > div:not(:first-child) {
        margin-top: 30px;
      }
    }
  }
}
.footer {
  @include fx-center();
  background-color: $black;
  color: #fff;
}
</style>
