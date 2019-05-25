<template>
  <div class="recentHot">
    <el-card>
      <div class="clearfix" slot="header">
        <span>最近热门</span>
      </div>
      <div class="hotInfo" v-for="(item, i) in hotBlogList" :key="item.title + i">
        <span
          class="link ellipsis"
          @click="$emit('go-blog', item.id)"
        >{{ item.title }}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ["hotBlogList"]
};
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.hotInfo:not(:last-child) {
  padding-bottom: 10px;
}
</style>
