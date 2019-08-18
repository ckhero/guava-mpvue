<template>
  <div>
    <i-row>

      <i-col span="24" i-class="col-class">
        <div class="contentbox">
          <CircleProgress unit="400" :percent="percent" canvasId="progress"
                          strokeType="round"
                          strokeWidth="16"
                          stroke-bg-color="#e3effd"
                          ondragstart="0"
                          stroke-color="#72ceff">
          <span slot="txt">
            <span style="font-size: 60rpx">
              {{percent}}%
            </span>
            <br>
            <span style="color: silver;font-size: 30rpx">正确率</span>
          </span>
          </CircleProgress>
        </div>
      </i-col>
    </i-row>
    <i-row>
      <!--<i-col span="24" i-class="col-class text point-text-top">挑战{{status}}</i-col>-->
      <!--<i-col span="24" i-class="col-class text">奖励已发放之您的账户，请稍后查收</i-col>-->
      <i-col span="24" i-class="col-class text">挑战{{status}},另外您将获得<b style="color:#8c99fc;display: inline">{{point}}</b>积分奖励！</i-col>
    </i-row>
    <i-row>
      <!--<i-col offset="3" span="16" i-class="col-class share-button">-->
        <image class='picture img-button' @click="toexplantion()"  src='/static/images/analysis.png' style="margin-top: 120rpx"/>
        <!--<i-button @click="toexplantion()" type="primary" long="true" size	="large" i-class="buttonAnswer">查看解析</i-button>-->
      <!--</i-col>-->
    </i-row>
    <i-row>

      <button class="img-button3" open-type="share" style="">
        <image class='img-button2' src='/static/images/share.png'/>
      </button>
      <!--</i-col>-->
    </i-row>
  </div>
</template>

<script>
  import CircleProgress from 'mini-circleprogress'
  export default {
    onShareAppMessage: function () {
      return {
        title: '答题成功',
        path: '/page/user?id=123'

      }
    },
    data () {
      return {
        percent: null,
        point: null,
        status:'成功',
        lesson_id:null,
      }
    },
    onUnload: function () {
      const url = this.global.homePageUrl
      wx.reLaunch({url})
    },
    onLoad: function (options) {
      this.lesson_id = options['id']
      this.getExaminationResult(options['id'])
    },
    components: {CircleProgress},

    mounted () {},
    methods: {
      toexplantion () {
        const url = '../lessonExplantion/main?id=' + this.lesson_id
        wx.navigateTo({ url })
      },
      getExaminationResult (id) {
        this.api.v1.examination.result({
          id: id
        }).then((res) => {
          this.percent = res.data.user_lesson_right_percent
          this.percent = this.percent / 100
          console.log(this.percent)
          this.point = res.data.user_lesson_point
          if (this.percent < 0.6) {
            this.status = '失败'
          }
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
    margin-top: 50rpx;
  }
  .img-button {
    width:600rpx;
    height:100rpx;
    left:50%;
    margin-left:-300rpx;
    margin-top: 80rpx;
    position:relative;
  }

  .img-button2 {
    width:600rpx;
    height:100rpx;
  }

  .img-button3 {
    width:600rpx;
    height:100rpx;
    left:50%;
    margin-left:-300rpx;
    margin-top: 80rpx;
    position:relative;
    border: 0;
    background-color: white;
    color: white;
    padding: 0;
  }
  .img-button3::after {
    border: 0;
  }
  .contentbox {
    width: 300rpx;
    height: 300rpx;
  }

  .contentbox {
    width: 400rpx;
    height: 400rpx;
    position: relative;
    left: 50%;
    margin-left: -200rpx;
  }
</style>
