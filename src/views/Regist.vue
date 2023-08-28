<template>
  <div class="regist_con">
    <div class="regist_box">
      <!-- 登陆表单区域 -->
      <el-form :label-position="labelPosition" :model="regForm" :rules="regFormRules" ref="regFormRef" class="reg_form"
        label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="regForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="regForm.password"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="real_name">
          <el-input v-model="regForm.real_name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="regForm.email"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="checkCode">发送验证码</el-button>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="regForm.code"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="regUser">注 册</el-button>
          <el-button type="warning" @click="cancle">取 消</el-button>
          <el-button type="info" @click="resetRegForm">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { regist, sendCode } from '@/api/api';

export default {
  data() {
    // 验证邮箱手机的规则 （自定义校验规则
    var checkEmail = (rule, value, callback) => {
      var regemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (regemail.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法邮箱"));
    };
    return {
      labelPosition: 'left',
      //添加用户的表单
      regForm: {
        username: "",
        password: "",
        "real_name": "",
        email: "",
        code: "",
      },
      regFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名长度在3-10个字符之间",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码长度在6-15个字符之间",
            trigger: "blur",
          },
        ],
        "real_name": [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "姓名长度在3-10个字符之间",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 重置
    resetRegForm() {
      this.$refs.regFormRef.resetFields();
    },
    // 注册
    regUser() {
      this.$refs.regFormRef.validate(async (valid) => {
        if (!valid) return;
        // const { data: res } = await this.$http.post(
        //   "/api/v1/users/register",
        //   this.regForm
        // );
        console.log(this.regForm)
        regist(this.regForm).then(res => {
          console.log(res)
          if (res.data.status === 'success') {
            this.$router.push("/login");
          }
        }, err => {
          console.log(err)
          switch (err.response.status) {
            case 401:
              alert("验证码错误或已过期！")
              break;
            case 409:
              alert("用户名或邮箱已注册！")
              break;
            case 400:
              alert("请求错误！")
              break;
          }
        })
        // if (res.meta.status != 0) return this.$message.error(res.meta.msg);
        // this.$message.success(res.meta.msg);
        // // 页面跳转
        // this.$router.push("/login");
      });
    },
    cancle() {
      this.$router.push("/login");
    },
    //发送验证码
    async checkCode() {
      // const { data: res } = await this.$http.post(
      //   "/api/v1/users/verification",
      //   { email: this.regForm.email }
      // );
      sendCode(this.regForm.email).then(res => {

      })
      if (res.meta.status != 0) {
        return this.$message.error(res.meta.msg);
      }
      this.$message.success(res.meta.msg);
    },
  },
};
</script>

<style>
.regist_box {
  width: 450px;
  height: 500px;
  background-color: white;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #eee;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.reg_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>

