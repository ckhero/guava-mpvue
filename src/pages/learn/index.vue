<template>
<view class='shape'>   

    <!--<i-row>
    <i-col offset="2" span="20">
        <i-row i-class="row-style">

    	    		<i-col span="4" style="font-weight:bold;">学习列表:</i-col>
    	    		<i-col offset="12" span="4">全部课程</i-col>
    	    	</i-row>

    </i-col>
    </i-row>-->
    <view class='top-left'>
    	<view style="margin-left: 20rpx;font-weight:bold;">
    		学习列表:
    	</view>
    	<view class='item'><a href="../allclass/main" target="_blank" class="allclass">全部课程 ></a>
    		
    	</view>
    </view>
<div v-for="(studyPlan, index) in todayData" :key="index" >
	<view class='item' style="margin-left: 20rpx;" >第{{ studyPlan.day }}天</view>
	<i-row  offset="2" span="20" i-class="border"  v-for="(lessonInfo, index1) in studyPlan.lessons" :key="index1">
		<i-col offset="2" span="10" style="line-height:125rpx" >{{lessonInfo.lesson_type}}:{{lessonInfo.lesson_name}}</i-col>
		<i-col offset="4" span="4"><i-button  @click="toanswer(lessonInfo.lesson_id,lessonInfo.status)" style=""type="primary" inline="true" size="" i-class="buttonAnswer">{{(lessonInfo.status=="init")?"未完成":((lessonInfo.status=="lock")?"锁":"已完成")}}</i-button></i-col>
	</i-row>
</div>
    <!--<view class='border' :wx:for="{{ todayData }}" 	wx:for-item="studyPlan" bindtap='' >
    	      <view class='item' >第{{ studyPlan.day }}天</view>
    	     </view>  	  
   </view>-->
    <!--<button  @click="toanswer" style="border:0;width: 450rpx;height: 100rpx;background-color: #5CACEE;border-radius: 15rpx;text-align: center;line-height: 100rpx;margin-left: auto;margin-right: auto;margin-top: 80rpx;color: #ffffff;font-size: 40rpx;" >开始答题</button>-->
 </view>
</template>
<script>
  import card from '@/components/card'
  import global_ from '@/components/global'
  import request from '@/utils/request'
  var per=1
  //var perNum=1

  export default {
	data(){
    	return {
    		todayData:null,
//  		todayData:[
//  			{
//  				day: null,
//  				lessons: [
//  					{lesson_id: 11, lesson_type: "英语", lesson_name: "第一天", status: "init"}
//  				]
//  			}
//  		],
    		done: null,
    		total:60,
    		perNum:null
    		
//      countTimer: null
    		
    }
    	},

    components: {
 
    },

    mounted () {
		this.getTodayLesson(),
		this.getUserInfo(),
		this.drawProgressbg()
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
          
//        this.setData({
//        	per:res.data.sign_day*2/this.total
//        })
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
      	
     },
     drawProgressbg(){
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('canvasProgressbg')
    ctx.setLineWidth(4);// 设置圆环的宽度
    ctx.setStrokeStyle('#c0c0c0'); // 设置圆环的颜色
    ctx.setLineCap('round') // 设置圆环端点的形状
    ctx.beginPath();//开始一个新的路径
    ctx.arc(55, 55, 50, 0, 2 * Math.PI, false);
    //设置一个原点(100,100)，半径为90的圆的路径到当前路径
    ctx.stroke();//对当前路径进行描边
    ctx.draw();
  },
  
// onReady() {
//  this.drawProgressbg(); 
//},
  drawCircle(step){  
    var context = wx.createCanvasContext('canvasProgress');
      // 设置渐变
      var gradient = context.createLinearGradient(100, 50, 50, 100);
      gradient.addColorStop("0", "#2661DD");
      gradient.addColorStop("0.5", "#40ED94");
      gradient.addColorStop("1.0", "#5956CC");
      
      context.setLineWidth(10);
      context.setStrokeStyle(gradient);
      context.setLineCap('round')
      context.beginPath(); 
      // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
      context.arc(55, 55, 50, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
      context.stroke(); 
      context.draw() 
  }
// onReady() {
//   this.drawProgressbg(); 
//   this.drawCircle(2) 
// }
// countInterval() {
// 
//  this.countTimer = setInterval(() => {
//    if (this.data.count <= 60) {
//       this.drawCircle(this.data.count / (60/2))
//      this.data.count++;
//    } else {
//      this.setData({
//        progress_txt: "匹配成功"
//      }); 
//      clearInterval(this.countTimer);
//    }
//  }, 100)
//},
// onReady: function () {
//  this.drawProgressbg();
//  // this.drawCircle(2) 
//  this.countInterval()
// } 

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
width:160rpx !important;
height:80rpx !important;

  }

</style>
