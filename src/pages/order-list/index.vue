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
            <span>{{item.orderCode}}</span>
            <span>
                {{
                    item.orderStatus === '0' ? '已下单' :
                    item.orderStatus === '1' ? '已取消' :
                    item.orderStatus === '2' ? '已到货' :
                    item.orderStatus === '3' ? '已取货' :
                    item.orderStatus === '4' ? '已完成未评价' :
                    '已完成已评价'
                }}
            </span>
        </div>
        <div class="item-center" v-for="(childItem, index) in item.clientGoodsList" :key="index" >
            <div class="img-con">
                <img :src="childItem.goodsPicture" alt="">
            </div>
            <div class="text">
                <div class="text-con">
                    {{childItem.goodsName}}
                </div>
                <div class="props-con">
                    {{childItem.goodsIntroduction}}
                </div>
                <div class="price-con">
                    <span>￥</span>
                    <span>{{childItem.goodsPrice}} &nbsp;</span>
                    <span>x{{childItem.clientGoodsNum}}</span>
                </div>
            </div>
        </div>
        <div class="item-bottom">
            <span>共{{item.goodsCount}}件商品，合计￥</span>
            <span>{{item.orderPrice}}</span>
        </div>
          <div
              class="btn"
              @click.stop="changeOrderStatus(item, '1')"
              v-show="item.orderStatus === '0' || item.orderStatus === '2' || item.orderStatus === '3'">
                <span>取消订单</span>
            </div>
            <div class="btn" @click.stop="evaluate(item)" v-show="item.orderStatus === '4'">
                <span>评价</span>
            </div>
            <div class="btn" @click.stop="changeOrderStatus(item, '4')" v-show="item.orderStatus === '3'">
                <span>确认收货</span>
            </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/order-list.js'
export default {
  name: 'order-list',
  data () {
    return {
      orderType: 'all',
      list: [
      ]
    }
  },
  mounted () {
    this.getOrderList()
  },
  methods: {
    getOrderList (orderStatus = '0', type) {
      let data = {
        orderStatus: orderStatus,
        pageSize: 100,
        pageNum: 1
      }
      if (!orderStatus) {
        delete data.orderStatus
      }
      this.orderType = type
      // if (JSON.parse(sessionStorage.getItem('roleInfo')).role === '3') {
      req('listOrder', {
        ...data
      }).then(data => {
        console.log(data)
        if (data.code === 0) {
          this.list = data.data.list
          console.log(this.list)
        } else {
          this.$message.info(data.msg)
        }
      })
    //    else {
    //     req('getShopOrderList', {
    //       ...data
    //     }).then(data => {
    //       console.log(data)
    //       if (data.code === 0) {
    //         this.list = data.data.list
    //       } else {
    //         this.$message.info(data.msg)
    //       }
    //     })
    //   }
    },
    toPage (data) {
      console.log('路哟', data)
      this.$router.push({path: '/order-detail', query: data})
    },
    evaluate (data) {
      console.log(data)
      this.$router.push({path: '/order-evaluate', query: data})
    },
    changeOrderStatus (item, changeStatus) {
      this.$confirm('确定进行该操作吗?').then(() => {
        req('updateOrderStatus', {orderCode: item.orderCode, orderStatus: changeStatus, version: item.version}).then(data => {
          if (data.code === 0) {
            this.$message.success(data.msg)

            this.getOrderList('', this.orderType)
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
 .btn {
              width: 92px;
              height: 28px;
              border-radius: 20px;
              position: relative;
              border: 1.5px solid rgb(195,152,98);
              margin-left: auto;
              margin-top: 10px;
              margin-bottom: 6px;
              line-height: 28px;
              display: flex;
              align-items: center;
              justify-content: center;
              span:first-child {
                color: rgb(195,152,98);
              }
 }
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
