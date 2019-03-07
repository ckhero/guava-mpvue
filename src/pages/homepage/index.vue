<template>
  <div>
    <i-row i-class="content">
      <i-col offset="1" span="22">
        <i-row i-class="title-row-style">
          <i-col span="4">
            <i-avatar :src="head" size="large" shape="square" i-class="title-avtar" ></i-avatar>
          </i-col>
          <i-col offset="1" span="19">
            <i-row i-class="title-text">
              <i-col span="20">{{name}}</i-col>
              <i-col span="4" @click='buttonTap'>
                <i-icon type="prompt" i-class="title-text" size="24"color="#80848f"  />
              </i-col>
            </i-row>
            <i-row i-class="title-text">
              <i-col span="8">打卡：{{sign_day}}</i-col>
              <i-col span="8">积分：{{point}}</i-col>
              <i-col span="8" is-link="true">
                <a href="../ranking/main" target="_blank" style="text-decoration: underline">排名：{{rank}}</a>
              </i-col>
            </i-row>
          </i-col>
        </i-row>
        <i-row i-class="notice-bar">
          <i-notice-bar icon="systemprompt">
            点击获取最新的学习资料
          </i-notice-bar>
        </i-row>
        <i-row>
          <i-cell-group>
            <i-cell title="挑战课程" is-link url="../allclass/main" value="全部课程" i-class="middle-bar"></i-cell>
          </i-cell-group>
        </i-row>
        <i-row>
          <i-col span="7" i-class="lesson-info">
            <i-col span="24">英语</i-col>
            <i-col span="24">{{english.done}}/{{english.total}}</i-col>
          </i-col>
          <i-col offset="1" span="8" i-class="lesson-info">
            <i-col span="24">数学</i-col>
            <i-col span="24">{{math.done}}/{{math.total}}</i-col>
          </i-col>
          <i-col offset="1" span="7" i-class="lesson-info">
            <i-col span="24">逻辑</i-col>
            <i-col span="24">{{logic.done}}/{{logic.total}}</i-col>
          </i-col>
        </i-row>
        <i-row i-class="today-processing">
          <i-col span="12" offset="6" @click="switchtostudy">
            <div class="circle circle-blue"></div>
            <div class="circle circle-gray">
              <i-col offset="3" span="18" i-class="circle-text circle-text-up">
                今日课程
              </i-col>
              <i-col span="24" i-class="circle-text circle-text-down">
                {{right_type_num}}/{{type_num}}
              </i-col>
            </div>
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
      <img src="../../../static/images/ck.jpeg" alt="" class="mask-img"/>
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
    <img class="image" src="/static/images/learn.png" mode='aspectFill'/>
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
        type_num:null
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
    width:120rpx !important;
    height:120rpx !important;
    line-height:120rpx !important;
  }
  .content {
    margin-top: 15rpx;
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
    border-bottom:1rpx solid #dddee1;
  }
  .lesson-info {
    margin: 15rpx 0rpx;
    background: linear-gradient(#5cadff, #2b85e4);
    color: white;
    height: 160rpx;
    line-height: 50rpx;
    border-radius: 12rpx;
    padding: 30rpx 0rpx;
    text-align: center;
  }
  .contact-us {
    margin-top: 120rpx;
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
