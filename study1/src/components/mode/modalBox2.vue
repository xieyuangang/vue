<template>
  <div class="modalBox1">
        父组件给子组件传内容
       <div style="width:300px;height: 300px;background:rgba(0,0,0,0.3);position: fixed;top: 60%;left: 30%">
        <slot name="title">默认标题</slot><!--插槽-->
        <slot name="name">默认标题</slot><!--插槽  name='名字'-->
        <slot name="default">默认标题</slot><!--插槽 default  默认-->
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
    //props:['m','p'],
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
