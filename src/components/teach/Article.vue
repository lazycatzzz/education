<template>
  <div>
    <el-card @click.native="toArticleAdd">添加文章</el-card>
    <el-card
      v-for="item in articleList"
      :key="item.id"
      :body-style="{ padding: '10px' }"
      shadow="hover"
      @click.native="toArticleDetail(item.id)"
    >
      <div>
        <div>{{ item.title }}</div>
        <div>
          <div>{{ formatTime(item.create_time) }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      articleList: []
    }
  },
  created() {
    this.getCourseList()
  },
  methods: {
    toArticleAdd() {
      this.$router.push('/article_add')
    },
    getCourseList() {
      this.$store
        .dispatch('getArticleList')
        .then(success => {
          this.articleList = this.$store.state.articleList
          console.log(this.articleList)
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    },
    toArticleDetail(id) {
      this.$router.push({
        path: 'courseArticle',
        query: { articleId: id }
      })
    },
    formatTime(timestr) {
      return timestr.substr(0, 10)
    }
  }
}
</script>
<style lang="less" scoped></style>
