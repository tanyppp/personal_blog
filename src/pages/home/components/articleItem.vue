<template>
  <div class="articleItem">
    <el-card :body-style="{ padding: '5px 0 0' }">
      <el-row>
        <h3 class="link" @click="$emit('set-blogid', articleItem.id)">
          <span>{{ articleItem.title }}</span>
        </h3>
      </el-row>
      <el-row>
        <p class="article">{{ handleArticle }}</p>
      </el-row>
      <el-row class="publish">
        <span class="publish__utime">发布于：{{ articleItem.utime }}</span>
        <el-divider direction="vertical"></el-divider>
        <span class="publish__lookTimes">浏览量：{{ articleItem.views }}</span>
        <el-divider direction="vertical"></el-divider>
        <span class="publish__tag">
          标签：
          <span v-for="(tag, i) in tagArr" :key="tag + i">
            <span class="tagName" @click="$emit('article-tag', tag)">{{ tag }}</span>
            <span v-if="i < tagArr.length - 1">，</span>
          </span>
        </span>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    articleItem: Object
  },
  computed: {
    handleArticle() {
      const article =
        this.articleItem.content.replace(/<[^>]+>/g, "").substr(0, 300) + "...";
      return article;
    },
    tagArr() {
      return this.articleItem.tags.split("，");
    }
  }
};
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
@import "../../../styles/var.scss";
.articleItem {
  font-size: 14px;
  .el-row {
    padding: 5px 20px;
    .link {
      font-size: 18px;
      margin: 5px 0;
    }
    .article {
      max-height: 63px;
      line-height: 21px;
      text-overflow: ellipsis;
      overflow: hidden;
      margin: 0 0 10px;
    }
    &.publish {
      background-color: $black;
      color: #fff;
      .tagName {
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
