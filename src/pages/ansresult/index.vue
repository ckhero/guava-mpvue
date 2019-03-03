<template>
	<view class="page">
	<view class="point">
      积分{{}}
	</view>
	<view style="text-align: center;margin-top: 30rpx;">挑战{{status}}</view>
	<view style="text-align: center;">奖励已经发至您的账户</view>
	<view style="text-align: center;">另外您将获得{{point}}积分</view>
	<button style='opacity: 1;width: 200rpx;margin-top: 300rpx;'  bindtap='onShareAppMessage' open-type="share">分享</button>

	</view>
</template>

<script>
	 export default {
     onShareAppMessage: function () {
       return {
         title: '答题成功',
         path: '/page/user?id=123'
       }
     },
    data () {

      return {
      	status:null,
      	point:null
      }

    },

    components: {},

    mounted () {

    },

    methods: {
       onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '快来.....啦',
      imageUrl:'/static/images/time.jpg',//图片地址
      path:'../loading/main',// 用户点击首先进入的当前页面
      success: function (res) {
        // 转发成功
        console.log("转发成功:");
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:");
      }
    }

  }
    },

    created () {
      // let app = getApp()
    }
  }
</script>

<style>
	.point{
		border:10rpx;
		width: 250rpx;
		height: 250rpx;
		background-color: #5CACEE;
		border-radius: 125rpx;
		text-align: center;
		line-height: 100rpx;
		margin-left: auto;
		margin-right: auto;
		margin-top: 60rpx;
		color: #ffffff;
		font-size: 40rpx;
		text-align: center;
	}
	.afterQuestion
	{
	width: 200rpx;
  font-size: 30rpx;
  margin-top: 400rpx;
  border: 2rpx solid #959595;
  padding: 10rpx 25rpx 10rpx 25rpx;
  border-radius: 15rpx;
}
</style>
