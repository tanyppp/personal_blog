<template>
  <div class="msgBoard">
    <!-- 说明 -->
    <el-card>
      <div slot="header" class="clearfix">说明</div>
      <p>欢迎大家留言</p>
      <p>不要皮，谢谢~</p>
    </el-card>
    <base-board :blogId="blogId"/>
  </div>
</template>

<script>
import baseBoard from './components/board';

export default {
  data() {
    return {
      blogId: -2
    }
  },
  components: {
    baseBoard
  }
};
</script>
