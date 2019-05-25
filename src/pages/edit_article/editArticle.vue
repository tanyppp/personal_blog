<template>
  <div>
    <el-row style="padding-bottom: 20px" type="flex" align="middle">
      <span style="width: 80px">文章名：</span>
      <el-input placeholder="请输入文章名" v-model="title" clearable></el-input>
    </el-row>
    <el-row style="padding-bottom: 20px" type="flex" align="middle">
      <span style="width: 80px">标签：</span>
      <el-input placeholder="请输入标签名，中文逗号隔开" v-model="tags" clearable></el-input>
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
      title: "",
      tags: "",
      content: ""
    };
  },
  methods: {
    submit() {
      const { content, tags, title } = this;
      if (content === "" || title === "" || tags === "")
        return alert("所以内容都不能为空");
      API.insertBlog({
        content,
        tags,
        title
      }).then(res => {
        alert(res.msg);
        this.title = "";
        this.tags = "";
        this.content = "";
      });
    }
  },
  components: {
    quillEditor
  }
};
</script>
