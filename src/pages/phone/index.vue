<template>
  <div>
    <!--<button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfo1">999</button>-->
    <image class='picture' src='/static/images/8-01.png' ></image>
    <view class='content'>
      <text style='margin-left:100rpx;margin-bottom: 20rpx;'>允许微信授权后，开启你的答题之旅</text>
    </view>
    <button  open-type="getUserInfo"  @getuserinfo="bindGetUserInfo"  >授权手机号</button>
    <button plain="true" class='home' bindgetuserinfo="getUserInfo" open-type="getPhoneNumber" @click="getUserInfo1" bindgetphonenumber="getPhoneNumber"  style="border:0;width: 450rpx;height: 100rpx;background-color: #5CACEE;border-radius: 15rpx;text-align: center;line-height: 100rpx;margin-left: auto;margin-right: auto;margin-top: 10rpx;color: #ffffff;font-size: 40rpx;">获取手机号</button>
  </div>

</template>

<script>
  import {doLogin} from '@/utils/login'

  export default {
    data () {
      return {}
    },
    components: {},
    mounted () {
    },
    methods: {
    	getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
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
    height: 1000rpx;
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