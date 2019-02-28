<template>
	
    
	<view class="page">
  
  <scroll-view  class='messScroll' scroll-y  bindscrolltolower="" >
    <view class='rankList' :wx:for="rankList" wx:for-item="i" bindtap='' data-index="index">
    <view class="item">
      <img class="userPhoto"    :src="i.head_img" />
      <view class='middle'>
          {{i.name}}
      </view>
      <view class='score'>
          {{i.point}}
      </view>
      <view class='frequency'>
            {{i.levle_name}}
      </view>
          
      </view>
    </view>
  </scroll-view>
 
</view>
	
</template>

<script>
  import card from '@/components/card'
  import global_ from '@/components/global'
  import request from '@/utils/request'

  export default {
    data () {
    	return {
    	rankList:null,
     
     
    	}
    },

    components: {},

    mounted () {
      this.getRanklist()
    },

    methods: {
      getRanklist(res) {
	        request.post({
	          url: request.rankListUrl,
	          data: {
	          }
	        }).then(res => {
           this.head_img=res.data.head_img
           this.rankList=res.data
           console.log(res.data)
	         

	        })
	      } ,



    },

    created () {
      // let app = getApp()
    }
  }
</script>

<style>
	.userPic{

  width: 120rpx;
  height: 120rpx;
    margin: 10rpx 20rpx 10rpx 15rpx;}
    .messScroll{
   height: 1000rpx;
}
.item{
  display: flex;
  align-items:center;
  height: 130rpx;
  border-bottom: 1rpx solid #efefef;
  padding: 10rpx 0rpx 10rpx 0rpx;
  justify-content:space-around;
}
.userPhoto{
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    padding: 0;
    margin: 0;
}
.score{
  text-align: center;
  float: left;
  width: 30%;
  font-size: 45rpx;
  color: #f74b4b;
}
.page{
    font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, 'Droid Sans Fallback', 'Microsoft Yahei', sans-serif;
    height: 1000rpx;
    background: #ffffff;
    margin: 15rpx 15rpx 70rpx 15rpx;
     position: relative;
      z-index: 2; 
}

.messScroll{
   height: 1000rpx;
}
</style>
