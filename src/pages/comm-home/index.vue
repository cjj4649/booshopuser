<template>
  <div class="container">
    <div class="banner-pic-list">
      <el-carousel height="200px" indicator-position="none">
        <el-carousel-item v-for="(item, index) in picList" :key="index">
          <img :src="item.picturePath" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="module-title">热门商品</div>

    <ul class="comm-list">
      <li
        v-for="(item, index) in commList"
        :key="index"
        @click="toDetailPage(item)">
        <img :src="item.goodsPicture" alt="">
        <div class="book-info">{{item.goodsName}}</div>
        <div>${{item.goodsPrice}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/comm-home.js'

export default {
  name: 'comm-home',
  data () {
    return {
      picList: [
      ],
      commList: [

      ]
    }
  },
  mounted () {
    this.getcommList()
    this.getpicList()
  },
  methods: {
    toDetailPage (data) {
      console.log(data)
      sessionStorage.setItem('currentComm', JSON.stringify(data))

      this.$router.push({path: '/comm-detail'})
    },
    // 轮播图
    getpicList () {
      req('listRotationCharHome', {}).then(data => {
        console.log(data)
        this.picList = data.data
        console.log('piclisst', this.picList)
      })
    },
    // 热门商品
    getcommList () {
      req('listhotGoods', {}).then(data => {
        this.commList = data.data.list
        console.log(data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #ececec;
}

.el-carousel {
  .el-carousel__container {
    .el-carousel__item {
      img {
        margin-top: 10px;
        margin-left: 10px;
        width: 95%;
        height: 100%;
      }
    }
  }
}

.module-title {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: rgb(71, 70, 70);
  background: rgb(243, 242, 242);
  margin-top: 10px;
}

.comm-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 10px;

  li {
    position: relative;
    width: 48%;
    background: #fff;
    padding: 10px;
    box-sizing: border-box;
    margin: 0 auto 10px;
    border-radius: 10px;

    img {
      width: 95%;
      height: 180px;
    }

    div:nth-child(2) {
      font-size: 12px;
      padding-left: 10px;
    }

    div:nth-child(3) {
      font-size: 12px;
      text-align: center;
      margin-top: 10px;
      color: red;
    }
  }
}
</style>
