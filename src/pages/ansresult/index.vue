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
      <i-col span="24" i-class="col-class text point-text-top">挑战{{status}}</i-col>
      <!--<i-col span="24" i-class="col-class text">奖励已发放之您的账户，请稍后查收</i-col>-->
      <i-col span="24" i-class="col-class text">另外您将获得 {{point}} 积分奖励！</i-col>
    </i-row>
    <i-row>
      <i-col offset="8" span="8" i-class="col-class share-button">
        <i-button @click="toexplantion()" type="primary" long="true" size	="large" i-class="buttonAnswer">查看解析</i-button>
      </i-col>
    </i-row>
    <i-row>
      <i-col offset="8" span="8" i-class="col-class share-button">
        <i-button type="primary" open-type="share">分享</i-button>
      </i-col>
    </i-row>
  </div>
</template>

<script>
  export default {
    onShareAppMessage: function () {
    	if (ops.from === 'button') {
            var title = ops.target.dataset.title;
        };

        return {
            title: title, //转发的标题。当前小程序名称
            path: 'pages/ordinaryDetails/ordinaryDetails?isShare=0', //转发的路径
//          imageUrl: '',//自定义图片路径 支持PNG及JPG。显示图片长宽比是 5:4。
            
        }
//    return {
//    	
//      title: '答题成功',
//      path: '/page/loading'
//
//    }
    },
    data () {
      return {
        percent: null,
        point: null,
        status:'成功',
        lesson_id:null
      }
    },
    onUnload: function () {
      const url = this.global.homePageUrl
      wx.reLaunch({url})
    },
    onLoad: function (options) {
    	 this.lesson_id = options['id'],
      this.getExaminationResult(options['id'])
    },
    
    components: {},
    mounted () {
    },
    methods: {
    	toexplantion() {
      const url = '../lessonExplantion/main?id=' +this.lesson_id
      wx.navigateTo({ url })
    },
      getExaminationResult (id) {
        this.api.v1.examination.result({
          id: id
        }).then((res) => {
          this.percent = res.data.user_lesson_right_percent
          this.point = res.data.user_lesson_point
          if(res.data.user_lesson_right_percent<60)
          {      
          this.status='失败'
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
    margin-top: 160rpx;
  }
</style>
