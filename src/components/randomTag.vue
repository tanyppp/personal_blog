<template>
  <div class="randomTag">
    <el-card>
      <div class="clearfix" slot="header">
        <span>标签云</span>
      </div>
      <el-tag
        size="medium"
        v-for="(item, i) in tags"
        :key="item.tag + i"
        :color="randomColor()"
        :hit="true"
        @click="$emit('search-tag', item.tag)"
      >{{ item.tag }}</el-tag>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    tags: Array
  },
  computed: {
    randomColor() {
      let r, g, b;
      return function() {
        r =
          Math.floor(Math.random() * 256) < 30
            ? Math.floor(Math.random() * 30)
            : Math.floor(Math.random() * 256) - 30;
        g =
          Math.floor(Math.random() * 256) < 30
            ? Math.floor(Math.random() * 30)
            : Math.floor(Math.random() * 256) - 30;
        b =
          Math.floor(Math.random() * 256) < 30
            ? Math.floor(Math.random() * 30)
            : Math.floor(Math.random() * 256) - 30;
        return `rgb(${r}, ${g}, ${b})`;
      };
    }
  }
};
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.randomTag {
  .el-tag {
    margin: 5px 8px;
    color: #fff;
    cursor: pointer;
  }
}
</style>
