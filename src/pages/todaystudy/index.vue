<template>
<view class="page">
  <image class="userPhoto"  :src="img_url"  mode="widthFix" />
 <button  @click="toanswer" style="border:0;width: 450rpx;height: 100rpx;background-color: #5CACEE;border-radius: 15rpx;text-align: center;line-height: 100rpx;margin-left: auto;margin-right: auto;margin-top: 80rpx;color: #ffffff;font-size: 40rpx;" >进入答题</button>
</view>

</template>

<script>
export default {
  data () {
    return {
      lesson_id: null,
      img_url: null
    }
  },
  onLoad (options) {
    wx.setNavigationBarTitle({
      title: '今日知识点回顾' // 页面标题为路由参数
    })
    this.getLessonDetail(options['id'])
  },
  methods: {
    toanswer () {
      const url = '../answer/main'
      wx.navigateTo({ url })
    },
    getLessonDetail (id) {
      this.api.v1.lesson.detail({
        id: id
      }).then(res => {
        this.img_url = res.data.lesson_datum.datum_detail
      })
    }
  }
}
</script>

<style>
	.userPhoto{
    width: 100%;
  }

</style>
