<template>
  <div>
    <i-row>
      <i-col offset="8" span="8" i-class="col-class">
        <view class="point">
          <i-col span="24" i-class="col-class point-text point-text-top">
            正确率
          </i-col>
          <i-col span="24" i-class="col-class point-text">
            {{percent}}%
          </i-col>
        </view>
      </i-col>
    </i-row>
    <i-row>
      <i-col span="24" i-class="col-class text point-text-top">挑战成功</i-col>
      <i-col span="24" i-class="col-class text">奖励已发放之您的账户，请稍后查收</i-col>
      <i-col span="24" i-class="col-class text">另外您将获得 {{point}} 积分奖励！</i-col>
    </i-row>
    <i-row>
      <i-col offset="8" span="8" i-class="col-class share-button">
        <i-button type="primary" open-type="share">分享</i-button>
      </i-col>
    </i-row>
  </div>
	<!--<view class="page">-->

	<!--<view style="text-align: center;margin-top: 30rpx;">挑战{{status}}</view>-->
	<!--<view style="text-align: center;">奖励已经发至您的账户</view>-->
	<!--<view style="text-align: center;">另外您将获得{{point}}积分</view>-->
	<!--<button style='opacity: 1;width: 200rpx;margin-top: 300rpx;'  bindtap='onShareAppMessage' open-type="share">分享</button>-->

	<!--</view>-->
</template>

<script>
  export default {
    onShareAppMessage: function () {
      return {
        title: '答题成功',
        path: '/page/user?id=123'
      }
    },
    onUnload: function () {
      const url = this.global.homePageUrl
      wx.reLaunch({url})
    },
    onLoad: function (options) {
      this.getExaminationResult(options['id'])
    },
    data () {
      return {
        percent: null,
        point: null
      }
    },
    components: {},
    mounted () {
    },
    methods: {
      getExaminationResult (lessonId) {
        this.api.v1.examination.result({
          id: lessonId
        }).then((res) => {
          this.percent = res.data.user_lesson_right_percent
          this.point = res.data.user_lesson_point
        })
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
		background-color: #2d8cf0;
		border-radius: 125rpx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 60rpx;
		color: #ffffff;
		font-size: 30rpx;
		text-align: center;
	}
  .point-text-top {
    margin-top: 70rpx !important;
  }
  .point-text {
    height: 50rpx;
    line-height: 50rpx;
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
  .text {
    font-size: 30rpx;
    text-align: center;
    margin: 20rpx;
  }
  .share-button {
    margin-top: 130rpx;
  }
</style>
