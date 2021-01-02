<template>
  <div class="content-frame">
    <el-card shadow="never">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ courseInfo.classify }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ courseInfo.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div>{{ courseInfo.title }}</div>
      <img :src="imageUrl" alt="" />
      <div>价格：￥{{ courseInfo.price }}</div>
      <button>购买学习</button>
    </el-card>
    <el-row :gutter="25">
      <el-col :span="18">
        <el-card shadow="never">
          <div>{{ courseInfo.introduce }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <img class="avatar" :src="avatarUrl" alt="" />
          <div>{{ teacherInfo.userName }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.query.courseId,
      courseInfo: {},
      teacherInfo: {}
    }
  },
  created() {
    this.getCourseInfo()
  },
  computed: {
    imageUrl() {
      if (!this.courseInfo.preview) return ''
      return this.$http.defaults.baseURL + this.courseInfo.preview
    },
    avatarUrl() {
      if (!this.teacherInfo.userPic) return ''
      return this.$http.defaults.baseURL + this.teacherInfo.userPic
    }
  },
  methods: {
    async getCourseInfo() {
      const { data: res } = await this.$http.get('course/' + this.id)
      if (res.meta.status !== 200) this.$message.error(res.meta.msg)
      else this.courseInfo = res.data
      this.getTeacherInfo()
    },
    async getTeacherInfo() {
      const { data: res } = await this.$http.get(
        'user/' + this.courseInfo.teach_id
      )
      if (res.meta.status !== 200) this.$message.error(res.meta.msg)
      else this.teacherInfo = res.data
    }
  }
}
</script>
<style lang="less" scoped>
.avatar {
  display: block;
  width: 100px;
  border-radius: 50%;
}
</style>
