<template>
  <div>
    <i-row i-class="content">
      <i-col span="24">
        <image class="head-bg" src="/static/images/head-bg.png"></image>

      </i-col>
      <i-col offset="1" span="22">
        <i-row i-class="head-main">
          <i-col offset="10" span="4">
            <i-avatar :src="head" size="large" shape="circle" i-class="title-avtar" ></i-avatar>
          </i-col>
          <i-col offset="8" span="1" @click='buttonTap'>
            <i-icon type="prompt" i-class="title-text" size="24"color="#80848f"  />
          </i-col>
          <i-row>
            <i-col i-class="head-name" offset="10" span="4" style="text-align: center">
              {{name}}
            </i-col>
          </i-row>
          <i-row i-class="head-bottom">
            <i-col span="7" offset="2">打卡：<span class="text-color">{{sign_day}}</span></i-col>
            <i-col span="7">积分：<span class="text-color">{{point}}</span></i-col>
            <i-col span="7" is-link="true">
              <a href="../ranking/main" target="_blank" style="text-decoration: none">排名：<span class="text-color">{{rank}}</span></a>
            </i-col>
          </i-row>
        </i-row>
      </i-col>
      <i-col offset="1" span="22">
        <i-row i-class="notice-bar" >
          <i-notice-bar icon="systemprompt" i-class="notice-bar-i" style="background-color: white">
            <a href="../lessonlists/main">点击获取最新的学习资料</a>
          </i-notice-bar>
        </i-row>
        <i-row>
          <i-cell-group>
            <i-cell title="挑战课程" is-link url="../allclass/main" value="全部课程" i-class="middle-bar"></i-cell>
          </i-cell-group>
        </i-row>
        <i-row>
          <i-col span="7" i-class="lesson-info">
            <i-col span="24"><a href="../singleclass/main?id=1">英语</a></i-col>
            <i-col span="24"><a href="../singleclass/main?id=1">{{english.done}}/{{english.total}}</a></i-col>
          </i-col>
          <i-col offset="1" span="8" i-class="lesson-info">
            <i-col span="24"><a href="../singleclass/main?id=2">数学</a></i-col>
            <i-col span="24"><a href="../singleclass/main?id=2">{{math.done}}/{{math.total}}</a></i-col>
          </i-col>
          <i-col offset="1" span="7" i-class="lesson-info">
            <i-col span="24"><a href="../singleclass/main?id=3">逻辑</a></i-col>
            <i-col span="24"><a href="../singleclass/main?id=3">{{logic.done}}/{{logic.total}}</a></i-col>
          </i-col>
        </i-row>
        <i-row>
          <i-cell-group>
            <i-cell title="挑战课程" is-link url="../allclass/main" value="全部课程" i-class="middle-bar"></i-cell>
          </i-cell-group>
        </i-row>
        <i-row style="position: relative;" @click="switchtostudy">
          <i-col span="24">
            <image class="loading-bg" src="/static/images/loading-bg.png"></image>

          </i-col>
          <i-col span="24">
            <i-row i-class="today-loading-main">
              <i-col offset="1" span="2">0%</i-col>
              <i-col span="16">
                <i-progress :percent="percent" hide-info="true" i-class="today-loading" stroke-width="18"></i-progress>
              </i-col>
              <i-col span="1" offset="2"> 100%</i-col>
              <i-col span="24" style="color: silver;text-align: center">
                <i-row>今日课程完成度
                <span class="text-color">{{percent}}%</span>
                </i-row>
              </i-col>
              <i-col offset="3" span="1" i-class="feiji" :style="[{'left':percentLeft,'position':feijiAbsolute}]">
                <i-row :style="{left:percentLeft}">
                  <image style="width: 30rpx;height: 30rpx;" src="/static/images/feiji.png"></image>
                </i-row>
              </i-col>
            </i-row>
          </i-col>
        </i-row>
        <i-row i-class="title-text contact-us">
          <i-col span="24" @click="showContact">
            联系客服
          </i-col>
        </i-row>
      </i-col>
    </i-row>
    <div class="mask" v-if="contact" @click="hideContact">
      <img src="../../../static/images/kefu.jpeg" alt="" class="mask-img"/>
    </div>
    <template>
      <radial-progress-bar :diameter="200"
                           :completed-steps="completedSteps"
                           :total-steps="totalSteps">
        <p>Total steps: {{ totalSteps }}</p>
        <p>Completed steps: {{ completedSteps }}</p>
      </radial-progress-bar>
    </template>
    <modal title="答题挑战规则说明" :hidden="modalHidden" @click="modalConfirm" showCancel="true" >
    <view>
    <img class="image" src="/static/images/rule.jpeg" />
    </view>
    </modal>
  </div>


</template>

<script>
  export default {
    data () {
      return {
        contact: false,
      	modalHidden: true,
        name: null,
        head: null,
        sign_day: null,
        point: null,
        rank: null,
        level: null,
        english:{
        	done:null,
        	total:null
        },
        math:{
        	done:null,
        	total:null
        },
        logic:{
        	done:null,
        	total:null
        },

        right_type_num:null,
        type_num:null,
        percent:0,
        percentLeft:"60%",
        feijiAbsolute:"absolute",
        feiji_left: {left: "100%"}
      }
    },

    components: {},

    mounted () {
      this.getUserInfo()
      this.getCourseInfo()
      this.store.commit('increment')
      this.store.commit('increment')
      this.store.commit('increment')
      console.log(this.store.state.count)
    },

    methods: {
      getUserInfo (res) {
        this.api.v1.user.info({}).then(res => {

          this.name = res.data.name
          this.head = res.data.head_img
          this.point = res.data.point
          this.rank = res.data.rank
          this.level = res.data.level
          this.sign_day = res.data.sign_day
        })
      },
      getCourseInfo(res){
      	this.api.v1.user.index({}).then(res => {
      		this.english=res.data.schedule.english
      		this.math=res.data.schedule.math
      		this.logic=res.data.schedule.logic
      		this.right_type_num=res.data.today.right_type_num
      		this.type_num=res.data.today.type_num
          this.percent = parseFloat(this.right_type_num / this.type_num).toFixed(2) * 100

          let tmpAll = 100 / 24 * 22
          this.percentLeft = (parseFloat(tmpAll / 24 * (18 * this.percent / 100 + 2) + 100 / 24).toFixed(2)) + "%"
          // this.percent = parseFloat(1/3).toFixed(2)
      		console.log("tmp", tmpAll/24)
      		console.log(18 * this.percent / 100 + 3)
      		console.log((18 * this.percent / 100 + 3) * (tmpAll/24))
      		console.log(this.percentLeft)
      		console.log(this.percent)
      		console.log(res)

      	})
      },

      switchtostudy () {

        const url = '../learn/main?id=11'
        wx.navigateTo({ url })
      },

      showContact () {
        this.contact = true
      },
      hideContact () {
        this.contact = false
      },
  buttonTap() {
    this.modalHidden=false
  },
  /**
   * 点击取消
   */
  modalCandel() {
    // do something
    this.modalHidden=true
  },
  /**
   *  点击确认
   */
  modalConfirm() {
    // do something
    this.modalHidden=true
    }
    },

    created () {
      // let app = getApp()
    }
  }
</script>

<style>
  .feiji {
    /*left:30%;*/
    position:absolute;
    margin-top:10rpx;
  }
  .loading-bg {
    width: 100%;
    height: 300rpx;
  }
  .notice-bar-i {
    background-color: white !important;
    color: black !important;
  }
  .head-bottom {
    position: relative;
    margin-top: 30rpx;
  }
  .head-name {
    position: relative;
    margin-top: 30rpx;
  }
  .head-bg {
    width: 100%;
    height:240rpx;
    min-height:100rpx;
    position: relative;

  }
  .head-main {
    height: 240rpx;
    position: relative;
    margin-top: -120rpx;
    background-color: white;
    border: silver;
    border-radius: 10rpx;
  }
  .text-color {
    color: #ffd650;
  }

  .today-loading-main {
    position: relative;
    /*margin-top: -150rpx;*/
    color: #ffd650;
    font-weight: bold;
    margin-top:-140rpx;
  }
  .today-loading {
    height: 50rpx;
  }
  .progress_box{
  width:165px;
  height: 165px;

  width:320rpx;
  height: 320rpx;
  margin-left: 235rpx;
  margin-top: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;

}
.progress_bg{
  position: absolute;
    width:250rpx;
  height: 250rpx;
}
.progress_canvas{
  width:250rpx;
  height: 250rpx;
}
.progress_text{
  position:absolute ;

  align-items: center;

}
.progress_info{
  font-size: 36rpx;
  text-align: center;
  padding-left: 14rpx;
  letter-spacing: 2rpx
}
.progress_dot{
  width:16rpx;
  height: 16rpx;
  border-radius: 50%;
  background-color: #fb9126;
}
  .row {
    display: flex;
    width: 600 rpx;
    margin-left: auto;
    margin-right: auto;
  }
	.userPic{

    width: 120rpx;
    height: 120rpx;
    margin: 10rpx 20rpx 10rpx 15rpx;
  }
    .txt{
    	margin-top: 0;
    	margin-left: 310rpx;



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
  background-color: #FFE4B5;
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
 	margin-left: 20rpx;
 	margin-top: 40rpx;
 	font-weight:bold;
    background-color:#1E90FF;
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
  .mask {
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background:rgba(0,0,0,.7);
    z-index:1000;
    transition:all .2s ease-in-out;
    opacity:1;
  }
  .mask-img {
    border-radius:14rpx;
    position: absolute;
    left: 50%;
    top: 50%;
    max-width: 50%;
    border: 0;
    transform: translate(-50%, -50%);
  }
  .image {
width: 600rpx;
height: 1000rpx;
margin: 10rpx 20rpx 0rpx 0rpx;
float: left;
}
.title-text {
  font-size: 30rpx;
  height:60rpx;
  line-height:60rpx;
}
  .title-avtar {
    width:140rpx !important;
    height:140rpx !important;
    line-height:140rpx !important;
    border-radius:70rpx !important;
    left: 50%;
    margin-left: -70rpx;
    margin-top: -70rpx;
    position: relative;
  }
  .content {
    margin-top: 15rpx;
    background-color: #f6f5fa;
  }
  .title-row-style {
    border-bottom:1rpx solid #dddee1;
    padding: 30rpx 0rpx;
  }
  .notice-bar {
    margin: 15rpx 0rpx;
  }
  .middle-bar {
    padding:24rpx 0rpx !important;
    background-color: #f6f5fa !important;
    /*border-bottom:1rpx solid #dddee1;*/
  }
  .lesson-info {
    margin: 15rpx 0rpx;
    background: linear-gradient(#7984f9, #7982f6);
    color: white;
    height: 160rpx;
    line-height: 50rpx;
    border-radius: 12rpx;
    padding: 30rpx 0rpx;
    text-align: center;
  }
  .contact-us {
    /*margin-top: 120rpx;*/
    color:#80848f;
    text-align: center;
  }
  .circle {
    position: relative;
    margin: 0 auto;
    height: 260rpx;
    width: 260rpx;
    border-radius: 50%;
    font-size: 30rpx;
    color: #2b85e4;
  }
  .circle-gray {
    position: relative;
    background: #f8f8f9;
    margin-top: -270rpx;
  }
  .today-processing {
    margin-top: 100rpx;
    text-align: center;
  }
  .circle-blue {
    height: 280rpx;
    width: 280rpx;
    position: relative;
    background: linear-gradient(#5cadff, #2b85e4);
  }
  .circle-text {
    height: 50rpx;
    line-height: 30rpx;
  }
  .circle-text-up {
    margin-top: 88rpx;
    border-bottom:2rpx solid #2b85e4;
  }
  .circle-text-down {
    margin-top: 10rpx;
  }
</style>
