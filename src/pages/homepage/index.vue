<template>
	<div>
		<view class='top-left'>
      <img class='userPic' :src='head' />
      <view class=''><view class='item'>姓名：{{name}}</view>
      <view class='item'>累计打卡：{{sign_day}} | 积分：{{point}} | <a href="../ranking/main" target="_blank">排名：{{rank}}</a></view></view>
  
  </view>

      <view class='answer'>网址：{{}}</view>
  <view class='top-left'><view style="margin-left: 20rpx;">挑战课程:</view><view class='item'><a href="../ranking/main" target="_blank" class="allclass">全部课程 ></a></view></view>
  <view class='row'><view class='study'>英语{{frequency1}}</view><view class='study'>数学{{frequency1}}</view><view class='study'>逻辑{{frequency1}}</view></view>
  <button plain="true" @click="switchtostudy" style="border:10rpx;width: 250rpx;height: 250rpx;background-color: #5CACEE;border-radius: 125rpx;text-align: center;line-height: 100rpx;margin-left: auto;margin-right: auto;margin-top: 80rpx;color: #ffffff;font-size: 40rpx;text-align: center;" >今日学习</button>
  <text class='txt'>联系客服</text>
	</div>
	
</template>

<script>
  import card from '@/components/card'
  import global_ from '@/components/global'
  import request from '@/utils/request'

  export default {
    data () {
    	return {
    		name: null,
    		head: null,
    		sign_day: null,
    		point: null,
    		rank: null,
    		level: null,
    	}
    },

    components: {},

    mounted () {
      this.getSetting()
    },

    methods: {
      getSetting (res) {
	        request.post({
	          url: request.userInfoUrl,
	          data: {
	          }
	        }).then(res => {
	        	 
	        	 this.name =res.data.name
	        	 this.head = res.data.head_img
	        	 this.point=res.data.point
	        	 this.rank=res.data.rank
	        	 this.level=res.data.level
	        	 this.sign_day=res.data.sign_day
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
      	const url="../learn/main"
      	wx.navigateTo({url})
      }
    },

    created () {
      // let app = getApp()
    }
  }
</script>

<style>
	.row{display: flex;
  width: 600rpx;
    margin-left: auto;
  margin-right: auto;}
	.userPic{

  width: 120rpx;
  height: 120rpx;
    margin: 10rpx 20rpx 10rpx 15rpx;}
    .txt{
    	margin-top: 100rpx;
    	margin-left: 300rpx;
    
    	align-items: center;
    	border-bottom: 2rpx solid #919191;
    }
    .item{
    
  
    margin: 0rpx 15rpx 0rpx 15rpx;
  font-size: 32rpx;}
  
.score{
  text-align: left;
  float: left;
  width: 30%;
  font-size: 45rpx;
  color: #f74b4b;
}
.answer{
	height: 80rpx;
	margin-left: 20rpx;
	margin-right: 20rpx;
	margin-top: 50rpx;
	margin-bottom: 50rpx;
  background-color: #ff5757;
  border-radius: 15rpx;
}
.picker{
  width: 280rpx;
  height: 280rpx;
  color: #ffffff;
  font-size: 60rpx;
  line-height: 280rpx;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30rpx;
}
 .study{
 	width: 300rpx;
 	height: 150rpx;
 	margin-left: 40rpx;
 	margin-top: 40rpx;
  background-color: #ff9800;
  border-radius: 15rpx;
  text-align:center;
}
.top-left{
	display: flex;
	margin-top: 20rpx;
}
.allclass{
	
margin-left: 380rpx;
}   
</style>