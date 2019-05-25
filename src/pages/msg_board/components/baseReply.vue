<template>
  <div class="baseReply">
    <slot></slot>
    <div class="time">
      {{ time }}
      <el-tooltip effect="dark" :content="showIpt ? '取消回复' : '回复'" placement="top">
        <span class="el-icon-chat-dot-square" @click="$emit('switch-ipt-state')"></span>
      </el-tooltip>
    </div>
    <!-- 点击回复显示输入框 -->
    <board-edit
      v-if="showIpt"
      :blogId="blogId"
      :parentId="parentId"
      :parentName="parentName"
      @insert-comment="$emit('insert-comment', $event)"
    />
  </div>
</template>

<script>
import boardEdit from "./boardEdit";

export default {
  props: {
    time: String,
    showIpt: Boolean,
    blogId: Number,
    parentId: Number,
    parentName: String
  },
  components: {
    boardEdit
  }
};
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
@import "../../../styles/var.scss";
.baseReply {
  .time {
    color: $gray;
    .el-icon-chat-dot-square {
      cursor: pointer;
    }
  }
  .el-btn-wrapper {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
