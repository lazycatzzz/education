<template>
  <div>
    <el-card class="course_add" @click.native="toCourseAdd" shadow="hover"
      >添加课程</el-card
    >
    <el-card
      v-for="item in courseList"
      :key="item.id"
      :body-style="{ padding: '10px' }"
      shadow="hover"
      @click.native="toCourseDetail(item.id)"
    >
      <img :src="baseUrl + item.preview" class="image" />
      <div>
        <div class="course_title">{{ item.title }}</div>
        <div class="bottom clearfix">
          <div class="course_introduce">{{ item.introduce }}</div>
          <div class="course_price">￥{{ item.price }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      courseList: [],
      baseUrl: this.$http.defaults.baseURL
    }
  },
  computed: {},
  created() {
    this.getCourseList()
  },
  methods: {
    getCourseList() {
      this.$store
        .dispatch('getCourseList')
        .then(success => {
          this.courseList = this.$store.state.courseList
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    },
    toCourseAdd() {
      console.log('hello')
      this.$router.push('/course_add')
    },
    toCourseDetail(id) {
      this.$router.push({
        path: 'courseDetail',
        query: { courseId: id }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.image {
  width: 100%;
  display: block;
}
.el-card {
  width: 264px;
}
// .course_add {

// }
// .bottom {
// }
.course_title {
  font-size: 14px;
  font-weight: 700;
  padding: 5px 0;
}
.course_introduce {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  float: left;
  font-size: 14px;
  width: 60%;
  color: #999;
}
.course_price {
  font-size: 14px;
  color: #ff0000;
  float: right;
}
</style>
