<template>
  <div>
    <mptoast />
  </div>
</template>

<script>
  import mptoast from 'mptoast'

  export default {
    components: {
      mptoast
    },
    data () {
      return {}
    },
    methods: {
      showToast (message) {
        this.$mptoast(message)
      }
    }
  }
</script>
