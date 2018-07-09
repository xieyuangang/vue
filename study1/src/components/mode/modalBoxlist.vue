<template>
  <div class="modalBox1">
    切换组件
     <div v-for="a in p" :key="a.id">
        <h3>{{a.name}}</h3>
       <p>{{a.title}}</p>
       <h1>{{a.pay}}</h1>
     </div>
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
   /* props:{
      score:{
        type:Object
      }
    },*/
    props:['p'],
    methods: {}
  }
</script>

<style scoped>

</style>
