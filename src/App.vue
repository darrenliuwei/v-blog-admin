<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

body {
  background: #f0f2f5;

  li {
    list-style: none;
  }
}

.el-card.is-always-shadow {
  margin-top: 15px;
  box-shadow: 0 1px 1px rgba(245, 161, 161, 0.15);
}

.el-pagination {
  float: right;
  margin: 20px;
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: pink;
}
</style>
