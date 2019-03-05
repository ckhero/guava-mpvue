<template>
  <image class='picture'></image>
</template>

<script>
  import {doLogin} from '@/utils/login'
  export default {

    mounted () {
      doLogin()
    },

    methods: {
      bindGetUserInfo (e) {
        // console.log(e.mp.detail.rawData)
        if (e.mp.detail.rawData) {
          // 用户按了允许授权按钮
          console.log('用户按了允许授权按钮')
          doLogin()
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
