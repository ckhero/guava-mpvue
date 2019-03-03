<template>
  <div>
    <view class='top-left'>
      <img class='userPic' :src='head'/>
      <view class=''>

        <view class='item'>姓名：{{name}}</view>
        <view class='item'>累计打卡：{{sign_day}} | 积分：{{point}} | <a href="../ranking/main" target="_blank" style="text-decoration: underline">排名：{{rank}}</a>
        </view>
      </view>

    </view>

    <view class='answer'>网址：{{}}</view>
    <view class='top-left'>
      <view style="margin-left: 20rpx;">挑战课程:</view>
      <view class='item'><a href="../learn/main" target="_blank" class="allclass">全部课程 ></a></view>
    </view>
    <view class='row'>
      <view class='study'><text>英语 \n {{english.done}}/{{english.total}}</text></view>
      <view class='study'><text>数学 \n {{math.done}}/{{math.total}}</text></view>
      <view class='study'><text>逻辑 \n {{logic.done}}/{{logic.total}}</text></view>
    </view>
    <button plain="true" @click="switchtostudy"
            style="border:10rpx;width: 250rpx;height: 250rpx;background-color: #5CACEE;border-radius: 125rpx;text-align: center;line-height: 100rpx;margin-left: auto;margin-right: auto;margin-top: 80rpx;color: #ffffff;font-size: 40rpx;text-align: center;">
      今日学习 \n {{right_type_num}}/{{type_num}}
    </button>
    <text class='txt'>联系客服</text>
  </div>

</template>

<script>
  export default {
    data () {
      return {
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
        lesson:{
        	1:{
        		lesson_id:null,
        		lesson_type:null,
        		lesson_name:null,
        		status:null
        	},
        	2:{
        		lesson_id:null,
        		lesson_type:null,
        		lesson_name:null,
        		status:null
        	},
        	3:{
        		lesson_id:null,
        		lesson_type:null,
        		lesson_name:null,
        		status:null
        	}
        },
        right_type_num:null,
        type_num:null
      }
    },

    components: {},

    mounted () {
      this.getUserInfo(),
      this.getCourseInfo()
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
        const url = '../examination/main?id=11'
        wx.navigateTo({ url })
      }
    },

    created () {
      // let app = getApp()
    }
  }
</script>

<style>
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
    	margin-top: 100rpx;
    	margin-left: 300rpx;

    	align-items: center;
    	border-bottom: 2rpx solid #919191;
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
 	height: 150rpx;
 	margin-left: 20rpx;
 	margin-top: 40rpx;
  background-color: #ff9800;
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
</style>
