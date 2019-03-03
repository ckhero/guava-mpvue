<template>
<view class='shape'>

    <view class='learnlength'><text class=''>学习进度2/60</text></view>
    <view class='top-left'><view style="margin-left: 20rpx;">学习列表:</view><view class='item'><a href="../ranking/main" target="_blank" class="allclass">全部课程 ></a></view></view>
    <view class='border'><view>第{{num1}}天</view>
    	      <view class='row'><view>英文：</view><view>{{english1}}</view><view class='finish'>{{status}}</view></view>
    	      <view class='row'><view>数学：</view><view>{{english1}}</view><view class='finish'>{{status}}</view></view>
    	      <view class='row'><view>逻辑：</view><view>{{english1}}</view><view class='finish'>{{status}}</view></view>
    </view>
    <view class='border'><view>第{{num2}}天</view>
    	      <view class='row'><view>英文：</view><view>{{english1}}</view><view class='finish'>{{status}}</view></view>
    	      <view class='row'><view>数学：</view><view>{{english1}}</view><view class='finish'>{{status}}</view></view>
    	      <view class='row'><view>逻辑：</view><view>{{english1}}</view><view class='finish'>{{status}}</view></view>
    </view>
    <view class='border'><view>第{{num3}}天</view>
    	      <view class='row'><view>英文：</view><view>{{english1}}</view><view class='finish'>{{status}}</view></view>
    	      <view class='row'><view>数学：</view><view>{{english1}}</view><view class='finish'>{{status}}</view></view>
    	      <view class='row'><view>逻辑：</view><view>{{english1}}</view><view class='finish'>{{status}}</view></view>
    </view>

    <button  @click="toanswer" style="border:0;width: 450rpx;height: 100rpx;background-color: #5CACEE;border-radius: 15rpx;text-align: center;line-height: 100rpx;margin-left: auto;margin-right: auto;margin-top: 80rpx;color: #ffffff;font-size: 40rpx;" >开始答题</button>
  </view>

</template>

<script>
  import card from '@/components/card'
  import global_ from '@/components/global'
  import request from '@/utils/request'

  export default {
	data(){
    	return {
    		num1:null,
    		num2:null,
    		num3:null,
    		english1:null,
    		status:null
    	}
    },

    components: {},

    mounted () {

    },

    methods: {
      getTodayLesson (res) {
        this.api.v1.user.todaylesson({}).then(res => {

          console.log(res)
        })
      },

     toanswer(){
     	const url="../todaystudy/main?id=11"
      	wx.navigateTo({url})
     }

      },





    created () {
      // let app = getApp()
    }
  }
</script>

<style>
.learnlength{width: 150rpx;
height: 150rpx;
margin-left: 280rpx;
background-color: #ff5757;
border-radius: 75rpx;}
.txtstyle{
	text-align: center;
}
.top-left{
	display: flex;
	margin-top: 20rpx;
}
.allclass{
font-size: 30rpx;
margin-left: 380rpx;
}
.border{
margin-left:20rpx;
	border-bottom: 1rpx solid #efefef;
}
.row{display: flex;
  border-bottom: 1rpx solid #efefef;
    margin-left: 40rpx;
  margin-right: auto;}
.finish{
	margin-left: 300rpx;
}
</style>
