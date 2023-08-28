<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

.el-dropdown {
  float: right;
}

.el-header {
  color: #333;
  line-height: 60px;
  text-align: center;
  border: #d3dce6 solid 1px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 40px;
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

<script>
export default {
  data() {
    return {}
  },
  created(){
    window.sessionStorage.setItem('isLogin',false)
  }
}

</script>