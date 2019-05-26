<template>
  <div>
    
    <div v-for="(item, index) in questions" :key="index">
      <i-row>
        <i-col offset="1" span="22">
          <i-row i-class="row-style">
            {{item.lesson_question_explanation}}
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
      	lesson_id:null,
        submitConfirm: false,
        total: null,
        currQuestionNum: 1,
        questions: [],
        question: [],
        
        
        test: null
      }
    },
    onLoad (options) {
    this.lesson_id = options['id'],
    this.getLessonReview (options['id'])
  },

    components: {},

    mounted () {
      
     this.getUserInfo()
    },

    methods: {
    	getLessonReview (id) {
        this.api.v1.lesson.review({
          id: id
        }).then(res => {
          this.questions = res.data.questions
          
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
