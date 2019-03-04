<template>
  <image class='picture'></image>
</template>

<script>
  import {setToken, getToken} from '@/utils/token'
  export default {

    mounted () {
      this.getSetting()
    },

    methods: {

      getSetting () {
        let self = this
        let url = self.global.homePageUrl
        wx.getSetting({
          success: function (res) {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: function (res) {
                  var iv = res.iv
                  var encryptData = res.encryptedData
                  console.log(res)
                  // 用户已经授权过
                  console.log('用户已经授权过22')
                  if (getToken()) {
                    wx.navigateTo({ url })
                    return true
                  }
                  wx.login({
                    success (res) {
                      if (res.code) {
                        self.api.v1.user.login({
                          'code': res.code,
                          'iv': iv,
                          'encrypt_data': encryptData
                        }).then(res => {
                          setToken(res.data.token)
                          wx.navigateTo({ url })
                        })
                      } else {
                      	
                        console.log('登录失败！' + res.errMsg)
                      }
                    }
                  })
                }
              })
            } else {
            	//console.log(url)
            	const url="../index/main"
              wx.navigateTo({ url })
             // console.log(this.url)

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
