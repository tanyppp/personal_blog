<template>
  <div class="lastComment">
    <el-card>
      <div class="clearfix" slot="header">
        <span>最新评论</span>
      </div>
      <el-row class="commentInfo" v-for="(item, i) in recentComment" :key="item.user_name + i">
        <el-col :span="18">
          <el-row class="userName ellipsis">{{ item.user_name }}</el-row>
          <el-row class="comment">
            <span class="link ellipsis" @click="$emit('go-href', item)">{{ item.comment }}</span>
          </el-row>
        </el-col>
        <el-col class="commentTime ellipsis" :span="5" :offset="1">{{ item.lastTime }}</el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    recentComment: Array
  }
};
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.commentInfo {
  &:not(:last-child) {
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  &:not(:first-child) {
    margin-top: 10px;
  }
  .userName {
    margin-bottom: 10px;
  }
  .commentTime {
    font-size: 12px;
    text-align: right;
  }
}
</style>
