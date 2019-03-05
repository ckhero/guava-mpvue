<template>
  <div>
    <view class='top-left'>
      <img class='userPic' :src='head'/>
      <view class=''>
        <view class='item'>姓名：{{name}}
		  <text style="margin-left: 280rpx;color: #B22222;" @click='buttonTap' type='primary'>规则</text></view>
		  <modal title="答题挑战规则说明" :hidden="modalHidden" @click="modalConfirm" showCancel="true" >
		    <view>
		      <img class="image" src="/static/images/learn.png" mode='aspectFill'/>
		    </view>		    
		  </modal>
        
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
      <view class='study'><text style="">英语 \n {{english.done}}/{{english.total}}</text></view>
      <view class='study'><text>数学 \n {{math.done}}/{{math.total}}</text></view>
      <view class='study'><text>逻辑 \n {{logic.done}}/{{logic.total}}</text></view>
    </view>
    <!--<button plain="true" @click="switchtostudy"
            style="border:10rpx;width: 250rpx;height: 250rpx;background-color: #5CACEE;border-radius: 125rpx;text-align: center;line-height: 100rpx;margin-left: auto;margin-right: auto;margin-top: 80rpx;color: #ffffff;font-size: 40rpx;text-align: center;">
      今日学习 \n {{right_type_num}}/{{type_num}}-->
       <view class='progress_box' @click="switchtostudy">
        <canvas class="progress_bg"   canvas-id="canvasProgressbg">  </canvas>
        <canvas class="progress_canvas"   canvas-id="canvasProgress">  </canvas>
        <view class="progress_text">
            <!--<view class="progress_dot"></view>-->
            <text style="font-weight:bold; ">
            	  {{right_type_num}}/{{type_num}}
            </text>
        </view>
    </view>

     <view  class='txt'><text style="border-bottom: 2rpx solid #919191;" @click="showContact">联系客服</text></view>
    <div class="mask" v-if="contact" @click="hideContact">
      <img src="../../../static/images/ck.jpeg" alt="" class="mask-img"/>
    </div>

     <!--<view class='container'>

		  <view class='txt' style="border-bottom: 2rpx solid #919191;" @click='buttonTap' type='primary'>联系客服</view>
		  <modal title="客服二维码" :hidden="modalHidden" @click="modalConfirm" >
		    <view>
		      <img class="image" src="/static/images/contact.png" mode='aspectFill'/>
		    </view>

		    <view>扫描上方二维码添加微信</view>

		  </modal>

</view>-->
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
      this.drawProgressbg()
		  this.drawCircle(1.5)
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
        const url = '../ansresult/main?id=11'
        wx.navigateTo({ url })
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

</style>
