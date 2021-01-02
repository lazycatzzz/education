<template>
  <div class="content-frame">
    <el-card shadow="never">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文章</el-breadcrumb-item>
        <el-breadcrumb-item>{{ articleInfo.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <h3>{{ articleInfo.title }}</h3>
      <div>作者：{{ authorInfo.userName }}</div>
      <div>发布时间：{{ formatTime(articleInfo.create_time) }}</div>
      <div
        class="paragraph"
        v-for="(item, index) in articleInfo.content"
        :key="index"
      >
        {{ item }}
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.query.articleId,
      articleInfo: {},
      authorInfo: {}
    }
  },
  created() {
    this.getArticleInfo()
  },
  methods: {
    async getArticleInfo() {
      const { data: res } = await this.$http.get('article/' + this.id)
      if (res.meta.status !== 200) this.$message.error(res.meta.msg)
      else this.articleInfo = res.data
      var arr = this.articleInfo.content.split('\n')
      this.articleInfo.content = arr
      this.getAuthorInfo()
    },
    formatTime(timestr) {
      if (timestr === null || timestr === undefined) return
      return timestr.substr(0, 10)
    },
    async getAuthorInfo() {
      const { data: res } = await this.$http.get(
        'user/' + this.articleInfo.author_id
      )
      if (res.meta.status !== 200) this.$message.error(res.meta.msg)
      else this.authorInfo = res.data
    }
  }
}
</script>
<style lang="less" scoped>
.paragraph {
  text-indent: 2em;
  line-height: 2;
  letter-spacing: 1px;
}
</style>
