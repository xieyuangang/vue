<template>
  <div class="modalBox1">
        父组件调用子组件
     <div v-show="flag">调用的元素</div>
  </div>
</template>
<script>
  export default {
    name: 'modalBox1',
    data () {
      return {
         flag:true
      }
    },
    methods: {
        hide(){ //方法
          this.flag=false
        }
    }
  }
</script>

<style scoped>

</style>
