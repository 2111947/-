<template>
  <div class="login-container">
    <div class="login-box">
      <h2>登录</h2>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" style="width: 100%">登录</el-button>
        </el-form-item>
        <div class="tips">
          <span>还没有账号？</span>
          <router-link to="/register">立即注册</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 这里调用mock接口
          this.$axios.post('/api/login', this.loginForm).then(res => {
            if (res.data.code === 0) {
              this.$message.success('登录成功')
              localStorage.setItem('token', res.data.token)
              localStorage.setItem('username', res.data.username)

              this.$router.push('/')
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f3f3f3;

  .login-box {
    width: 400px;
    padding: 30px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);

    h2 {
      text-align: center;
      margin-bottom: 30px;
    }

    .tips {
      text-align: center;
      font-size: 14px;
      color: #666;
      
      a {
        color: #409EFF;
        margin-left: 10px;
      }
    }
  }
}
</style> 