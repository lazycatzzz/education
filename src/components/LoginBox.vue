<template>
  <div class="login_container">
    <div class="container">
      <img src="../assets/logo.png" @click="toHome" alt="" />
      <div class="login_box">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background-color: #70a1ff;
  position: relative;
}
.container {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.login_box {
  width: 400px;
  background-color: #fff;
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.3);
  padding: 20px 60px;
}
img {
  width: 150px;
  height: 150px;
  cursor: pointer;
}
</style>
