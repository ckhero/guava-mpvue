<template>
  <div>
    <!--<button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfo1">999</button>
    <view class='picture' style="background-image:url('/static/images/8-01.png'); no-repeat 0 center;">
        <div  style="margin-top:400px">
        <input name="" type="button" v-show="action !== 'phone'" plain="true" class='home' bindgetuserinfo="getUserInfo" open-type="getUserInfo"  @getuserinfo="bindGetUserInfo" @click="getUserInfo1" style=" width:200px; height:60px;margin-top:400px;  border:0; background:url('/static/images/授权登录.jpeg') no-repeat center" />
        </div>
    </view>-->
    <image class='picture' src='/static/images/8-01.png' >
    </image>
    	<view class='content'>
      <text style='margin-left:100rpx;margin-bottom: 20rpx;'>允许微信授权后，开启你的答题之旅</text>
      <!--<input name="" type="button" v-show="action !== 'phone'" plain="true" class='home' bindgetuserinfo="getUserInfo" open-type="getUserInfo"  @getuserinfo="bindGetUserInfo" @click="getUserInfo1" style=" width:200px; height:60px;margin-top=400px;  border:0; background:url('/static/images/授权登录.jpeg') no-repeat center" />
    <input name="" type="button" v-show="action == 'phone'" plain="true" class='home' bindgetphonenumber="getPhone" open-type="getPhoneNumber" @getphonenumber="getPhone" style=" width:200px; height:60px;  border:0; background:url('/static/images/授权登录.jpeg') no-repeat center" />-->

    </view>

    <button v-show="action !== 'phone'" plain="true" class='home' bindgetuserinfo="getUserInfo" open-type="getUserInfo"  @getuserinfo="bindGetUserInfo" @click="getUserInfo1" style="border:0;width: 450rpx;height: 100rpx;background-color: #5CACEE;border-radius: 15rpx;text-align: center;line-height: 100rpx;margin-left: auto;margin-right: auto;margin-top: 10rpx;color: #ffffff;font-size: 40rpx; " >授权登录</button>
    <button v-show="action == 'phone'" plain="true" class='home' bindgetphonenumber="getPhone" open-type="getPhoneNumber" @getphonenumber="getPhone" style="border:0;width: 450rpx;height: 100rpx;background-color: #5CACEE;border-radius: 15rpx;text-align: center;line-height: 100rpx;margin-left: auto;margin-right: auto;margin-top: 10rpx;color: #ffffff;font-size: 40rpx;">接收通知</button>
    
  </div>

</template>

<script>
  import {doLogin} from '@/utils/login'
  import {getCode} from '@/utils/code'

  export default {
    data () {
      return {
        action: 'login'
      }
    },
    components: {},
    mounted () {
    },
    onLoad: function (options) {
      this.action = decodeURIComponent(options.action)
      console.log(this.action)
      if (this.action === 'phone') {
        this.setSessionKey()
      }
    },
    methods: {
      getUserInfo1 () {
        console.log('click事件首先触发')
        // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
        // console.log(wx.canIUse('button.open-type.getUserInfo'))
        if (wx.canIUse('button.open-type.getUserInfo')) {
          // 用户版本可用
        } else {
          console.log('请升级微信版本')
        }
      },
      bindGetUserInfo (e) {
        // console.log(e.mp.detail.rawData)
        if (e.mp.detail.rawData) {
          // 用户按了允许授权按钮
          console.log('用户按了允许授权按钮')
          doLogin()
        } else {
          // 用户按了拒绝按钮
          console.log('用户按了拒绝按钮')
        }
      },
      getPhone (e) {
        console.log(e)
        console.log(e.detail)
        let homeUrl = '../homepage/main'
        // let _global = global
        console.log(wx.getStorageSync('code'))
        if (e.mp.detail.iv) {
          // 用户按了允许授权按钮
          console.log('用户按了允许获取手机号码')
          let _this = this
          wx.login({
            success (res) {
              _this.api.v1.user.setPhone({
                iv: e.mp.detail.iv,
                encryptedData: e.mp.detail.encryptedData,
                code: res.code
              }).then(res => {
                console.log('succ')
                wx.navigateTo({ url: homeUrl })
              })
            }
          })
        } else {
          // 用户按了拒绝按钮
          console.log('用户按了拒绝按钮')
        }
      },
      setSessionKey () {
        let _this = this
        wx.login({
          success (res) {
            _this.api.v1.user.setSessionKey({
              code: res.code
            }).then(res => {
              console.log('sessionkey设置成')
              console.log(res)
            })
          }
        })
      }
    },
    created () {
      // let app = getApp()
    }
  }
</script>

<style scoped>
  .picture{
    width: 800rpx;
    height: 1210rpx;

  }
  .content{
    font-size: 30rpx;
    color: #595758;
    margin: 10rpx 20rpx 0rpx 30rpx;
  }
  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .userinfo-avatar {
    width: 128 rpx;
    height: 128 rpx;
    margin: 20 rpx;
    border-radius: 50%;
  }
  .userinfo-nickname {
    color: #aaa;
  }
  .usermotto {
    margin-top: 150px;
  }
  .form-control {
    display: block;
    padding: 0 12px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
  }
  .all {
    width: 7.5rem;
    height: 1rem;
    background-color: blue;
  }
  .all:after {
    display: block;
    content: '';
    clear: both;
  }
  .left {
    float: left;
    width: 3rem;
    height: 1rem;
    background-color: red;
  }
  .right {
    float: left;
    width: 4.5rem;
    height: 1rem;
    background-color: green;
  }
</style>
