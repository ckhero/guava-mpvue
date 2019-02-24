<template>
	<div>
		<view class='top-left'>
      <image class='userPic' src='/static/images/user.png' />
      <view class='item'>姓名：{{realName}}</view>
      <view class='item'>累计打卡：{{frequency1}} | 积分：{{frequency2}} | 排名：{{frequency3}}</view>
  
  </view>

      <view class='answer'>网址：{{}}</view>
  <view class=''><view>挑战课程</view><view class='item'><a href="#" target="_blank">全部课程</a></view></view>
  <view ><view class='study'>英语{{frequency1}}</view><view class='study'>数学{{frequency1}}</view><view class='study'>逻辑{{frequency1}}</view></view>
  <button plain="true" style="border:0;width: 450rpx;height: 100rpx;background-color: #5CACEE;border-radius: 15rpx;text-align: center;line-height: 100rpx;margin-left: auto;margin-right: auto;margin-top: 80rpx;color: #ffffff;font-size: 40rpx;" >开始今日学习</button>
  <text class='txt'>联系客服</text>
	</div>
	
</template>

<script>
</script>

<style>
	.userPic{

  width: 120rpx;
  height: 120rpx;
    margin: 10rpx 20rpx 10rpx 15rpx;}
    .txt{
    	margin-left: 300rpx;
    margin-bottom: 40rpx;
    	align-items: center;
    	border-bottom: 2rpx solid #919191;
    }
    .item{
    	height: 75rpx;
  
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
 	
  background-color: #ff9800;
  border-radius: 15rpx;
}   
</style>