<template>
<image class='picture'  ></image>
</template>

<script>
  import card from '@/components/card'
  import global_ from '@/components/global'
  import request from '@/utils/request'

  export default {
    

    mounted () {
      this.getSetting()
    },

    methods: {
      
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