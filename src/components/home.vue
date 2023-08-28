<template>
  <el-container class="home-container">
    <!-- 主页顶栏 -->
    <el-header>
      <div class="logo">
        <img src="../assets/logo.png" alt="" @click="open" />
      </div>
      项目管理系统
      <div class="user">
        <div v-if="isLogin">
          <el-avatar> user </el-avatar>
          <el-button type="danger" @click="logout">退出</el-button>
        </div>
        <div v-else @click="login">
          <el-avatar>登录</el-avatar>
        </div>
      </div>
    </el-header>
    <el-container>
      <!-- 主页侧边栏 -->
      <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" :direction="direction" :modal="true" :size="'25%'">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" >
          <el-menu-item index="1" @click="workspace">
            <i class="el-icon-menu"></i>
            <span slot="title">工作台</span>
          </el-menu-item>
          <el-menu-item index="2" @click="message">
            <i class="el-icon-menu"></i>
            <span slot="title">消息</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">通讯录</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">文档</span>
          </el-menu-item>
        </el-menu>
      </el-drawer>
      <!-- 主页主体 -->
      <div>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </div>
    </el-container>
  </el-container>
  
</template>

<script>
require("../assets/js/fontawesome");

export default {
  data() {
    return {
      isLogin: "",
      direction: 'ltr',
      drawer: false,
    };
  },
  created() {
    // this.activePath = window.localStorage.getItem("activePath");
    if (window.localStorage.getItem("token") != null) {
      console.log("now username")
      console.log(localStorage.getItem("username"))
      this.isLogin = true;
    }
  },
  methods: {
    open() {
      console.log("open");
      this.drawer = true;
    },
    logout() {
      console.log("logout");
      this.isLogin = false;
      window.localStorage.clear();
      // location.reload();
      this.$router.replace("/login");
      //this.$router.reload()
    },
    login() {
      console.log("login");
      this.$router.push("/login");
    },
    workspace() {
      console.log("change to workspace")
      this.$router.push({ name: 'workspace' }, () => { this.$router.push('/workspace') })
    },
    message() {
      console.log("change to message")
      this.$router.push({ name: 'message' }, () => { this.$router.push('/message') })
    }
  },
};
</script>

<style scoped>
.el-header {
  height: 8vh;
  width: 100vw;
  /* text-align: center; */
}
/* 
.el-upload {
  border: 1px solid #000;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.el-upload:hover {
  border-color: #409EFF;
}

.el-main {
  height: 100%;
  background-color: white;
} */

.logo {
  float: left;
}

.user {
  float: right;
  margin: 10px 20px;
}

.sideBar {
  position: fixed;
  background-color: white;
  height: 100%;
}

img {
  border-radius: 10px;
  padding-left: 5px;
  padding-top: 5px;
  width: 45px;
}
</style>