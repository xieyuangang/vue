<template>
     <div class='vueRouter'>
       asfasfasf
       <router-link to="/HelloWorld">HelloWorld</router-link>
       <router-link to="/style">style</router-link>
       <button @click="app">js跳转页面</button>
       <router-view/>
     </div>
</template>
<!--hash模式  开发时用hash不会导致404  上线时用h5的 history.pushState-->
<script>
    export default {
        name: "vueRouter",
        methods:{
          app(){
            this.$router.push('/HelloWorld')
          }
        }
    }
</script>

<style scoped>

</style>
