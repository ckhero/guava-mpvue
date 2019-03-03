<template>
  <div>
    <i-row>
      <i-col span="8" i-class="col-class"><text class="title">  单项选择题</text></i-col>
      <i-col span="8" i-class="col-class" style="text-align: center"><text class="title">{{currQuestionNum}}/{{total}}</text></i-col>
      <i-col span="8" i-class="col-class"><i-button bind:click="handleClick" type="primary" inline ="true" i-class="submitButton">交卷</i-button></i-col>
      <i-col span="24" i-class="col-class"><text class="title">  题目</text></i-col>
      <i-col span="24" i-class="col-class spanMain"><text class="textMain">{{ question.lesson_question_detail}}</text></i-col>
      <i-col span="24" i-class="col-class"><text class="title" style="margin-top:40rpx">  选项</text></i-col>
      <div v-for="(option, index) in question.options" :key="index">
        <i-col span="24" i-class="col-class option" @click="choseOption(option.lesson_question_item_option)">
          <i-col span="3" i-class="col-class spanMain2"><text class="textMain">{{option.lesson_question_item_option}}.</text></i-col>
          <i-col span="20" i-class="col-class"><text class="textMain" style="margin-right: 30rpx">  {{option.lesson_question_item_detail}}</text></i-col>
        </i-col>
      </div>
     </i-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        total: null,
        currQuestionNum: 1,
        questions: [],
        question: [],
        answer: {
          id: '',
          options: []
        }
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
          this.answer.id = res.data.lesson_id
          this.questions = res.data.questions
          this.question = this.questions[this.currQuestionNum]
          this.total = Object.keys(this.questions).length
          this.answer.id = id
        })
      },
      choseOption (optionId) {
        this.answer.options[this.question.lesson_question_id] = {lesson_question_id: this.question.lesson_question_id, option: optionId}
        if (this.currQuestionNum < this.total) {
          this.currQuestionNum += 1
          this.question = this.questions[this.currQuestionNum]
        } else {

        }

        console.log(this.answer)
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
  .option{
    margin: 40rpx 0rpx !important;
  }
</style>
