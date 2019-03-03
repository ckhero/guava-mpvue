<template>
  <div>
    <i-row>
      <i-col span="8" i-class="col-class"><text class="title">  单项选择题</text></i-col>
      <i-col span="8" i-class="col-class" style="text-align: center"><text class="title">{{currNum}}/{{total}}</text></i-col>
      <i-col span="8" i-class="col-class"><i-button bind:click="handleClick" type="primary" inline ="true" i-class="submitButton">交卷</i-button></i-col>
      <i-col span="24" i-class="col-class"><text class="title">  题目</text></i-col>
      <i-col span="24" i-class="col-class spanMain"><text class="textMain">{{ question.lesson_question_detail}}</text></i-col>
      <i-col span="24" i-class="col-class"><text class="title" style="margin-top:40rpx">  选项</text></i-col>
      <!--<i-clo span="24" i-class="col-class" v-for="(item,key,index) of items">-->
        <i-col span="3" i-class="col-class spanMain2"><text class="textMain">a</text></i-col>
        <i-col span="20" i-class="col-class"><text class="textMain" style="margin-right: 30rpx">  213131312312312312312213131312312312312312213131312312312312312213131312312312312312</text></i-col>

      <!--</i-clo>-->
          </i-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        total: 5,
        currQuestionNum: 1,
        currNum: 2,
        questions: [],
        question: []
      }
    },
    onLoad (options) {
      this.getLessonDetail(options['id'])
    },

    components: {},

    mounted () {
    },

    methods: {
      getLessonDetail (id) {
        this.api.v1.lesson.detail({
          id: id
        }).then(res => {
          this.questions = res.data.questions
          this.question = this.questions[this.currQuestionNum]
          console.log(res.data)
        })
      }
    },

    created () {
      // let app = getApp()
    }
  }
</script>

<style>
  .title {
    color: #595757;
    font-size: 30rpx;
    height: 40rpx;
    line-height: 30rpx;
    padding: 5rpx 20rpx;
  }
  .spanMain {
    padding: 30rpx;
  }

  .spanMain2 {
    padding: 0rpx 30rpx;
  }
  .textMain{
    word-wrap: break-word;
    word-break: normal;
  }
  .submitButton {
    height:60rpx !important;
    font-size:30rpx !important;
    line-height:30rpx  !important;
    padding:15rpx !important;
    float:right !important;
    margin:0rpx 20rpx !important;
  }
</style>
