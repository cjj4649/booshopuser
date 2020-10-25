<template>
    <div>
      <div class="container" v-for="(item, index) in list" :key="index">
        <div><img src="../../assets/u1210.png">{{item.userName}}</div>
        <div><img src="../../assets/u1210.png">{{item.phone}}</div>
        </div>
    </div>
</template>
<script>
import req from '@/api/shop.js'
export default {
  data () {
    return {
      list: [
      ]
    }
  },
  mounted () {
    this.getlist()
  },
  methods: {
    getlist () {
      req('listManangerDrivers', {}).then(data => {
        console.log('店长司机', data)
        this.list = data.data
      })
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
 margin: 0 auto;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
