<template>
  <div class="modalBox1">
       <div v-show="m"  :style="{background:p}" style="width:300px;height: 300px;background:rgba(0,0,0,0.3);position: fixed;top: 15%;left: 30%">
           <div>
             父组件传值子组件传值
             <button @click="app">X</button>
             {{ha}}{{m}}|  {{p}}
           </div>
       </div>
  </div>
</template>
<script>
  export default {
    name: 'modalBox1',
    data () {
      return {
        ha:'谈谈谈'
      }
    },
    props:['m','p'],
    methods: {
         app(){
           this.$emit('update:m', false)
           this.$emit('update:p', 'pink')
         }
    }
  }
</script>

<style scoped>

</style>
