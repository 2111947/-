<template>
  <div class="register-container">
    <div class="register-box">
      <h2>注册</h2>
      <el-form :model="registerForm" :rules="rules" ref="registerForm">
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" prefix-icon="el-icon-lock" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input v-model="registerForm.confirmPassword" prefix-icon="el-icon-lock" type="password" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleRegister" style="width: 100%">注册</el-button>
        </el-form-item>
        <div class="tips">
          <span>已有账号？</span>
          <router-link to="/login">立即登录</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.$axios.post('/api/signup', {
            username: this.registerForm.username,
            password: this.registerForm.password
          }).then(res => {
            if (res.data.code === 0) {
              this.$message.success('注册成功')
              this.$router.push('/login')
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
.register-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f3f3f3;

  .register-box {
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