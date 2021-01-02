import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import LoginBox from '../components/LoginBox.vue'
import Register from '../components/login/Register.vue'
import Login from '../components/login/Login.vue'
import Info from '../components/user/Info.vue'
import Blank from '../components/Blank.vue'
import Course from '../components/teach/Course.vue'
import CourseAdd from '../components/teach/Add_course.vue'
import TeachBox from '../components/TeachBox.vue'
import Article from '../components/teach/Article.vue'
import ArticleAdd from '../components/teach/Add_article.vue'
import DetailCourse from '../components/teach/Detail_course.vue'
import DetailArticle from '../components/teach/Detail_article.vue'
import Search from '../components/Search.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/blank', component: Blank },
  {
    path: '/home',
    component: Home,
    children: [
      { path: '/info', component: Info, meta: { requiresAuth: true } },
      { path: '/courseDetail', component: DetailCourse },
      { path: '/courseArticle', component: DetailArticle },
      { path: '/search', component: Search },
      {
        path: '/teachbox',
        component: TeachBox,
        redirect: '/course',
        children: [
          { path: '/course', component: Course },
          { path: '/course_add', component: CourseAdd },
          { path: '/article', component: Article },
          { path: '/article_add', component: ArticleAdd }
        ]
      }
    ]
  },
  {
    path: '/loginbox',
    component: LoginBox,
    redirect: '/login',
    children: [
      { path: '/register', component: Register },
      { path: '/login', component: Login }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 获取token
  const token = window.sessionStorage.getItem('token')
  // 判断是否有token并且页面是否需要token验证
  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    (!token || token === null)
  ) {
    next('/loginbox')
  } else {
    next()
  }
})
export default router
