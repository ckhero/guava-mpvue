<template>
<view class="page">
  <image class="userPhoto"  :src="img_url"  mode="widthFix" />
  <i-button @click="toanswer" type="primary" long="true" size	="large" i-class="buttonAnswer">开始答题</i-button>
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
