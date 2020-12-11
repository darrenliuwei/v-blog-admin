<template>
  <div class="app">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="头像" />
      </div>
      <!-- 登录表单区域 -->
      <el-form class="login_form" :rules="loginFormRules" ref="loginFormRef" :model="loginForm">
        <!-- 用户名 -->
        <el-form-item prop="name">
          <el-input prefix-icon="el-icon-user" v-model="loginForm.name" @keyup.enter.native="doLogin"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="passwd">
          <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm.passwd" @keyup.enter.native="doLogin"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="doLogin">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { login } from '@/api/admin'

export default {
  data() {
    return {
      // 登录表单数据
      loginForm: {
        name: '',
        passwd: ''
      },
      // 表单验证规则
      loginFormRules: {
        // 验证用户名是否合法
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度需在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        passwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度需在 3 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // 如果已登录有token，就重定向到首页
    if (this.$store.state.token) {
      this.$router.replace('/')
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN', 'SET_USERNAME']),
    // 点击重置按钮，重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    // 登录
    doLogin() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const res = await login(this.loginForm)
        if (res.code === 2) {
          this.$message.error('登录失败')
        } else {
          this.$message.success('登录成功')
          // 如果登录成功，就将token存入到Vuex里
          this.SET_TOKEN(res.token)
          // 登录成功后跳转到后台首页
          this.$router.replace('/')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app {
  height: 100%;
  background-color: #2b4b6b;

  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      background-color: #fff;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }

    .login_form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;

      .btns {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
