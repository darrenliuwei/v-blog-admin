<template>
  <div class="app">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加文章</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-form label-width="55px" ref="addFormRef" :model="form" :rules="rules">
        <el-form-item label="标题" required prop="title">
          <el-input placeholder="请输入文章标题" v-model="form.title" clearable />
        </el-form-item>
        <el-form-item label="简介" required prop="intro">
          <div class="intro">
            <el-input type="textarea" :autosize="{ minRows: 3 }" placeholder="请输入文章简介" v-model="form.intro" />
            <div class="mark" v-html="mdIntro"></div>
          </div>
        </el-form-item>
        <el-form-item label="内容" required prop="content">
          <div class="content">
            <el-input type="textarea" :autosize="{ minRows: 3 }" placeholder="请输入文章内容" v-model="form.content" />
            <div class="mark" v-html="mdContent"></div>
          </div>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="doAddArticle">发表文章</el-button>
          <el-button type="info" @click="doSaveArticle">暂存文章</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addArticle } from '@/api/article'

export default {
  data() {
    return {
      form: { title: '', intro: '', content: '' },
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
    // 文章简介markdown渲染后的数据
    mdIntro: function() {
      return this.$marked(this.form.intro)
    },
    // 文章内容markdown渲染后的数据
    mdContent: function() {
      return this.$marked(this.form.content)
    }
  },
  methods: {
    // 发表文章
    async doAddArticle() {
      this.$refs.addFormRef.validate(async valid => {
        // 只有表单验证成功之后，才可以添加文章
        if (valid) {
          const res = await addArticle(this.form)
          if (res.code !== 1) return this.$message.error('发表文章失败: ' + res.msg)
          this.$message.success('发表文章成功')
          // 跳转到文章列表
          this.$router.push('/article/list')
        }
      })
    },
    // 暂存文章
    doSaveArticle() {
      this.$refs.addFormRef.validate(async valid => {
        // 只有表单验证成功之后，才可以添加文章
        if (valid) {
          this.form.status = 1
          const res = await addArticle(this.form)
          if (res.code !== 1) return this.$message.error('暂存文章失败')
          this.$message.success('暂存文章成功')
          // 跳转到文章回收站
          this.$router.push('/article/recycle')
        }
      })
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
