<template>
  <div>
    <h1>注册</h1>
    <el-form :model="addUserForm" :rules="addUserRules" ref="addUserFormRef">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="addUserForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addUserForm.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="addUserForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input v-model="addUserForm.repassword"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <button style="background-color:#70a1ff" @click="submitUser">注册</button>
      <button style="background-color:#a4b0be" @click="resetUser">重置</button>
    </div>
    <p class="back" @click="toLogin">&lt;-返回登录界面</p>
  </div>
</template>

<script>
export default {
  data() {
    // 验证密码规则
    var checkPassword = (rule, value, callback) => {
      if (this.addUserForm.password === value) return callback()
      else return callback(new Error('两次密码输入不一致'))
    }
    // 验证邮箱规则
    var checkEmail = (rule, value, callback) => {
      const emailReg = /^([a-zA-Z0-9-_])+@([a-zA-Z0-9-_])+(\.[a-zA-Z0-9-_])+/
      if (emailReg.test(value)) return callback()
      return callback(new Error('请输入合法的邮箱'))
    }
    var validEmail = async (rule, value, callback) => {
      var queryInfo = { email: value }
      const { data: res } = await this.$http.get('email', { params: queryInfo })
      console.log(res)
      if (res.meta.status !== 200) return callback(new Error(res.meta.msg))
      return callback()
    }
    return {
      addUserForm: {
        userName: '',
        password: '',
        repassword: '',
        email: ''
      },
      addUserRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
          { validator: validEmail, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitUser() {
      this.$refs.addUserFormRef.validate(async vaild => {
        if (!vaild) return false
        const { data: res } = await this.$http.post(
          'register',
          this.addUserForm
        )
        if (res.meta.status !== 200) this.$message.error('注册失败')
        else {
          this.$message.success('注册成功')
          this.$router.push('/login')
        }
      })
    },
    resetUser() {
      this.$refs.addUserFormRef.resetFields()
    },
    toLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background-color: #70a1ff;
}
.login_box {
  width: 500px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
}
h1 {
  margin: 0;
}
.el-divider {
  margin: 40px 0 24px;
}
.el-divider__text {
  color: #999;
}
.back {
  font-size: 12px;
  color: #70a1ff;
  cursor: pointer;
}
</style>
