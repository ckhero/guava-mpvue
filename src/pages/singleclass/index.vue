<template>
<view class='shape'>   
    <view class='top-left'>
    	<view style="margin-left: 20rpx;font-weight:bold;">
    		学习列表:
    	</view>
    </view>
<div v-for="(studyPlan, index) in todayData" :key="index" >
	<div   v-for="(lessonInfo, index1) in studyPlan.lessons" :key="index1">
		<view :wx:if="lesson_id==1">
		  <view :wx:if="lessonInfo.lesson_type=='英语'" style="border-bottom: 1rpx solid #efefef;">
		<i-row offset="2" span="20" i-class="border" >	
		<i-col offset="2" span="12" style="line-height:125rpx;" >{{lessonInfo.lesson_type}}:{{lessonInfo.lesson_name}}</i-col>
		<i-col offset="2" span="4"><i-button  @click="toanswer(lessonInfo.lesson_id,lessonInfo.status)" style="color: #4876FF;"type="primary" inline="true" size="" i-class="buttonAnswer">{{(lessonInfo.status=="init")?"未完成":((lessonInfo.status=="lock")?"🔒":"已完成")}}</i-button></i-col>
		</i-row>	
		</view>
		</view>
		<view :wx:elif="lesson_id==2">
			<view :wx:if="lessonInfo.lesson_type=='数学'" style="border-bottom: 1rpx solid #efefef;">
				
		<i-row offset="2" span="20" i-class="border" >
			<i-col offset="2" span="12" style="line-height:125rpx;" >{{lessonInfo.lesson_type}}:{{lessonInfo.lesson_name}}</i-col>
			<i-col  offset="2" span="4"><i-button  @click="toanswer(lessonInfo.lesson_id,lessonInfo.status)" style="color: #4876FF;"type="primary" inline="true" size="" i-class="buttonAnswer">{{(lessonInfo.status=="init")?"未完成":((lessonInfo.status=="lock")?"🔒":"已完成")}}</i-button></i-col>
		</i-row>	
		</view>
		</view>
		<view :wx:elif="lesson_id==3">
			<view :wx:if="lessonInfo.lesson_type=='逻辑'" style="border-bottom: 1rpx solid #efefef;">
		<i-row offset="2" span="20" i-class="border" >	
		<i-col offset="2" span="12" style="line-height:125rpx;" >{{lessonInfo.lesson_type}}:{{lessonInfo.lesson_name}}</i-col>
		<i-col offset="2" span="4"><i-button  @click="toanswer(lessonInfo.lesson_id,lessonInfo.status)" style="color: #4876FF;"type="primary" inline="true" size="" i-class="buttonAnswer">{{(lessonInfo.status=="init")?"未完成":((lessonInfo.status=="lock")?"🔒":"已完成")}}</i-button></i-col>
		</i-row>	
			</view>
		</view>
	</div>
</div>
 </view>
</template>
<script>
  import card from '@/components/card'
  import global_ from '@/components/global'
  import request from '@/utils/request'
  var per=1
  export default {
	data(){
    	return {
    		todayData:null,
    		lesson_id:null
    }
    },
    components: {
    },
    mounted () {
		this.getEngLesson()
    },  
    onLoad (options) {
    this.lesson_id = options['id']
  },
    methods: {
      getEngLesson (res) {
        this.api.v1.lesson.list({}).then(res => {
          this.todayData=res.data
          console.log( this.todayData)
        })
      },
     toanswer(lesson_id,status){
     	const url="../todaystudy/main?id="+lesson_id
     	if(status=="init")
      	{
      		wx.navigateTo({url})
      	}
      	else
      	{     		
      	}     	
     }
     },
    created () {
      // let app = getApp()
    }
  }
</script>

<style>
.item{
	font-weight:bold;
}
.progress_box{
  position: relative;
  margin-left: 280rpx;
  width:250rpx;
  height: 250rpx;  

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
position: absolute; 
  display: flex;  
  text-align: center;
}
.progress_info{   
  font-size: 36rpx;

  padding-left: 14rpx;
  letter-spacing: 2rpx
} 
.progress_dot{
  width:16rpx;
  height: 16rpx;  
  border-radius: 50%;
  background-color: #fb9126;
}


.learnlength{width: 150rpx;
height: 150rpx;
margin-left: 280rpx;
text-align: center;
background-color: #ff5757;
border-radius: 75rpx;}
.txtstyle{
	text-align: center;
}
.top-left{
	display: flex;
	margin-top: 20rpx;
}
.allclass{
font-size: 30rpx;
margin-left: 380rpx;
}
.border{
margin-left:20rpx;
	border-bottom: 1rpx solid #efefef;
}
.row{display: flex;
  border-bottom: 1rpx solid #efefef;
    margin-left: 40rpx;
  margin-right: auto;}
.finish{
	margin-left: 300rpx;
}
.buttonAnswer{
margin-left:40rpx !important;
width:120rpx !important;
height:60rpx !important;
display: flex !important;
justify-content: center !important;
align-items: center !important;

  }

</style>
