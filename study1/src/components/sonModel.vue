<template>
  <div>2号{{m}} <button @click="app">点击</button> </div>
</template>

<script>
export default {
  name: 'sonModel',
  data () {
    return {}
  },
  props: ['m'], // 父传子的值
  methods: {
    app () {
      this.$emit('update:m', 600) // 触发自己的自定义事件
    }
  }
}
</script>

<style scoped>

</style>
