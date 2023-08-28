<template>
  <div class="login_con">
    <div class="login_box">
      <!-- 登陆表单区域 -->
      <el-form :model="loginForm" :rules="loginRules" label-width="80px" class="login_form" ref="loginRef">
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="email">
          <el-input v-model="loginForm.email" prefix-icon="iconfont icon-user" clearable></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="iconfont icon-3702mima"
            clearable></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登 录</el-button>
          <el-button type="warning" @click="regist">注 册</el-button>
          <el-button type="info" @click="cancle">取 消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      var regemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (regemail.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法邮箱"));
    };
    return {
      // 登陆表单的数据对象
      loginForm: {
        email: "",
        password: "",
      },
      // 表单验证规则
      loginRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 登录
    login() {
      this.$refs.loginRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "http://23.94.102.135:8000/api/login",
          this.loginForm
        );
        console.log(this.loginForm)
        if (res.meta.status != 0) return this.$message.error(res.meta.msg);

        

        this.$message.success(res.meta.msg);

        window.sessionStorage.setItem("token", res.token);
        window.sessionStorage.setItem("uid", res.data.uid);
        // 页面跳转
        this.$router.push("/home");
      });
    },
    // 注册
    regist() {
      this.$router.push({ path: "/regist" });
    },
    cancle() {
      this.$router.push('/main')
    },
  },
};
</script>

<style>
.login_box {
  width: 450px;
  height: 240px;
  background-color: white;
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

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>