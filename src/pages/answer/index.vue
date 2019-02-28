<template>
 <view class="page">
  <view class='top'>
    <view class='topLeft'><text style='margin-left:20rpx;'>单项选择</text></view>
    <view class='topRight'>
      <view class='topRightContent'>
        <text style='font-style:italic;margin-right:10rpx;'>{{nowQuestionNumber+1}}</text><text> / 5</text>
      </view>
    </view>
  </view>

  <view class='questionTitle'>
    题目{{}}
  </view>

  <view class='questionOption'  >
    <view :class="choseA==true? 'choseA':'noChoseA'" bindtap='choseItem' data-choseitem="A">A. {{}}</view>
    <view :class="choseB==true? 'choseB':'noChoseB'" bindtap='choseItem' data-choseitem="B">B. {{}}</view>
            <view :class="choseC==true? 'choseC':'noChoseC'" bindtap='choseItem' data-choseitem="C">C. {{}}</view>
            <view :class="choseD==true? 'choseD':'noChoseD'" bindtap='choseItem' data-choseitem="D">D. {{}}</view>
        
  </view>  	
 




  


   
   <view class='bottom'>
    <button class='afterQuestion' @click='toresult'>交卷</button>
  </view> 
  
</view>




</template>

<script>
  export default {
    data () {
      	
      return {}
      
    },

    components: {},

    mounted () {
     
    },

    methods: {
       toresult(){
       	const url = '../ansresult/main'
        wx.navigateTo({ url })
       }                     
    },

    created () {
      // let app = getApp()
    }
  }  
</script>

<style>
.page{
    font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, 'Droid Sans Fallback', 'Microsoft Yahei', sans-serif;
    height: 1000rpx;
    background: #ffffff;
    margin: 15rpx 15rpx 70rpx 15rpx;
     position: relative;
      z-index: 2;
}

.top{
  height: 70rpx;
  width: 100%;
  border-bottom: 1px solid #c9c9d8;
}

.topLeft{
  font-size:30rpx;
  display:flex;
  align-items:center;
  float: left;
  width: 50%;
  height: 100%;
}

.topRight{
  display:flex;
  align-items:center;
  float: right;
  width: 50%;
  height: 100%;
}

.topRightContent{
  position: fixed;
  margin-right: 20rpx;
  right: 0;
  text-align: right;
}

.item{
  width: 100%;
  display:flex;
  align-items:center;
  margin:50rpx 20rpx 0rpx 30rpx
}

.questionTitle{
    color: #595757;
  margin: 30rpx 20rpx 0rpx 20rpx;
  font-size: 30rpx;
}



.correctCharacter{
  border:1px #1bd0bd solid;
  background-color: #1bd0bd;
  color: white;
}



.blankCharacter{
  border:1px #959595 solid;
  background-color: white;
}

.character{
  width: 40px;
  height: 40px;
  text-align: center;
  border-radius: 100px;
  justify-content:center;
  display:flex;
  align-items:center;
  float: left;
}

.option{
  color: #595757;
  font-size: 35rpx;
  float: left;
  margin-left: 20rpx;
  width: 80%;
}



.lastQuestion{
  font-size: 30rpx;
  padding: 10rpx;
  margin-right: 30rpx;
  text-align: center;
  justify-content:center;
  display:flex;
  align-items:center;
  color: #ffffff;
  position: fixed;
  bottom: 130rpx;
  right: 0;
  background-color: #1bd0bd;
  border-radius: 15rpx;
}


 .bottom{
  width: 100%;
  position: absolute;
  bottom: 0rpx;
  height: 100rpx;
  border-top: 3px solid #c9c9d8;
  display:flex;
   align-items:center;
  justify-content:space-around;
}
.middle{
  margin: 0 auto;
  text-align: center;
  justify-content:center;
  display:flex;
  align-items:center;
}


.afterQuestion,.submit{
  font-size: 30rpx;
  border: 2rpx solid #959595;
  padding: 10rpx 25rpx 10rpx 25rpx;
  border-radius: 15rpx;
}



.leftIcon{
  width: 70rpx;
  height: 70rpx;
}

.bottimBG{
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 150rpx;
   z-index: 1;
}

.noChoseA,.noChoseB,.noChoseC,.noChoseD{
  background-color: #f0f5fb;
  line-height: 70rpx;
  font-size: 30rpx;
  margin: 20rpx 20rpx 20rpx 20rpx;
  padding-left: 20rpx;
  color: #363637;
  border-radius: 5rpx;
}

.choseA,.choseB,.choseC,.choseD{
  background-color: #ffffff;
  color: #7a89df;
  border: 1rpx #7a89df solid;
  line-height: 68rpx;
  font-size: 30rpx;
  margin: 20rpx 20rpx 20rpx 20rpx;
  padding-left: 20rpx;
  border-radius: 5rpx;
}

</style>
