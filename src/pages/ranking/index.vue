<template>
  <div>
    <i-row>

          <i-col offset="8" span="8" i-class="col-class text-center">
            <i-avatar :src="head ? head : 'https://i.loli.net/2017/08/21/599a521472424.jpg'" size="large"></i-avatar>
          </i-col>
          <i-col span="24" i-class="col-class text text-center">
            {{name}}
          </i-col>
          <i-col span="24" i-class="col-class text text-center text-light-title">
            排名: 第 {{rank}} 名
          </i-col>

    </i-row>
    <div v-for="(item, index) in rankList" :key="index">
      <i-row>
        <i-col offset="1" span="22">
          <i-row i-class="row-style">
            <i-col span="2" i-class="col-class text">
              {{index + 1}}
            </i-col>
            <i-col span="2" i-class="col-class">
              <i-avatar :src="item.head_img ? item.head_img: 'https://i.loli.net/2017/08/21/599a521472424.jpg'" size="default"></i-avatar>
            </i-col>
            <i-col offset="2" span="14" i-class="col-class text">{{item.name}}</i-col>
            <i-col span="4" i-class="col-class text text-light">{{item.point}} 分</i-col>
          </i-row>
        </i-col>
      </i-row>
    </div>
    <i-row>
      <i-col offset="1" span="22">
        <i-divider content="加载已经完成,没有其他数据" color="#2d8cf0" lineColor="#2d8cf0"></i-divider>
      </i-col>
    </i-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        rankList: null,
        name: null,
        head: null,
        sign_day: null,
        point: null,
        rank: null
      }
    },

    components: {},

    mounted () {
      this.getRanklist()
      this.getUserInfo()
    },

    methods: {
      getRanklist () {
        this.api.v1.rank.list({}).then((res) => {
          this.rankList = res.data
          console.log(this.rankList)
        })
      },
      getUserInfo (res) {
        this.api.v1.user.info({}).then(res => {
          this.name = res.data.name
          this.head = res.data.head_img
          this.point = res.data.point
          this.rank = res.data.rank
        })
      }
    },

    created () {
      // let app = getApp()
    }
  }
</script>
<style>
  .row-style {
    border-bottom:1rpx solid #dddee1;
    padding: 8rpx;
  }
  .text {
    line-height: 64rpx;
    height: 64rpx;
    font-size: 30rpx;
  }
  .text-light {
    color:#80848f;
  }
  .text-center {
    text-align: center;
  }
  .text-light-title {
    color:#80848f;
    line-height: 40rpx;
    height: 40rpx;
    font-size: 30rpx;
  }
</style>
