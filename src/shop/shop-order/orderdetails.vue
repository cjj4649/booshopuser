<template>
  <div>
    <div class="content">
        <div class="con-top">
            <div>
                <div class="top-img-con">
                    <img src="../../assets/卡车.png" style="width: 18px">
                    &nbsp;
                    <span>{{list.address}}</span>
                    <br>
                    <img src='../../assets/position2.png' style="width: 13px; position: relative;left: 3px; margin-right: 5px;">
                    &nbsp;
                    <span>{{list.storeName}}</span>
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div class="order-item" v-for="item of list.manangerGoodsList" :key="item.id">
            <div class="item-center">
                <div class="img-con">
                    <img :src="item.goodsPicture">
                </div>
                <div class="text">
                    <div class="text-con">{{item.goodsName}}</div>
                    <div class="props-con">{{item.goodsIntroduction}}</div>
                    <div class="price-con">
                        <span>￥</span>
                        <span>{{item.goodsPrice}} </span>
                        <span>x{{item.clientGoodsNum}}</span>
                    </div>
                </div>
            </div>
             <div class="userinfo">
        <div><img src="../../assets/u1151.png">{{list.phone}}</div>
        <div><img src="../../assets/u1157.png">{{list.userName}}</div>
    </div>
            <div class="item-bottom" >
                <span>共{{list.goodsCount}}件商品，合计￥</span>
                <span>{{list.orderPrice}}</span>
            </div>
        </div>
    </div>
    <div class="order-msg">
        <ul>
            <li>订单信息</li>
            <li>订单编号：</li>
            <li>创建时间：</li>
            <li>订单状态：</li>
        </ul>
        <ul>
            <li></li>
            <li>{{list.orderCode}}</li>
            <li>{{list.createTime}}</li>
            <li class="active">{{orderType}}</li>
        </ul>
    </div>
    <div class="btn-footer">
        <div
              class="el-button"
              @click.stop="changeOrderStatus('1')"
              v-show="this.$route.query.orderStatus === '0' || this.$route.query.orderStatus === '2'">
                取消订单
            </div>
            <div class="el-button" @click.stop="changeOrderStatus('2')" v-show="this.$route.query.orderStatus === '0'">
                确认到货
            </div>
            <div class="el-button" @click.stop="changeOrderStatus('0')" v-show="this.$route.query.orderStatus === '2'">
                取消到货
            </div>
            <div class="el-button" @click.stop="changeOrderStatus('3')" v-show="this.$route.query.orderStatus === '2'">
                确认取货
            </div>
            <div class="el-button" @click.stop="changeOrderStatus('2')" v-show="this.$route.query.orderStatus === '3'">
                 取消取货
            </div>
            </div>
    </div>
</template>

<script>
import req from '@/api/shop.js'
export default {
  name: 'order-detail',
  data () {
    return {
      list: {},
      topList: [
        {
          id: '001',
          img: require('../../assets/卡车.png'),
          width: '18px',
          text: '取货门店：新华书店（新街口店）'
        }, {
          id: '002',
          img: require('../../assets/position2.png'),
          width: '13px',
          text: '取货门店：新华书店（新街口店）'
        }
      ],
      orderList: [
        // {
        //   id: '001',
        //   adv: '一生自在季羡林的自在智慧（午静携侣寻野菜，黄昏抱猫看夕阳！金庸、贾平凹...）',
        //   img: require('../../assets/book1.jpg'),
        //   prop: '重量：0.32kg 系列：一生自在系列',
        //   price: '42.80',
        //   number: '1',
        //   count: '42.80'
        // }
      ],
      msgList: [
        // '2020020713270034',
        // '2020-02-11 11:54:01',
        // '待取货'
      ],
      userinfo: [
        // {
        //   id: '001',
        //   name: '马叔叔',
        //   phone: '123454533'
        // }
      ]
    }
  },
  mounted () {
    this.getlist()
  },
  computed: {
    userType () {
      return JSON.parse(sessionStorage.getItem('roleInfo')).role
    },
    orderType () {
      if (this.list.orderStatus === '0') {
        return '已下单'
      } else if (this.list.orderStatus === '1') {
        return '已取消'
      } else if (this.list.orderStatus === '2') {
        return '已到货'
      } else if (this.list.orderStatus === '3') {
        return '已取货'
      } else if (this.list.orderStatus === '4') {
        return '已完成未评价'
      } else {
        return '已完成已评价'
      }
    }
  },
  methods: {
    changeOrderStatus (changeStatus) {
      this.$confirm('确定进行该操作吗?').then(() => {
        req('updateManangerOrderStatus', {orderCode: this.$route.query.orderCode, orderStatus: changeStatus, version: this.$route.query.version}).then(data => {
          if (data.code === 0) {
            this.$message.success(data.msg)
            this.getlist('', this.orderType)
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    },
    getlist () {
      req('listManagerOrderDeepen', {orderCode: this.$route.query.orderCode}).then(data => {
        console.log('店长订单', data)
        this.list = data.data[0]
        console.log('店长订单', this.list)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
 .btn-footer {
     width: 100%;
     height: 45px;
     position:fixed;
     bottom: 0;
     display: flex;
     justify-content: flex-end;
     align-items: center;
     background: #f2f2f2;
          .el-button {
              height: 33px;
              width: 100px;
              margin-right: 20px;
            border-radius: 150px;
            background: #ff0000;
            color: white;
          }
      }
  .content {
      width: 95%;
      margin: 12px auto 12px;
      background-color: white;
      border-radius: 8px;
      padding: 13px 13px 0;
      box-sizing: border-box;
      .userinfo {
          div:first-child {
            display: flex;
            align-items: center;
            border-top: 1px solid #ddd;
            margin-top: 10px;
            padding-top: 10px;
            img {
                margin-right: 10px;
            }
          }
          div:nth-child(2) {
            display: flex;
            align-items: center;
            padding-bottom: 10px;
            padding-top: 5px;
             border-bottom: 1px solid #ddd;
            img {
                margin-left: 3px;
                margin-right: 10px;
            }
          }
      }
      .con-top {
          width: 100%;
          .top-item {
              display: flex;
              padding: 5px 0 22px;
              .top-img-con {
                  width: 30px;
                  text-align: center;
              }
              span {
                  font-size: 15px;
              }
          }
      }
      .line {
          width: 100%;
          height: 1px;
          background-color: rgb(204,204,204);
          margin: 5px 0;
      }
      .order-item {
          width: 95%;
          margin: 0 auto;
          background-color: white;
          border-radius: 8px;
          padding: 10px 15px;
          box-sizing: border-box;
          .item-center {
              width: 100%;
              display: flex;
              box-sizing: border-box;
              padding-top: 5px;
              .img-con {
                  flex: 1;
                  text-align: center;
                  img {
                      width: 84px;
                  }
              }
              .text {
                  flex: 2.2;
                  .text-con {
                      font-size: 15px;
                      line-height: 22px;
                      overflow : hidden;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-line-clamp: 2;
                      -webkit-box-orient: vertical;
                  }
                  .props-con {
                      font-size: 13.5px;
                      line-height: 26px;
                      color: rgb(168,168,168);
                  }
                  .price-con {
                      text-align: right;
                      line-height: 26px;
                      span:nth-child(1) {
                          font-size: 11px;
                          color: rgb(242,0,0);
                      }
                      span:nth-child(2) {
                          font-size: 16px;
                          color: rgb(242,0,0);
                      }
                      span:nth-child(3) {
                          font-size: 11px;
                          color: rgb(168,168,168);
                      }
                  }
              }
          }
          .item-bottom {
              width: 100%;
              line-height: 40px;
              text-align: right;
              padding-top: 5px;
              span:nth-child(1) {
                  font-size: 15px;
              }
              span:nth-child(2) {
                  font-size: 20px;
              }
          }
      }
  }
  .order-msg {
      width: 95%;
      background-color: white;
      box-sizing: border-box;
      padding: 8px 0 12px;
      margin: 0 auto;
      display: flex;
      border-radius: 8px;
      ul:nth-child(1) {
          margin: 0;
          padding: 0;
          flex: 1;
          li:nth-child(1) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 16.5px;
              font-weight: bold;
              line-height: 42px;
          }
          li:nth-child(2) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(3) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(4) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
      }
      ul:nth-child(2) {
          margin: 0;
          padding: 0;
          flex: 2;
          li:nth-child(1) {
              margin: 0;
              padding: 0;
              list-style: none;
              height: 42px;
          }
          li:nth-child(2) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(3) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(4) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          .active {
              color: rgb(195,152,98);
          }
      }
  }
</style>
