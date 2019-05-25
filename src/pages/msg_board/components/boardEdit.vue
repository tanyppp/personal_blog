<template>
  <div class="boardEdit">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item style="margin-bottom: 0" v-if="hasCookie">
        <span class="user__name">{{ userName }}</span>，你好~
      </el-form-item>
      <el-form-item label="昵称" prop="name" v-if="!hasCookie">
        <el-input type="text" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" v-if="!hasCookie">
        <el-input type="text" v-model="form.email" placeholder="输入邮箱在被回复时会通知哦"></el-input>
      </el-form-item>
      <el-form-item label="留言板" prop="desc">
        <el-input class="textarea" type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="validVal">
        <br>
        <el-row class="clearfix validate">
          <el-col :span="6">
            <el-input type="text" v-model="form.validVal"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <random-validate class="canvas" @draw-can="drawCanvas"/>
          </el-col>
        </el-row>
      </el-form-item>
      <el-alert
        @close="alertClose"
        v-if="!isPass"
        style="margin-bottom: 22px"
        title="验证码错误"
        type="error"
        show-icon
      ></el-alert>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import randomValidate from "./randomValidate";
import parseCookie from "@/utils/parseCookie";

const charArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (let i = 65; i < 91; i++) {
  charArr.push(String.fromCharCode(i));
}
for (let j = 97; j < 123; j++) {
  charArr.push(String.fromCharCode(j));
}
const len = charArr.length;
function generateRandomChar() {
  let str = " ";
  let rightStr = "";
  for (let k = 0; k < 4; k++) {
    const s = charArr[Math.floor(Math.random() * len)];
    rightStr += s;
    str += s + " ";
  }
  return {
    str,
    rightStr
  };
}
export default {
  props: {
    blogId: Number,
    parentId: Number,
    parentName: String
  },
  data() {
    const validateEmail = (rule, value, callback) => {
      if (this.form.email !== "") {
        const bool = /^[\w\d][\w\d_-]*@[\w\d]+\.[\w]{2,3}$/.test(
          this.form.email
        );
        if (bool) {
          callback();
        } else {
          callback(new Error("邮箱格式不正确"));
        }
      } else {
        callback();
      }
    };
    return {
      form: {
        desc: "",
        name: "",
        validVal: "",
        email: ""
      },
      rules: {
        desc: [{ required: true, message: "请输入留言内容", trigger: "blur" }],
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        validVal: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        email: [{ validator: validateEmail, trigger: "blur" }]
      },
      isPass: true,
      hasCookie: false,
      canvasChar: "",
      userName: "",
      can: null
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form.validVal !== this.canvasChar) {
            this.isPass = false;
            return false;
          }
          const cookieObj = parseCookie(document.cookie);
          if (cookieObj.userName == null || cookieObj.email == null) {
            document.cookie = "userName=" + this.form.name;
            document.cookie = "email=" + this.form.email;
            this.hasCookie = true;
            this.userName = this.form.name;
          }
          let { desc: comment, name: userName, email } = this.form;
          const { blogId, parentId, parentName } = this;
          if (userName === "") {
            userName = cookieObj.userName;
          }
          if (email === "") {
            email = cookieObj.email;
          }
          this.$emit("insert-comment", {
            blogId,
            parentId,
            parentName,
            comment,
            userName,
            email
          });
          this.isPass = true;
          this.drawCanvas(this.can);
          this.resetForm("form");
        } else {
          console.log("error submit!!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    alertClose() {
      this.isPass = true;
    },
    drawCanvas(can) {
      const ctx = can.getContext("2d");
      const w = can.width;
      const h = can.height;
      const { str, rightStr } = generateRandomChar();
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 14;
      ctx.textAlign = "center";
      ctx.fillStyle = "#ddd";
      ctx.font = "16px Roboto Slab";
      ctx.fillText(str, w / 2, 20);
      !this.can && (this.can = can);
      this.canvasChar = rightStr;
    }
  },
  created() {
    const cookies = document.cookie;
    const obj = parseCookie(cookies);
    if (obj.userName != null) {
      this.hasCookie = true;
      this.userName = obj.userName;
    }
  },
  components: {
    randomValidate
  }
};
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.boardEdit {
  .user__name {
    color: #f56c6c;
  }
  .validate {
    display: flex;
    align-items: center;
    .el-col-7 {
      display: flex;
    }
  }
}
</style>
