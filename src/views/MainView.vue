<template>
  <div class="box">
    <img src="" alt="加载失败" class="box-img">
    <h1>{{ username }}</h1>
    <h5>{{ sign }}</h5>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: 'aaa',
      sign:'hello world'
    }
  },
}
</script>
<style></style>