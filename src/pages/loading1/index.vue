<template>
  <div>
    <button open-type="getUserInfo" @getuserinfo="bindgetuserinfo">用户授权</button>
  </div>
</template>
<script>
  import card from '@/components/card'
  import global_ from '@/components/global'
  import request from '@/utils/request'

  export default {
    data () {
      	
      return {}
      
    },

    components: {},

    mounted () {
      this.getSetting()
    },

    methods: {
      getSetting (res) {
	        request.post({
	          url: request.userInfoUrl,
	          data: {
	             
	          }
	        }).then(res => {
	        	  console.log(res)
	        	 
	          global_.xToken = res.data.token
	         
	        })
	      } ,
                   
            
      
    },

    created () {
      // let app = getApp()
    }
  }  
</script>
<style></style>