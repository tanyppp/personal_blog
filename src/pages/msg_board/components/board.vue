<template>
  <div class="board">
    <!-- 留言区 -->
    <el-card class="board__msgList" v-if="users.length">
      <msg-item
        v-for="(item, i) in users"
        :key="item.user_name + i"
        :noBorderTop="i === 0 ? true : false"
        :user="item"
        @switch-ipt-state="switchIptState"
        @insert-comment="insertComment"
      />
    </el-card>
    <!-- 分页组件 -->
    <el-pagination
      v-if="users.length"
      style="margin-top: 20px"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="count"
      layout="total, prev, pager, next"
      :total="allCount"
    ></el-pagination>
    <!-- 留言编辑 -->
    <el-card class="board__setMsg">
      <board-edit :blogId="blogId" :parentId="-1" :parentName="''" @insert-comment="insertComment"/>
    </el-card>
  </div>
</template>

<script>
import msgItem from "./msgItem";
import boardEdit from "./boardEdit";
// mixin
import Mixin from "../../../mixins/board";

export default {
  mixins: [Mixin],
  components: {
    msgItem,
    boardEdit
  }
};
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.board {
  &__msgList,
  &__setMsg {
    margin-top: 30px;
  }
}
</style>
