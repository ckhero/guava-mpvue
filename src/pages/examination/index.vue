<template>
  <div>
    <i-row>
      <i-col span="8" i-class="col-class"><text class="title">  单项选择题</text></i-col>
      <i-col span="8" i-class="col-class" style="text-align: center"><text class="title">{{currQuestionNum}}/{{total}}</text></i-col>
      <i-col span="8" i-class="col-class"><i-button @click="preSubmit()" type="primary" inline ="true" i-class="submitButton">交卷</i-button></i-col>
      <i-col span="24" i-class="col-class"><text class="title">  题目</text></i-col>

      <i-col span="24" i-class="col-class spanMain">
        <view  :wx:if="question.lesson_question_type === 'img'"><image bindtap='previeIm' class="userPhoto"  :src="question.lesson_question_detail"   mode="widthFix" /></view>
        <view wx:else><text class="textMain">{{ question.lesson_question_detail}}</text></view>
      </i-col>
      <i-col span="24" i-class="col-class"><text class="title" style="margin-top:40rpx">  选项</text></i-col>
      <div v-for="(option, index) in question.options" :key="index">
        <view  :wx:if="option.check == true">
          <i-col span="24" i-class="col-class option check" @click="choseOption(option.lesson_question_item_option)">
            <i-col span="3" i-class="col-class spanMain2"><text class="textMain">{{option.lesson_question_item_option}}. </text></i-col>
            <i-col span="20" i-class="col-class"><text class="textMain" style="margin-right: 30rpx">  {{option.lesson_question_item_detail}}</text></i-col>
          </i-col>
        </view><view wx:else>
        <i-col span="24" i-class="col-class option" @click="choseOption(option.lesson_question_item_option)">
          <i-col span="3" i-class="col-class spanMain2"><text class="textMain">{{option.lesson_question_item_option}}. </text></i-col>
          <i-col span="20" i-class="col-class"><text class="textMain" style="margin-right: 30rpx">  {{option.lesson_question_item_detail}}</text></i-col>
        </i-col>
      </view>
      </div>
     </i-row>
    <i-row i-class="preBotton">
      <i-col offset="4" span="6" i-class="col-class"><i-button @click="preQuestion" type="primary">上一题</i-button></i-col>
      <i-col offset="4" span="6" i-class="col-class"><i-button @click="nextQuestion" type="primary">下一题</i-button></i-col>
    </i-row>
    <i-modal title="交卷确认" :visible="submitConfirm" @ok="submit()" @cancel="cancel()">
      <view>提交后无法撤销～！～</view>
    </i-modal>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        submitConfirm: false,
        total: null,
        currQuestionNum: 1,
        questions: [],
        question: [],
        options: [],
        answer: {
          id: '',
          options: []
        },
        test: null
      }
    },
   
    onLoad (options) {
      this.question = []
      this.submitConfirm = false
      this.getLessonDetail(options['id'])
      this.lesson_id = options['id']
    },

    components: {},

    mounted () {
      this.currQuestionNum = 1
    },
    computed: {
      question (val) {
        return this.questions[this.currQuestionNum]
      }
    },
    watch: {
      currQuestionNum (val) {
        this.question = this.questions[val]
      }
    },
    methods: {
    	 previeIm:function(e) {

		var img = e.currentTarget.dataset.src;  //需要保存图片的路径
		
		console.log(img);
		
		wx.previewImage({
		
		current: img, // 当前显示图片的http链接
		
		urls: [img] // 需要预览的图片http链接列表
		
		})
		
		},
    	
      getLessonDetail (id) {
        this.api.v1.lesson.detail({
          id: id
        }).then(res => {
          this.answer.id = res.data.lesson_id
          this.questions = res.data.questions
          this.question = this.questions[this.currQuestionNum]
          this.options = this.questions[this.currQuestionNum].options
          this.total = Object.keys(this.questions).length
          this.answer.id = id
        })
      },
      choseOption (optionId) {
        this.answer.options.push({lesson_question_id: this.question.lesson_question_id, option: optionId})
        Object.keys(this.questions[this.currQuestionNum].options).forEach((item, index) => {
          this.questions[this.currQuestionNum]['options'][item]['check'] = item === optionId
        })
        this.$set(this.questions[this.currQuestionNum], 'options', this.questions[this.currQuestionNum]['options'])
        if (this.currQuestionNum < this.total) {
          this.currQuestionNum += 1
        } else {
          this.currQuestionNum = this.currQuestionNum
          this.preSubmit()
        }
      },
      submit () {
        this.api.v1.examination.submit(this.answer).then((res) => {
          const url = '../ansresult/main?id=' + this.lesson_id
          wx.navigateTo({ url })
        })
      },
      cancel () {
        this.submitConfirm = false
      },
      preSubmit () {
        this.submitConfirm = true
      },
      preQuestion () {
        if (this.currQuestionNum > 1) {
          this.currQuestionNum -= 1
        } else {
          wx.showToast({
            title: '已经是第一题',
            icon: 'none'
          })
        }
      },
      
      nextQuestion () {
        if (this.currQuestionNum < this.total) {
          this.currQuestionNum += 1
        } else {
          wx.showToast({
            title: '已经是最后一题',
            icon: 'none'
          })
        }
      }
    },
    created () {
      // let app = getApp()
    }
  }
</script>

<style>
  .preBotton {
    margin-top: 100rpx;
  }
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
    margin: 10rpx 0rpx !important;
    padding: 30rpx 0rpx !important;
  }
  .check{
    background:#2d8cf0!important;
    color:white;
  }
</style>
