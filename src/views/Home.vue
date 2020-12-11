<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <el-menu router :default-active="this.$route.path" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="/dashboard">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item index="/article/list">
              <i class="el-icon-tickets"></i>
              <span>文章列表</span>
            </el-menu-item>
            <el-menu-item index="/article/add">
              <i class="el-icon-edit-outline"></i>
              <span>添加文章</span>
            </el-menu-item>
            <el-menu-item index="/article/recycle">
              <i class="el-icon-delete"></i>
              <span>文章回收站</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.el-container {
  min-height: 100vh;

  .el-aside {
    .el-menu {
      height: 100%;
      border-right: none;
    }
  }

  .el-main {
    background-color: #e9eef3;
  }
}
</style>
