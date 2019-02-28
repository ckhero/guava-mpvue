<template>
<view class="page">
  <view style="text-align: center;">今日知识点回顾</view>
  <scroll-view  class='messScroll' scroll-y  >
    
    
      <image class="userPhoto"    src="/static/images/learn.png" />
     
    
  </scroll-view>
 <button  @click="toanswer" style="border:0;width: 450rpx;height: 100rpx;background-color: #5CACEE;border-radius: 15rpx;text-align: center;line-height: 100rpx;margin-left: auto;margin-right: auto;margin-top: 80rpx;color: #ffffff;font-size: 40rpx;" >进入答题</button>
</view>
 
</template>

<script>
export default {
  
  methods: {
   toanswer(){
     	const url="../answer/main"
      	wx.navigateTo({url})
     }
  }
}
</script>

<style>
	.userPhoto{
	border-style:solid;
	border-width:1px;
	margin-top: 20rpx;
	margin-left: 40rpx;
    height: 2500rpx;
    width: 700rpx;
    padding: 0;
    margin: 0;}
    .messScroll{
    	margin-left: 25rpx;
   height: 900rpx;}

</style>