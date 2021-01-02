<template>
  <div>
    <h1>登录</h1>
    <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef">
      <el-form-item prop="email">
        <el-input
          v-model="loginForm.email"
          prefix-icon="el-icon-message"
          placeholder="邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          prefix-icon="el-icon-lock"
          placeholder="密码"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
    <p class="regis" @click="toRegister">还没有账号?去注册-></p>
    <div>
      <button style="background-color:#70a1ff" @click="loginRequest">
        登录
      </button>
      <button style="background-color:#a4b0be" @click="loginReset">重置</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    // 验证邮箱规则
    var checkEmail = (rule, value, callback) => {
      const emailReg = /^([a-zA-Z0-9-_])+@([a-zA-Z0-9-_])+(\.[a-zA-Z0-9-_])+/
      if (emailReg.test(value)) return callback()
      return callback(new Error('请输入合法的邮箱'))
    }
    return {
      searchKey: '',
      loginDialogVisible: false,
      loginForm: {
        email: '123@qq.com',
        password: '123123'
      },
      loginRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {},
  methods: {
    loginRequest() {
      this.$refs.loginFormRef.validate(async vaild => {
        if (!vaild) return false
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) {
          console.log(res)
          this.$message.error('登录失败，' + res.meta.msg)
        } else {
          console.log(res)
          window.sessionStorage.setItem('token', res.data.token)
          this.$message.success('登录成功')
          this.$router.push('/')
        }
      })
    },
    toRegister() {
      this.$router.push('/register')
    },
    loginReset() {
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
.regis {
  float: right;
  font-size: 12px;
  margin-top: 0;
  color: #70a1ff;
  cursor: pointer;
}
</style>
