<template>
    <div>
        <div class="container" v-for="item of userlist" :key="item.id">
            <div><img src="../../assets/home2.png">{{item.storeCode}}</div>
            <div><span>门店:</span>{{item.storeName}}</div>
            <div><span>地址:</span>{{item.address}}</div>
            <div><span>店长:</span>{{item.userName}}</div>
            <div><span>手机:</span>{{item.phone}}</div>
        </div>
    </div>
</template>
<script>
import req from '@/api/dirverindex.js'

export default {
  data () {
    return {
      userlist: [
        {
          // id: '001',
          // storeId: '2232535343245',
          // storeName: '新华书店',
          // address: 'xxx路xxxxxx巷9号',
          // managerName: '紫罗兰',
          // phone: '2341255123'
        }
      ]
    }
  },
  mounted () {
    this.getlist()
  },
  methods: {
    getlist () {
      req('listDriverStores', {}).then(data => {
        console.log('司机', data)
        this.userlist = data.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  margin-top: 10px;
  div:first-child {
    margin-left: 30px;
    img {
      width: 18px;
      height: 18px;
      margin-right: 13px;
    }
  }
  div:nth-child(2) {
    span {
      margin-right: 10px;
    }
    margin-top: 20px;
    margin-left: 40px;
  }
  div:nth-child(3) {
    span {
      margin-right: 10px;
    }
    margin-top: 3px;
    margin-left: 40px;
  }
  div:nth-child(4) {
    span {
      margin-right: 10px;
    }
    border-top: 1px solid #ddd;
    padding-bottom: 10px;
    padding-top: 10px;
    margin-top: 13px;
    margin-left: 40px;
  }
  div:nth-child(5) {
    span {
      margin-right: 10px;
    }
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-top: 3px;
    margin-left: 40px;
  }
}
</style>
