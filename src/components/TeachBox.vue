<template>
  <div class="content-frame">
    <el-menu
      :default-active="activePath"
      class="el-menu-demo"
      mode="horizontal"
      router
    >
      <el-menu-item index="/course" @click="saveStatus('/course')"
        >在教课程</el-menu-item
      >
      <el-menu-item index="/article" @click="saveStatus('/article')"
        >发布文章</el-menu-item
      >
    </el-menu>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activePath: ''
    }
  },
  created() {
    console.log(this.$route)
    this.activePath = this.$route.fullPath
  },
  mounted() {
    console.log(this.$route)
  },
  methods: {
    saveStatus(path) {
      window.sessionStorage.setItem('activePath', path)
      this.activePath = path
    }
  }
}
</script>
<style lang="stylus" scoped></style>
