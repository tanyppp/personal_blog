<template>
  <div class="dailySentence" v-if="sentence">
    <el-card>
      <el-row>
        <el-col :span="18">
          <p class="dailySentence__title">
            每日一句
            <span class="el-icon-s-opportunity"></span>
          </p>
          <p class="dailySentence__sentence" v-html="sentence"></p>
        </el-col>
        <el-col :span="5" :offset="1">
          <p class="dailySentence__author">--- {{ author }}</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    sentence: String,
    author: String
  }
};
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
@import "../../../styles/util.scss";
@keyframes changeColor {
  0% {
    color: #db7093;
  }
  25% {
    color: #da70d6;
  }
  50% {
    color: #9932cc;
  }
  75% {
    color: #6a5acd;
  }
  100% {
    color: #4169e1;
  }
}
.dailySentence {
  font-size: 14px;
  .el-row {
    @include fx-v-end();
  }
  &__title {
    font-size: 12px;
    animation: changeColor 5s linear infinite;
  }
  &__author {
    text-align: right;
  }
}
</style>
