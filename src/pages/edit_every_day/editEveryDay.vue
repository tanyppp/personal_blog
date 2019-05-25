<template>
  <div>
    <el-row style="padding-bottom: 20px" type="flex" align="middle">
      <span style="width: 60px">作者：</span>
      <el-input placeholder="请输入作者名" v-model="input" clearable></el-input>
    </el-row>
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
      input: "",
      content: ""
    };
  },
  methods: {
    submit() {
      const { content, input } = this;
      if (content === "" || input === "") return alert("作者名或内容不能为空");
      API.insertEveryDay({
        content,
        author: input
      }).then(res => {
        alert(res.msg);
        this.input = "";
        this.content = "";
      });
    }
  },
  components: {
    quillEditor
  }
};
</script>
