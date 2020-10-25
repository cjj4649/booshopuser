<template>
  <div>
    <div class="leader">
        <ul>
            <li :class="{active: this.orderType === 'all'}" @click="getOrderList('', 'all')">全部订单</li>
            <li :class="{active: this.orderType === 'payed'}" @click="getOrderList('0', 'payed')">已付款</li>
            <li :class="{active: this.orderType === 'pickup'}" @click="getOrderList('2', 'pickup')">待取货</li>
            <li :class="{active: this.orderType === 'confirm'}" @click="getOrderList('4', 'confirm')">已完成</li>
        </ul>
    </div>
    <div class="order-item" v-for="item of list" :key="item.id" @click="toPage(item)">
        <div class="item-top">
            <img src="../../assets/我的订单.png" alt="">
            <span>{{item.goodsCode}}</span>
            <span>{{
                    item.orderStatus === '0' ? '已下单' :
                    item.orderStatus === '1' ? '已取消' :
                    item.orderStatus === '2' ? '已到货' :
                    item.orderStatus === '3' ? '已取货' :
                    item.orderStatus === '4' ? '已完成未评价' :
                    '已完成已评价'
                }}</span>
        </div>
        <div class="item-center">
            <div class="img-con">
                <img :src="item.goodsPicture" alt="">
            </div>
            <div class="text">
                <div class="text-con">
                    {{item.goodsIntroduction}}
                </div>
                <div class="price-con">
                    <span>￥</span>
                    <span>{{item.goodsPrice}} &nbsp;</span>
                    <span>x{{item.goodsCount}}</span>
                </div>
            </div>
        </div>
        <div class="item-bottom">
            <div>
                <span><img src="../../assets/u1056.png">{{item.userName}}</span>
                <span><img src="../../assets/u1060.png">{{item.phone}}</span>
                </div>
            <span>共{{item.goodsCount}}件商品，合计￥</span>
            <span>{{item.goodsPrice}}</span>
        </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/shop.js'
export default {
  name: 'order-list',
  data () {
    return {
      orderType: 'all',
      list: [
        // {
        //   id: '001',
        //   orderNum: '2020020713270034',
        //   orderStatus: '待取货',
        //   adv: '一生自在季羡林的自在智慧（午静携侣寻野菜，黄昏抱猫看夕阳！金庸、贾平凹...）',
        //   img: require('../../assets/book1.jpg'),
        //   prop: '重量：0.32kg 系列：一生自在系列',
        //   price: '42.80',
        //   number: '1',
        //   count: '42.80',
        //   name: '张一山',
        //   phone: '12345678'
        // }
      ]
    }
  },
  mounted () {
    this.getlist()
  },
  methods: {
    getOrderList (orderStatus = '', type) {
      let data = {
        orderStatus: orderStatus,
        pageSize: 100,
        pageNum: 1
      }
      if (!orderStatus) {
        delete data.orderStatus
      }
      this.orderType = type
      req('listManagerOrders', {
        ...data
      }).then(data => {
        console.log(data)
        if (data.code === 0) {
          this.list = data.data.list
        } else {
          this.$message.info(data.msg)
        }
      })
    },
    toPage (data) {
      this.$router.push({path: '/shop-order-details', query: data})
    },
    evaluate (data) {
      console.log('路由', data)
      this.$router.push({path: '/order-evaluate'})
    },
    getlist () {
      req('listManagerOrders', {}).then(data => {
        console.log('店长订单', data)
        this.list = data.data.list
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .leader {
      height: 64px;
      width: 100%;
      ul {
          height: 100%;
          padding: 0 0 0 2.5%;
          margin: 0;
          display: flex;
          li {
              line-height: 64px;
              padding: 0;
              margin: 0;
              list-style: none;
              padding: 0 13px;
              font-size: 15px;
          }
          .active {
              font-size: 17px;
              color: rgb(195,152,98);
          }
      }
  }
  .order-item {
      width: 95%;
      margin: 0 auto 12px;
      background-color: white;
      border-radius: 8px;
      padding: 10px 15px;
      box-sizing: border-box;
      .item-top {
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;
          img {
              width: 13px;
              height: 16px;
          }
          span:nth-child(2) {
              font-size: 16px;
              flex: 1;
              line-height: 38px;
              position: relative;
              left: 8px;
          }
          span:nth-child(3) {
              position: absolute;
              right: 0;
              font-size: 13px;
              color: rgb(195,152,98);
          }
      }
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
                  height: 84px;
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
          div:first-child {
              text-align: left;
              display: flex;
              align-items: center;
          span:nth-child(1) {
              font-size: 15px;
              line-height: 40px;
              img {
                  vertical-align: middle;
              }
          }
          span:nth-child(2) {
              font-size: 15px;
              margin-left: 30px;
              img {
                  vertical-align: middle;
              }
          }
      }
      }
      .item-more {
          width: 100%;
          display: flex;
          .btn {
              width: 92px;
              height: 28px;
              border-radius: 20px;
              position: relative;
              border: 1.5px solid rgb(195,152,98);
              margin-left: auto;
              margin-top: 10px;
              margin-bottom: 6px;
              span {
                  font-size: 15px;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  margin-top: -10.4px;
                  margin-left: -16px;
                  color: rgb(195,152,98);
              }
          }
      }
  }
</style>
