import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    courseList: null,
    articleList: null
  },
  mutations: {
    userParse(state, data, flag) {
      state.userInfo = data
    },
    userClear(state) {
      state.userInfo = null
    },
    courseParse(state, data) {
      state.courseList = data
    },
    articleParse(state, data) {
      state.articleList = data
    }
  },
  actions: {
    getUserInfo(ctx, flag) {
      return new Promise((resolve, reject) => {
        axios.get('user').then(result => {
          const { data: res } = result
          if (res.meta.status !== 200) {
            return reject(new Error(res.meta.msg))
          }
          ctx.commit('userParse', res.data, flag)
          return resolve(res)
        })
      })
    },
    getCourseList(ctx) {
      return new Promise((resolve, reject) => {
        axios.get('course').then(result => {
          const { data: res } = result
          if (res.meta.status !== 200) {
            return reject(new Error(res.meta.msg))
          }
          ctx.commit('courseParse', res.data)
          return resolve()
        })
      })
    },
    getArticleList(ctx) {
      return new Promise((resolve, reject) => {
        axios.get('article').then(result => {
          const { data: res } = result
          if (res.meta.status !== 200) {
            return reject(new Error(res.meta.msg))
          }
          ctx.commit('articleParse', res.data)
          return resolve()
        })
      })
    }
  },
  modules: {}
})
