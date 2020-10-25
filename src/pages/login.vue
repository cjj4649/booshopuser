<template>
  <div>
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>

    <el-form :model="formData" inline label-width="55px" >
      <el-form-item>
        <img src="../assets/用户名.png" style="vertical-align: middle;">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item>
         <img src="../assets/密码.png" style="vertical-align: middle;">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
    </el-form>
    <div class="register-btn">
      <router-link to="/register" style="text-decoration: none; color: black;">我要注册</router-link>
    </div>

    <el-button @click="loginClick" class="login-btn" type="primary" >登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
  </div>
</template>

<script>
import axios from 'axios'
import req from '@/api/login.js'
import qs from 'qs'
export default {
  name: 'login',
  data () {
    return {

      formData: {
        userName: '',
        password: ''
      }
    }
  },
  methods: {
    loginClick () {
      axios.defaults.headers.post['Content-Type'] = 'appliction/x-www-form-urlencoded'
      axios({

        method: 'post',
        url: 'http://a309200w30.goho.co/uaa/auth/form',
        data: qs.stringify(this.formData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        console.log(data)
        if (data.data.code === 0) {
          this.$message({
            type: 'success',
            message: data.data.msg
          })
          sessionStorage.setItem('userinfo', JSON.stringify(data.data.data))
          // this.$router.replace({path: '/home'})
          this.getuserinfo()
        } else {
          this.$message({
            type: 'error',
            message: data.data.msg
          })
        }
      })
    },
    getuserinfo () {
      req('getUser', {
        ...this.formData
      }).then(data => {
        sessionStorage.setItem('roleInfo', JSON.stringify(data.data))
        console.log('用户', data)
        if (data.data.role === '3') {
          this.$router.push({path: '/home'})
        } else if (data.data.role === '2') {
          this.$router.push({path: '/shop-order'})
        } else {
          this.$router.push({path: '/driver-index'})
        }
        console.log('data', data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 80%;
  margin: 0 auto;
  position: relative;
  top: 50px;

  img {
    width: 100%;
    vertical-align: middle;
  }
}

.el-form {
  margin-top: 100px;

  .el-form-item {
    width: 100%;
    text-align: center;
    margin: 0 auto;
  }
}

.register-btn {
  font-size: 14px;
  text-align: right;
  margin-right: 50px;
  text-decoration: none;
}

.login-btn {
  display: block;
  margin: 0 auto;
  width: 200px;
  height: 50px;
  color: white;
  background: #C39862;
  border-radius: 30px;
  font-size: 16px;
}
.el-input {
  width: 230px;
 outline: none;
  }
</style>
