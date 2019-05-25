<template>
  <div>
    <quill-editor v-model="content" ref="myQuillEditor"/>
    <el-row type="flex" justify="end" style="padding: 20px 0">
      <el-button type="primary" @click="submit">提交</el-button>
    </el-row>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

import API from "../../api";

export default {
  data() {
    return {
      content: ""
    };
  },
  methods: {
    submit() {
      const { content, input } = this;
      if (content === "") return alert("内容不能为空");
      API.insertNote({
        note: content
      }).then(res => {
        alert(res.msg);
        this.content = "";
      });
    }
  },
  components: {
    quillEditor
  }
};
</script>
