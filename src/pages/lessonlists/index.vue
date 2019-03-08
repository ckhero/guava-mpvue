<template>
	<!--<div class="goods-box" v-for="(item, index) in rankList" :key="index" bindtap="toDetailsTap" :data-id="item.id">
           <view class="goods-title">{{item.productName}}</view>
           <view style='display:flex;'>
            <view class="goods-price">¥ {{item.salePrice}}</view>
            <view wx:if="{{item.marketPrice && item.marketPrice > 0}}" class="goods-price" style='color:#aaa;text-decoration:line-through'>¥ {{item.marketPrice}}</view>
           </view>           
    </div>-->
  <div>
    <div class="goods-box" v-for="(item, index) in rankList" :key="index" bindtap="toDetailsTap" :data-id="item.id">
      <i-row>
        <i-col offset="1" span="22">
          <i-row i-class="row-style">
            <i-col span="2" i-class="col-class text">
              {{index + 1}}
            </i-col>
            <i-col span="2" i-class="col-class">
            	  {{item.datum_detail_type}}
              <!--<i-avatar :src="item.head_img ? item.head_img: 'https://i.loli.net/2017/08/21/599a521472424.jpg'" size="default"></i-avatar>-->
            </i-col>
            <i-col offset="2" span="4" i-class="col-class text">{{item.datum_name}}</i-col>
            <i-col offset="2" span="10" i-class="col-class text text-light">{{item.datum_detail}} </i-col>
          </i-row>
        </i-col>
      </i-row>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      	rankList:null,
      	 keyword: '',
	    searchStatus: false,
	    goodsList: [],
	    page: 1,
	    size: 2,
	    id: 0,
	    loadingTxt: '',
	    noMoreData: false
      }
    },

    components: {},

    mounted () {
      this.getRanklist()
    },

    methods: {
      getRanklist () {
        this.api.v1.datum.list({
        	page_size:5
        }).then((res) => {
          this.rankList = res.data
          console.log(this.rankList)
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
  .loading{
text-align: center;
font-size: 12px;
margin: 10px 0;
}
</style>
