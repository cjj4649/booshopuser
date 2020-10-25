<template>
  <div>
    <div class="user">
        <div class="img-con">
            <img src="../../assets/head_pic.png" >
        </div>
        <div class="text-con">{{dirver.userName}}</div>
    </div>
    <div class="container">
        <div><img src="../../assets/u1210.png">{{dirver.userName}}师傅</div>
        <div><img src="../../assets/u1151.png">{{dirver.phone}}</div>
        </div>
    <div class="content">
        <div
          class="con-item"
          v-for="(item,index) in conList"
          :key="index"
          @click="toPage(item)">
            <div>
                <img :src="item.img1" alt="">
            </div>
            <div><span>{{item.label}}</span></div>
            <div>
                <img :src="item.img2" alt="">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mine',
  data () {
    return {
      dirver: {},
      list: [
        {
          userName: '张大大大',
          phone: '1234556767'
        }
      ],
      conList: [
        {
          img1: require('../../assets/修改密码.png'),
          label: '修改密码',
          img2: require('../../assets/右.png'),
          func: () => {
          },
          toPath: '/change-password'
        },
        {
          img1: require('../../assets/退出.png'),
          label: '退出登录',
          img2: require('../../assets/右.png'),
          func: () => {
            sessionStorage.clear('userInfo')
            sessionStorage.clear('roleInfo')
            sessionStorage.clear('currentComm')
            console.log('tuichu')
          },
          toPath: '/login'
        }
      ]
    }
  },
  mounted () {
    this.dirver = JSON.parse(sessionStorage.getItem('roleInfo'))
    console.log(this.dirver)
  },
  methods: {
    toPage (data) {
      this.$router.push({path: data.toPath})
      this.func = data.func()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
    div:first-child {
        line-height: 28px;
        img {
            margin-right: 10px;
            vertical-align: middle;
        }
    }
    div:nth-child(2) {
        line-height: 28px;
        img {
            margin-right: 10px;
            vertical-align: middle;
        }
    }
  padding-left: 50px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding-top: 10px;
  padding-bottom: 10px;
}
  .user {
      width: 100%;
      display: flex;
      .img-con {
          flex: 1;
          display: flex;
          align-items: center;
          img {
              width: 65px;
              height: 65px;
              position: relative;
              left: 38%;
          }
      }
      .text-con {
          flex: 2;
          line-height: 105px;
          font-size: 22px;
      }
  }
  .content {
      width: 95%;
      height: 120px;
      padding: 18px 16px;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background-color: white;
      border-radius: 8px;
      .con-item {
          width: 100%;
          flex: 1;
          display: flex;
          div:nth-child(1) {
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                  width: 14px;
                  height: 16px;
              }
          }
          div:nth-child(2) {
              flex: 1;
              line-height: 42.5px;
              font-size: 17px;
              span {
                  position: relative;
                  left: 10px;
              }
          }
          div:nth-child(3) {
              width: 10px;
              display: flex;
              align-items: center;
              img {
                  width: 100%;
                  height: 14px;
              }
          }
      }
  }
  .img-spc {
      width: 15px;
      height: 15px;
  }
</style>
