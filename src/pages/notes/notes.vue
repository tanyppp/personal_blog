<template>
  <div class="map">
    <el-timeline>
      <el-timeline-item
        v-for="(item, i) in notes"
        :key="item.note + i"
        :timestamp="item.ctime"
        :type="getType()"
        placement="top"
      >
        <el-card shadow="hover">
          <h4 v-html="item.note"></h4>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
// mixin
import Mixin from "../../mixins/note";

export default {
  mixins: [Mixin]
};
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
dl {
  dd {
    padding: 20px 0;
  }
}
</style>
