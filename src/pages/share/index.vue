<template>
<view class='shape'>
    <text style="text-align: center;">正确率{{}}</text>
  </view>
</template>

<script>
  import card from '@/components/card'
  import global_ from '@/components/global'
  import request from '@/utils/request'

  export default {
    data () {
    	return {

    	}
    },

    components: {},

    mounted () {
      this.getExam()
    },

    methods: {
      getExam (res) {
	        request.post({
	          url: request.userInfoUrl,
	          data: {
	          }
	        }).then(res => {

	        	 
	        	 
	         global_.xToken = res.data.token
             console.log(res)
	        })
	      } ,


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
          this.getSetting()
        } else {
          // 用户按了拒绝按钮
          console.log('用户按了拒绝按钮')
        }
      },
      switchtostudy(){
      	const url="../todaystudy/main"
      	wx.navigateTo({url})
      }
    },

    created () {
      // let app = getApp()
    }
  }
</script>

<style>
.shape{
	width: 300rpx;
	height: 300rpx;
background-color: #ff5757;
  border-radius: 150rpx;}
 .txt{
 	text-align: right;
 }
</style>
