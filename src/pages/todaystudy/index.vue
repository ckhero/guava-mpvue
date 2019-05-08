<template>
<view class="page">
  <image class="userPhoto"  :src="img_url"  mode="widthFix" />
  <i-button @click="getPay(lesson_id)" type="primary" long="true" size	="large" i-class="buttonAnswer">开始答题</i-button>
</view>

</template>

<script>
export default {
  data () {
    return {
      lesson_id: null,
      img_url: null,
      status:null
    }
  },
  onLoad (options) {
    this.lesson_id = options['id']
    this.getLessonDetail(options['id'])
  },
  methods: {
    toanswer () {
      const url = '../examination/main?id=' + this.lesson_id
      wx.navigateTo({ url })
    },
    getLessonDetail (id) {
      this.api.v1.lesson.detail({
        id: id
      }).then(res => {
        this.img_url = res.data.lesson_datum.datum_detail
      })
    },
    getPay (lesson_id) {
         this.api.v1.lesson.pay_status({
         	id:lesson_id
         }).then(res => {
        console.log(res)
        if(res.data.status) {
        	const url = '../examination/main?id=' + this.lesson_id
      wx.navigateTo({ url })
        }
        else{
        	this.api.v1.order.book({
       }).then(res => {
         let orderNo = res.data.orderNo
         let _this = this
         wx.requestPayment(
           {
             'timeStamp': res.data.timeStamp,
             'nonceStr': res.data.nonceStr,
             'package': res.data.package,
             'signType': 'MD5',
             'paySign': res.data.paySign,
             'success': function (res) {
               console.log('success')
               console.log(res)
             },
             'fail': function (res) {
               console.log('fail')
               console.log(res)
               _this.api.v1.order.fail({
                 order_no: orderNo
               }).then(res => {
               })
             },
             'complete': function (res) {
               console.log('complete')
               console.log(res)
               
             }
           })
       })
        }
      })
         
         
         
        
    }
  }
}
</script>

<style>
	.userPhoto{
    width: 100%;
  }
  .buttonAnswer{
    position:fixed !important;
    bottom:0px !important;
    width:100% !important;
  }
</style>
