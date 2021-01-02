<template>
  <el-container>
    <el-header>
      <div class="logo">
        <h1>职业教育</h1>
      </div>
      <div class="search">
        <el-input
          v-model="searchKey"
          class="search_input"
          @keyup.enter.native="searchSth"
        >
          <el-select class="select_input" v-model="selectType" slot="prepend">
            <el-option label="课程" value="course"></el-option>
            <el-option label="文章" value="article"></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchSth"
          ></el-button>
        </el-input>
      </div>
      <div class="login_box">
        <div v-if="userInfo === null" @click="loginDialogShow">
          <span>登录</span>
          <span>注册</span>
        </div>
        <div v-else :userinfo="userInfo">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <img class="avatar" :src="imageUrl" alt="" />{{
                userInfo.userName
              }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="toUserInfo"
                >修改个人信息</el-dropdown-item
              >
              <el-dropdown-item
                v-if="userInfo.isteach !== 0"
                command="toTeachBox"
                >课程空间</el-dropdown-item
              >
              <el-dropdown-item command="loginout" divided
                >退出</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      userInfo: null,
      searchKey: '',
      selectType: 'course'
    }
  },
  computed: {
    imageUrl() {
      if (this.userInfo == null) return ''
      return this.$http.defaults.baseURL + this.userInfo.userPic
    }
  },
  created() {
    if (window.sessionStorage.getItem('token')) {
      this.$store
        .dispatch('getUserInfo')
        .then(success => {
          this.userInfo = this.$store.state.userInfo
          console.log(this.userInfo)
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    }
    // this.getUserInfo()
  },
  methods: {
    // 跳转到登录
    loginDialogShow() {
      this.$router.push('/loginbox')
    },
    // async getUserInfo() {
    //   if (window.sessionStorage.getItem('token')) {
    //     const { data: res } = await this.$http.get('/user')
    //     this.userInfo = res.data
    //   }
    // },
    // 跳转到编辑用户信息
    toUserInfo() {
      this.$router.push('/info')
    },
    // 跳转到教师页面
    toTeachBox() {
      this.$router.push('/teachbox')
    },
    // 登出
    loginout() {
      window.sessionStorage.clear()
      this.$store.commit('userClear')
      this.$router.push('/blank')
    },
    // 下拉菜单点击后对应事件
    handleCommand(command) {
      this[command]()
    },
    searchSth() {
      console.log(this.selectType)
      console.log(this.searchKey)
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  .search {
    width: 400px;
    position: relative;
    .search_input {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .select_input {
      width: 80px;
    }
  }
  .logo {
    flex: 1;
  }
  .login_box {
    flex: 1;
    cursor: pointer;
    div {
      float: right;
      padding: 0 10px;
    }
  }
}
.el-main {
  // 给header留位置
  margin-top: 60px;
  // 给footer留位置
  padding-bottom: 60px;
  background-color: #f7f7f7;
  height: 100%;
}
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.el-footer {
  position: absolute;
  bottom: 0;
  background-color: #333;
  width: 100%;
}
</style>
