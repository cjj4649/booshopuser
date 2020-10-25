<template>
  <div>
    <div class="header">
      <span class="iconfont iconzuojiantou" @click="$router.push({path: '/login'})"></span>
      <span>注册</span>
    </div>

    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>

    <el-form ref="form" :model="listData" :rules="formRules" inline label-width="80px">
      <el-form-item label="用户名" prop="userAcct">
        <el-input v-model="listData.userAcct"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPwd">
        <el-input type="password" v-model="listData.userPwd"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPwd">
        <el-input type="password" v-model="listData.confirmPwd"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model.number="listData.phone"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="listData.userName"></el-input>
      </el-form-item>
      <el-form-item prop="sex">
        <el-radio-group v-model="listData.sex">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-upload
               class="upload-demo"
               action="http://a309200w30.goho.co"
               :on-preview="handlePreview"
               :on-remove="handleRemove"
               :http-request="change"
               :before-remove="beforeRemove"
                multiple
               :limit="1"
               :on-exceed="handleExceed"
               :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                 </el-upload>
      </el-form-item>
      <el-form-item label="身份证" prop="idCard">
        <el-input v-model="listData.idCard"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="mail">
        <el-input v-model="listData.email"></el-input>
      </el-form-item>
      <el-form-item label="邀请码" prop="inviteCode">
        <el-input v-model="listData.inviteCode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="register-btn" type="primary" @click="submit">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
        <div>
          <el-button type="text" @click="toLogin">返回登录</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import axios from 'axios'
const qs = require('qs')

export default {
  name: 'register',
  data () {
    return {
      pic: [],
      fileList: [],
      listData: {},
      formRules: {
        userAcct: [
          {required: true, message: '请输入用户账号', trigger: 'change'}
        ],
        userPwd: [
          {required: true, message: '请输入用户密码', trigger: 'change'}
        ],
        confirmPwd: [
          {required: true, message: '请确认密码', trigger: 'change'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'change'},
          { type: 'number', message: '手机号必须为数字' }
        ],
        userName: [
          {required: true, message: '请输入用户名称', trigger: 'change'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
        idCard: [
          {required: true, message: '请输入身份证', trigger: 'change'},
          { validator: this.validateIdCard, trigger: 'change' }
        ],
        email: [
          {required: true, message: '请输入用户邮箱', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name} ？`)
    },
    change (value) {
      console.log(value.file)
      var formdata = new FormData()
      formdata.append('multipartFile', value.file)
      // formdata.append('access_token', JSON.parse(sessionStorage.getItem('userinfo')).access_token)
      axios({
        method: 'post',
        url: 'http://a309200w30.goho.co/app/picture/upload',
        data: formdata,
        headers: {
          'Content-Type': 'miltipt/form-data'
        }
      }).then(data => {
        console.log('data图片', data)
        this.pic = data.data.data
        console.log('图片路径', this.pic)
      })
    },
    toLogin () {
      this.$router.push({path: '/login'})
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.listData.userPwd !== this.listData.confirmPwd) {
            this.$message.info('两次输入的密码不一致')

            return
          }
          let datalist = {
            imagePath: this.pic,
            userAcct: this.listData.userAcct,
            userName: this.listData.userName,
            sex: this.listData.sex,
            phone: this.listData.phone,
            email: this.listData.email,
            idCard: this.listData.idCard,
            userPwd: this.listData.userPwd,
            confirmPwd: this.listData.confirmPwd,
            inviteCode: this.listData.inviteCode
          }
          axios({
            method: 'post',
            url: 'http://a309200w30.goho.co/app/register/clientRegister',
            data: qs.stringify(datalist),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;'
            }
          }).then(data => {
            if (data.data.code === 0) {
              this.$message({
                type: 'success',
                message: data.data.msg
              })

              // this.getHeader(data.data.data.access_token)

              // sessionStorage.setItem('userInfo', JSON.stringify(data.data.data))

              setTimeout(() => {
                this.$router.push({path: '/login'})
              })
            } else {
              this.$message({
                type: 'error',
                message: data.data.msg
              })
            }
          })
        } else {
          return false
        }
      })
    },
    validateIdCard (rule, value, callback) {
      let reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

      console.log(reg.test(value))

      if (!reg.test(value)) {
        callback(new Error('请输入正确的身份证号'))
      } else {
        callback()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  height: 50px;
  background: #ddd;
  line-height: 50px;
  text-align: center;

  span.iconzuojiantou {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translate(0, -50%);
    color: #409EFF;
  }
}

.logo {
  width: 80%;
  margin: 0 auto;

  img {
    width: 100%;
  }
}

.el-form {
  margin-top: 20px;

  .el-form-item {
    width: 100%;
    text-align: center;
    margin: 0 auto 5px;

    /deep/ .el-form-item__error {
      padding-top: 0;
      top: 36px;
    }
  }
}

.register-btn {
  width: 150px;
  height: 40px;
  margin-top: 20px;
}
</style>
