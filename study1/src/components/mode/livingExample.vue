<template>
  <div class="btn" :class="[color]" style="margin-top: 20px;">1
    <div ref="hide"> <slot name="title"></slot></div>
    <button  @click="say" class="btn btn-primary">点击</button>
  </div>
</template>
<script>
  export default {
    name: "livingExample",
    computed:{
      color(){return 'btn-'+this.type}
    },
    props:{
      type:{ //验证类型
        type:[String],  //数据类型
        default:'success' // 默认
      }
    },
    methods:{
      say(){
        this.$emit('but',this.$refs.hide.innerText)
      }
    }
  }
</script>

<style scoped>

</style>
