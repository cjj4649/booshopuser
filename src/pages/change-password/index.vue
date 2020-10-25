<template>
  <div>
    <el-header height="50px">
        <div class="user-info">
          <span class="iconfont iconzuojiantou" @click="back"></span>
          <span>修改密码</span>

        </div>
      </el-header>
    <div class="pwd-con">
        <div class="pwd-item">
            <div class="item-left">原密码</div>
            <input type="password" v-model="userPwd" placeholder="请输入原密码">
        </div>
        <div class="pwd-item">
            <div class="item-left">新密码</div>
            <input type="password" v-model="userNewPwd" placeholder="请输入新密码">
        </div>
        <div class="pwd-item">
            <div class="item-left">确认新密码</div>
            <input type="password" v-model="userNewConfirmPassword" placeholder="请再次输入新密码">
        </div>
    </div>
    <div class="btn">
        <img src="../../assets/按钮.png" >
        <span @click="submit">确认</span>
    </div>
  </div>
</template>

<script>
import req from '@/api/changepassword.js'
export default {
  name: 'change-password',
  data () {
    return {
      userPwd: '',
      userNewPwd: '',
      userNewConfirmPassword: '',
      role: ''
    }
  },
  mounted () {
    this.role = JSON.parse(sessionStorage.getItem('roleInfo')).role
  },
  methods: {
    back () {
      if (this.role === '3') {
        this.$router.push({path: '/mine'})
      } else if (this.role === '2') {
        this.$router.push({path: '/shop-mine'})
      } else if (this.role === '4') {
        this.$router.push({path: '/driver-mine'})
      }
    },
    submit () {
      if (!this.userPwd) {
        this.$message.info('请输入原密码')
        return
      }
      if (!this.userNewPwd) {
        this.$message.info('请输入新密码')
        return
      }
      if (!this.userNewConfirmPassword) {
        this.$message.info('请确认新密码')
        return
      }
      if (this.userNewPwd !== this.userNewConfirmPassword) {
        this.$message.info('两次输入的密码不一致')
        return
      }
      req('updateUserPwd', {
        userPwd: this.userPwd,
        userNewPwd: this.userNewPwd
      }).then(data => {
        if (data.code === 0) {
          this.$message.success(data.msg)
          sessionStorage.clear('userInfo')
          sessionStorage.clear('roleInfo')
          sessionStorage.clear('currentComm')
          this.$router.push('/login')
        } else {
          this.$message.error(data.msg)
        }
        console.log(data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(242,242,242);

  .router-link-active {
    font-size: 25px;
    color: #409EFF;
    text-decoration: none;
  }

  .user-info {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    font-size: 20px;
    width: 100%;

    .iconzuojiantou {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translate(0, -50%);
    }

    span {
      margin: 0 10px;
    }

    .active {
      color: #C39862;
    }
  }
}
  .pwd-con {
      width: 95%;
      height: 160px;
      margin: 12px auto;
      background-color: white;
      padding: 12px 24px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      border-radius: 8px;
      .pwd-item {
          flex: 1;
          width: 100%;
          display: flex;
          line-height: 45.34px;
          .item-left {
              flex: 1;
              font-size: 17px;
          }
          input {
              flex: 2;
              border: none;
              outline: none;
              font-size: 17px;
              color: rgb(168,168,168);
              &::placeholder {
                  color: rgb(168,168,168);
              }
          }
      }
  }
  .btn {
      width: 300px;
      height: 65px;
      position: absolute;
      left: 50%;
      margin-left: -150px;
      bottom: 80px;
      img {
          width: 100%;
      }
      span {
          font-size: 22px;
          color: white;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -14.4px;
          margin-left: -22px;
      }
  }
</style>
