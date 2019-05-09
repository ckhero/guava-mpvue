<template>
<view class='shape'>   
    <view class='top-left'>
    	<view style="margin-left: 20rpx;font-weight:bold;">
    		学习列表:
    	</view>
    	<view class='item'><a href="../allclass/main" target="_blank" class="allclass">全部课程 ></a>
    		
    	</view>
    </view>
<div v-for="(studyPlan, index) in todayData" :key="index" >
	<view class='item' style="margin-left: 80rpx;" >第{{ studyPlan.day }}天</view>
	<i-row  offset="2" span="20" i-class="border"  v-for="(lessonInfo, index1) in studyPlan.lessons" :key="index1">
		<i-col offset="2" span="10" style="line-height:125rpx" >{{lessonInfo.lesson_type}}:{{lessonInfo.lesson_name}}</i-col>
		<i-col offset="4" span="4"><i-button  @click="toanswer(lessonInfo.lesson_id,lessonInfo.status)" style=""type="primary" inline="true" size="" i-class="buttonAnswer">{{(lessonInfo.status=="init")?"未完成":((lessonInfo.status=="lock")?"🔒":"已完成")}}</i-button></i-col>
	</i-row>
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
    		done: null,
    		total:60,
    		perNum:null
    }
    	},

    components: {
    },

    mounted () {
		this.getTodayLesson(),
		this.getUserInfo()
    },
    
    methods: {
      getTodayLesson (res) {
        this.api.v1.lesson.todaylesson({}).then(res => {
          this.todayData=res.data
          console.log( this.todayData)
        })
      },
      getUserInfo (res) {
        this.api.v1.user.info({}).then(res => {
          this.done = res.data.sign_day
          per=res.data.sign_day*2/this.total         
          this.perNum=Math.floor(100*this.done/this.total)
          this.drawCircle(per)
          console.log(res)  
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
