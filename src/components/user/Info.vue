<template>
  <div class="content-frame">
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
    <el-form :model="editForm" :rules="editRules" ref="editFormRef">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="editForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editForm.email" disabled></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="editForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="editForm.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="editForm.realName"></el-input>
      </el-form-item>
      <el-form-item label="身份证" prop="cardId">
        <el-input v-model="editForm.cardId"></el-input>
      </el-form-item>
    </el-form>
    <button style="background-color:#70a1ff" @click="editUserInfo">
      提交
    </button>
  </div>
</template>
<script>
// import { mapState } from 'vuex'
export default {
  data() {
    // 验证邮箱规则
    var checkEmail = (rule, value, callback) => {
      const emailReg = /^([a-zA-Z0-9-_])+@([a-zA-Z0-9-_])+(\.[a-zA-Z0-9-_])+/
      if (emailReg.test(value)) return callback()
      return callback(new Error('请输入合法的邮箱'))
    }
    // 验证手机规则
    var checkMobile = (rule, value, callback) => {
      const mobileReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[078]|18[0-9]|14[57])[0-9]{8}$/
      if (mobileReg.test(value)) return callback()
      return callback(new Error('请输入合法的手机号'))
    }
    // 验证真实姓名规则
    var checkRealName = (rule, value, callback) => {
      const realNameReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
      if (realNameReg.test(value)) return callback()
      return callback(new Error('请输入合法的真实姓名'))
    }
    // 验证身份证号规则
    var checkCardId = (rule, value, callback) => {
      const cardIdReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
      if (cardIdReg.test(value)) return callback()
      return callback(new Error('请输入合法的身份证号'))
    }
    return {
      // 上传图片设置token
      myheader: { Authorization: window.sessionStorage.getItem('token') },
      editForm: {
        userPic: '',
        userName: '',
        realName: '',
        cardId: '',
        email: '',
        mobile: '',
        sex: ''
      },
      editRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { validator: checkRealName, trigger: 'blur' }
        ],
        cardId: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { validator: checkCardId, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        sex: [{ required: true, message: '请选择性别' }]
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  computed: {
    imageUrl() {
      if (this.editForm.userPic === '') return ''
      return this.$http.defaults.baseURL + this.editForm.userPic
    }
  },
  methods: {
    // 获取用户信息
    // async getUserInfo() {
    //   const { data: res } = await this.$http.get('user')
    //   this.editForm = res.data
    //   console.log(this.editForm)
    // },
    getUserInfo() {
      this.$store
        .dispatch('getUserInfo')
        .then(success => {
          this.editForm = this.$store.state.userInfo
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    },
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      // console.log(res)
      this.editForm.userPic = res.data.file
    },
    // 上传图片前的验证
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 提交编辑用户数据
    editUserInfo() {
      this.$refs.editFormRef.validate(async vaild => {
        if (!vaild) return false
        const { data: res } = await this.$http.put('user', this.editForm)
        console.log(res)
        if (res.meta.status !== 200) this.$message.error(res.meta.msg)
        else {
          this.$message.success(res.meta.msg)
          this.getUserInfo()
          this.$router.go(0)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
