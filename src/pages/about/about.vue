<template>
  <div class="about">
    <el-card>
      <div slot="header" class="clearfix">
        <span>关于我</span>
      </div>
      <p>博主出生于武汉，学习的前端</p>
      <p>爱生活，爱自由</p>
    </el-card>
    <base-board :blogId="-1"/>
  </div>
</template>

<script>
import baseBoard from '../msg_board/components/board';
// mixin
import Mixin from '../../mixins/about';

export default {
  mixins: [Mixin],
  components: {
    baseBoard
  }
};
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
</style>
