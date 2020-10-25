<template>
  <div class="container">
    <div class="comm" v-for="(item, index) in evaluateList" :key="index">
      <div class="pic-info">
        <img :src="item.goodsPicture" alt="">

        <div class="star">
          <el-rate v-model="item.evaluateScore"></el-rate>
        </div>
      </div>

      <div class="eva-box">
        <div class="title">分享你的使用体验吧</div>
        <!-- <el-upload
          action="http://a309200w30.goho.co"
          :http-request="change"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog> -->
        <el-input v-model="item.evaluateContent" style="display: block;width:95%;margin: 0 auto;" type="textarea" :rows="5"></el-input>

      </div>
    </div>
    <!-- <div class="comm" v-for="(item, index) in evaluateList" :key="index">
      <div class="pic-info">
        <img :src="item.goodsImagePath" alt="">
        <div class="star" :style="{backgroundPosition: `${180 - 5 * 36}px 0`}"></div>
      </div>
      <div class="eva-box">
        <div class="title">分享你的使用体验吧</div>
        <el-input style="display: block;width:95%;margin: 0 auto;" type="textarea" :rows="5"></el-input>
      </div>
    </div> -->
<el-button class="submit-btn" type="primary" @click="addEvaluate">提交</el-button>
  </div>
</template>

<script>
import req from '@/api/order-evaluate.js'
import axios from 'axios'
// const qs = require('qs')
export default {
  name: 'order-evaluate',
  data () {
    return {
      num: 1,
      dialogImageUrl: '',
      pictureList: [],
      dialogVisible: false,
      evaluateList: []
    }
  },
  mounted () {
    this.getEvaluate()
  },
  methods: {
    change (value) {
      console.log(value.file)
      var formdata = new FormData()
      formdata.append('multipartFile', value.file)
      // formdata.append('access_token', JSON.parse(sessionStorage.getItem('userinfo')).access_token)
      axios({
        method: 'post',
        url: 'http://a309200w30.goho.co/pc/picture/upload',
        data: formdata,
        headers: {
          'Content-Type': 'miltipt/form-data'
        }
      }).then(data => {
        console.log('data图片', data)
        this.pictureList.push({pictureNum: this.num++, picturePath: data.data.data})
        this.num = this.num++
        console.log(this.pictureList)
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    getEvaluate () {
      req('listGoodsForEvaluate', {orderCode: this.$route.query.orderCode}).then(data => {
        this.evaluateList = data.data
        console.log('评价data', data)
        console.log('评价', this.evaluateList)
      })
    },
    addEvaluate () {
      // req('addGoodsEvaluate', {
      //   orderCode: this.$route.query.orderId,
      //   evaluateList: JSON.stringify(this.evaluateList.map(item => {
      //     return Object.assign({}, {goodsCode: item.goodsCode, evaluateContent: item.evaluateContent, evaluateScore: item.evaluateScore})
      //   })),
      //   pictureList: JSON.stringify(this.pictureList.map(item => {
      //     return Object.assign({}, {pictureNum: item.pictureNum, picturePath: item.picturePath})
      //   }))
      // }).then(data => {
      //   console.log(data)
      // })
      axios({
        method: 'post',
        url: 'http://a309200w30.goho.co/app/clientOrder/addGoodsEvaluate',
        data: JSON.stringify({
          orderCode: this.$route.query.orderCode,
          evaluateList: this.evaluateList.map(item => {
            return Object.assign({}, {goodsCode: item.goodsCode,
              evaluateContent: item.evaluateContent,
              evaluateScore: item.evaluateScore})
          })
        }),
        headers: {
          'Content-Type': 'application/json;',
          Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('userinfo')).access_token
        }
      }).then(data => {
        if (data.data.code === 0) {
          this.$message.success(data.data.msg)
          this.$router.push({path: '/order-list'})
        } else {
          this.$message.error(data.data.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

 .el-icon-plus  {
    position: relative;
    top: -25px;
}
.container {
  background: #fff;
  .comm {
    width: 100%;
    // height: 200px;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    padding: 10px 10px 0;
    box-sizing: border-box;
    background: #fff;
    .pic-info {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 150px;
        height: 150px;
      }
      .star {
        width: 180px;
        height: 36px;
        position: relative;
        left: -20px;
        // background: url('../../assets/stars.png');
        // background-repeat: no-repeat;
        // background-size: 100% 100%;
        /deep/ .el-rate__item {
          .el-rate__icon {
            font-size: 25px;
          }
        }
      }
    }
    .eva-box {
      width: 100%;
      .title {
        padding-left: 10px;
        line-height: 40px;
      }
    }
  }
  .submit-btn {
    display: block;
    width: 95%;
    margin: 10px auto 0;
    height: 40px;
    line-height: 40px;
  }
}
</style>
