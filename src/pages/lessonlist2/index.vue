<template>
</template>

<script>
	export default {
  data () {
    return {
    searchStatus: false,
    goodsList: [],
    page: 1,
    size: 2,
    id: 0,
    loadingTxt: '',
    noMoreData: false,
    }
  },
  methods: {
    // 实例创建完成后调用数据
    created () {
      this.getList()
    },
    // 上拉触底事件
    onReachBottom () {
      if (this.page > this.total_page) {
        console.log('数据加载完了')
      } else {
        // 下一页
        this.page = this.page + 1
        this.getList()
      }
    },
    // 下拉刷新事件
    onPullDownRefresh () {
      // 初始化页码
      this.page = 1
      this.getList()
    },
    // 获取数据方法
    getList () {
      const that = this
      wx.request({
        method: 'post',
        url: 'https://guava.51qwer.com/v1/datum/list',
        data: {
          page: that.page // 传递页码
        },
        header: {
          'content-type': 'application/json'
        },
        success (res) {
          // 关闭下拉刷新动画
          wx.stopPullDownRefresh()
          // 返回的数据
          const data = res.data
          // 数据追加  data.list为返回的数据列表
          if (that.page > 1) {
            // 数据追加
            that.app_list.push(...data.list)
          } else {
            // 数据
            that.app_list = data.list
          }
          // 总页数
          that.total_page = data.total_page
        }
      })
    }
  }
}
</script>

<style>
</style>