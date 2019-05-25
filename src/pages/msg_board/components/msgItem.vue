<template>
  <div class="msgItem" :id="user.id">
    <el-row>
      <!-- 留言 -->
      <base-reply
        class="msgItem__baseReply"
        :time="user.ctime"
        :showIpt="user.showIpt"
        :blogId="user.blog_id"
        :parentId="user.id"
        :parentName="user.user_name"
        :class="noBorderTop && 'msgItem__noBorderTop'"
        @switch-ipt-state="$emit('switch-ipt-state', user)"
        @insert-comment="$emit('insert-comment', $event)"
      >
        <div class="replyContent">
          <span class="userName">{{ user.user_name }}</span>
          ：
          {{ user.comment }}
        </div>
      </base-reply>
      <!-- 回复 -->
      <template v-if="user.reply_users && user.reply_users.length">
        <div class="reply" v-for="(item, i) in user.reply_users" :key="item.user_name + i">
          <base-reply
            class="msgItem__baseReply"
            :time="item.ctime"
            :showIpt="item.showIpt"
            :blogId="item.blog_id"
            :parentId="item.id"
            :parentName="item.user_name"
            @switch-ipt-state="$emit('switch-ipt-state', item)"
            @insert-comment="$emit('insert-comment', $event)"
          >
            <div class="replyContent">
              <span>{{ item.user_name }}</span>
              &nbsp;回复&nbsp;
              <span>{{ item.parent_name }}</span>
              ：
              {{ item.comment }}
            </div>
          </base-reply>
        </div>
      </template>
    </el-row>
  </div>
</template>

<script>
import baseReply from "./baseReply";
export default {
  props: {
    noBorderTop: Boolean,
    user: Object
  },
  components: {
    baseReply
  }
};
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
@import "../../../styles/var.scss";
.msgItem {
  font-size: 14px;
  color: $black;
  .reply {
    padding-left: 50px;
  }
  .replyContent {
    line-height: 1.6;
  }
  span {
    color: $linkActiveColor;
  }
  &__baseReply {
    padding: 10px 0;
    border-top: 1px solid #ccc;
  }
  &__noBorderTop {
    border: none;
  }
}
</style>
