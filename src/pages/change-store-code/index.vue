  <template>
  <div>
     <el-header height="50px">
        <div class="user-info" >
          <span class="iconfont iconzuojiantou" @click="back"></span>
          <span>修改邀请码</span>

        </div>
      </el-header>
    <div class="content">
        <div class="con-left">新邀请码</div>
        <input type="text" v-model="storeCode" placeholder="请输入邀请码">
    </div>
    <div class="btn" @click="changeStoreCode">
        <img src="../../assets/按钮.png" >
        <span>确认</span>
    </div>
  </div>
</template>

<script>
import req from '@/api/changecode.js'
export default {
  name: 'change-store-code',
  data () {
    return {
      storeCode: ''
    }
  },
  mounted () {
    this.role = JSON.parse(sessionStorage.getItem('roleInfo')).role
  },
  methods: {
    back () {
      if (this.role === '3') {
        this.$router.push({path: '/mine'})
      } else if (this.role === '4') {
        this.$router.push({path: '/shop-mine'})
      } else if (this.role === '2') {
        this.$router.push({path: '/driver-mine'})
      }
    },
    changeStoreCode () {
      if (!this.storeCode) {
        this.$message.info('请先输入邀请码')
        return
      }
      req('updateClientInvite', {inviteCode: this.storeCode}).then(data => {
        if (data.code === 0) {
          this.$message.success(data.msg + ', 请重新登陆')
          setTimeout(() => {
            sessionStorage.clear('userInfo')
            sessionStorage.clear('roleInfo')
            sessionStorage.clear('currentComm')
            this.$router.push({path: '/login'})
          })
        } else {
          this.$message.error(data.msg)
        }
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
  .content {
      width: 95%;
      margin: 12px auto;
      background-color: white;
      display: flex;
      border-radius: 8px;
      font-size: 17px;
      .con-left {
          flex: 1;
          line-height: 90px;
          text-align: center;
      }
      input {
          flex: 2;
          line-height: 90px;
          border: none;
          outline: none;
          padding-left: 20px;
          box-sizing: border-box;
          font-size: 17px;
          color: rgb(168,168,168);
          &::placeholder {
              color: rgb(168,168,168)
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
