<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="http://localhost:3000/upload"
      :headers="myheader"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-form
      :model="addCourseForm"
      :rules="addCourseRules"
      ref="addCourseFormRef"
    >
      <el-form-item label="课程标题" prop="title">
        <el-input v-model="addCourseForm.title"></el-input>
      </el-form-item>
      <el-form-item label="课程简介" prop="introduce">
        <el-input type="textarea" v-model="addCourseForm.introduce"></el-input>
      </el-form-item>
      <el-form-item label="课程分类" prop="classify">
        <el-select
          v-model="addCourseForm.classify"
          placeholder="请选择课程分类"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程价格" prop="price">
        <el-input v-model="addCourseForm.price"></el-input>
      </el-form-item>
    </el-form>
    <button style="background-color:#70a1ff" @click="addCourse">
      提交
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 上传图片设置token
      myheader: { Authorization: window.sessionStorage.getItem('token') },
      addCourseForm: {
        title: '',
        introduce: '',
        classify: '',
        price: '',
        preview: ''
      },
      addCourseRules: {}
    }
  },
  created() {
    this.getCourse()
  },
  computed: {
    imageUrl() {
      if (this.addCourseForm.preview === '') return ''
      return this.$http.defaults.baseURL + this.addCourseForm.preview
    }
  },
  methods: {
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.addCourseForm.preview = res.data.file
    },
    // 上传图片前的验证
    beforeAvatarUpload(file) {
      console.log(file)
      // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      if (!isLt2M) {
        this.$message.error('上传课程图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    async addCourse() {
      const { data: res } = await this.$http.post('course', this.addCourseForm)
      if (res.meta.status !== 200) this.$message.error(res.meta.msg)
      else this.$message.success(res.meta.msg)
    },
    async getCourse() {
      const { data: res } = await this.$http.get('course')
      console.log(res)
    }
  }
}
</script>
<style lang="less" scoped>
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 300px;
  height: 178px;
  display: block;
}
</style>
