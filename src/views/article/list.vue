<template>
  <div class="app">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="articleList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="70" :show-overflow-tooltip="true" />
        <el-table-column prop="create_time" label="创建日期" width="150" :show-overflow-tooltip="true" />
        <el-table-column prop="update_time" label="修改日期" width="150" :show-overflow-tooltip="true" />
        <el-table-column prop="ip" label="IP" width="110" :show-overflow-tooltip="true" />
        <el-table-column prop="title" label="标题" width="130" :show-overflow-tooltip="true" />
        <el-table-column prop="intro" label="简介" :show-overflow-tooltip="true" />
        <el-table-column prop="content" label="内容" :show-overflow-tooltip="true" />
        <el-table-column label="操作" align="center" width="190">
          <template v-slot:default="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="editArticle(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete " @click="delArticle(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="changePage" :current-page="pageNumber" />
    </el-card>
  </div>
</template>

<script>
import { articleList, softDelete } from '@/api/article'

export default {
  data() {
    return {
      // 文章列表数据
      articleList: [],
      // 文章列表总条数
      total: 0,
      // 分页
      pageNumber: 1
    }
  },
  created() {
    this.fetchArticleList(0, this.pageNumber)
  },
  methods: {
    // 查询文章列表，每次10条，pageNumber代表页数, status代表文章显示与隐藏：0表示显示，1表示隐藏
    async fetchArticleList(status, pageNum) {
      const res = await articleList(status, pageNum)
      this.articleList = res.data
      this.total = res.total
    },
    // 修改文章
    editArticle(row) {
      this.$store.commit('editArticle', row)
      this.$router.push('/article/edit')
    },
    // 软删除文章
    delArticle(id) {
      this.$confirm(`将ID为 ${id} 的文章移入回收站, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await softDelete(id)
          if (res.code !== 1) return this.$message.error('软删除文章失败')
          this.$message.success('软删除文章成功')
          // 获取文章列表
          this.fetchArticleList(0, this.pageNumber)
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    // 分页
    changePage(pageNum) {
      this.pageNumber = pageNum
      this.fetchArticleList(0, this.pageNumber)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-pagination {
  float: right;
  margin: 15px;
}
</style>
