<template>
<view class="page">
  
  <scroll-view  class='messScroll' scroll-y  bindscrolltolower="" >
    <view class='rankList' wx:for="rankList" bindtap='' data-index="index">
    <view class="item">
      <image class="userPhoto"    src="/static/images/user.png" />
      <view class='middle'>
          
      </view>
      <view class='score'>
          
      </view>
      <view class='frequency'>
            
      </view>
          
      </view>
    </view>
  </scroll-view>
 <button  @click="toanswer" style="border:0;width: 450rpx;height: 100rpx;background-color: #5CACEE;border-radius: 15rpx;text-align: center;line-height: 100rpx;margin-left: auto;margin-right: auto;margin-top: 80rpx;color: #ffffff;font-size: 40rpx;" >未完成</button>
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
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    padding: 0;
    margin: 0;}
</style>