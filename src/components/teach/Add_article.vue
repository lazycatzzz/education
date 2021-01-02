<template>
  <div>
    <el-form
      ref="addArticleRef"
      :model="addArticleForm"
      :rules="addArticleRules"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="addArticleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <el-input type="textarea" v-model="addArticleForm.content"></el-input>
      </el-form-item>
    </el-form>
    <button style="background-color:#70a1ff" @click="addArticle">
      发布
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addArticleForm: {},
      addArticleRules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    addArticle() {
      this.$refs.addArticleRef.validate(async vaild => {
        if (!vaild) return false
        const { data: res } = await this.$http.post(
          'article',
          this.addArticleForm
        )
        console.log(res)
      })
    }
  }
}
</script>
<style lang="less" scoped></style>
