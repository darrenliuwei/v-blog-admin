<template>
  <div class="app">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改文章</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-form label-width="55px" ref="addFormRef" :model="editArticle" :rules="rules">
        <el-form-item label="标题" required prop="title">
          <el-input placeholder="请输入文章标题" v-model="editArticle.title" clearable />
        </el-form-item>
        <el-form-item label="简介" required prop="intro">
          <div class="intro">
            <el-input type="textarea" :autosize="{ minRows: 3 }" placeholder="请输入文章简介" v-model="editArticle.intro" />
            <div class="mark" v-html="mdIntro"></div>
          </div>
        </el-form-item>
        <el-form-item label="内容" required prop="content">
          <div class="content">
            <el-input type="textarea" :autosize="{ minRows: 3 }" placeholder="请输入文章内容" v-model="editArticle.content" />
            <div class="mark" v-html="mdContent"></div>
          </div>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="doEditArticle(editArticle.id, editArticle)">修改文章</el-button>
          <el-button type="info" @click="cancelArticle">取消修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { editArticle } from '@/api/article.js'

export default {
  data() {
    return {
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        intro: [{ required: true, message: '请输入文章简介', trigger: 'blur' }],
        content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState(['editArticle']),
    // 文章简介markdown渲染后的数据
    mdIntro: function() {
      return this.$marked(this.editArticle.intro)
    },
    // 文章内容markdown渲染后的数据
    mdContent: function() {
      return this.$marked(this.editArticle.content)
    }
  },
  methods: {
    // 修改文章
    async doEditArticle(id, row) {
      const res = await editArticle(id, row)
      if (res.code !== 1) return this.$message.error(res.msg)
      this.$message.success('文章修改成功')
      this.$router.push('/article/list')
    },
    // 取消修改文章
    cancelArticle() {
      this.$message.info('已取消修改文章')
      this.$router.push('/article/list')
    }
  }
}
</script>

<style lang="scss" scoped>
.app {
  .intro,
  .content {
    display: flex;
    margin-top: 15px;

    .el-textarea {
      margin-right: 10px;
    }

    div {
      width: 50%;
      overflow-x: auto;
    }

    .mark {
      background-color: #f4f5f5;
    }
  }

  .btn {
    float: right;
    margin-bottom: 15px;
  }
}
</style>
