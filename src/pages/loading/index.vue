<template>
<image class='picture'  ></image>
</template>

<script>
  import card from '@/components/card'
  import global_ from '@/components/global'
  import request from '@/utils/request'

  export default {
    data () {
      return {
        motto: 'Hello miniprograme',
        userInfo: {
          nickName: 'mpvue',
          avatarUrl: 'http://mpvue.com/assets/logo.png'
        }
      }
    },

    components: {
      card
    },

    mounted () {
      this.getSetting()
    },

    methods: {
      bindViewTap () {
        const url = '../logs/main'
        if (mpvuePlatform === 'wx') {
          mpvue.switchTab({ url })
        } else {
          mpvue.navigateTo({ url })
        }
      },
      getSetting () {
      	const url = '../homepage/main'
      	
        wx.getSetting({
          success: function (res) {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: function (res) {
                  var iv = res.iv
                  var encryptData = res.encryptedData
                  console.log(res)
                  // 用户已经授权过
                  wx.navigateTo({url})
                  console.log('用户已经授权过')
                  wx.login({
                    success (res) {
                      if (res.code) {
                        request.post({
                          url: request.loginUrl,
                          data: {
                            'code': res.code,
                            'iv': iv,
                            'encrypt_data': encryptData
                          }
                        }).then(res => {
                          global_.xToken = res.data.token
                        })
                      } else {
                        
                        console.log('登录失败！' + res.errMsg)
                      }
                    }
                  })
                }
              })
            } else {
              const url = '../index/main'
              wx.navigateTo({url})
              console.log('用户还未授权过')
              
            }
          }
        })
      },
      getUserInfo1 () {
        console.log('click事件首先触发')
        // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
        // console.log(wx.canIUse('button.open-type.getUserInfo'))
        if (wx.canIUse('button.open-type.getUserInfo')) {
          // 用户版本可用
        } else {
          console.log('请升级微信版本')
        }
      },
      bindGetUserInfo (e) {
        // console.log(e.mp.detail.rawData)
        if (e.mp.detail.rawData) {
          // 用户按了允许授权按钮
          console.log('用户按了允许授权按钮')
          this.getSetting()
        } else {
          // 用户按了拒绝按钮
          console.log('用户按了拒绝按钮')
        }
      }
    },

    created () {
      // let app = getApp()
    }
  }
</script>

<style>
</style>