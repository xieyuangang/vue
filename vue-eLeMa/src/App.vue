<template>
  <div class="app">
    <hello :seller="seller"></hello>
    <div class="navs">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import Hello from './components/header/header.vue'

  const ERR_OK = 0
  export default {
    data() {
      return {
        seller: {}
      }
    },
    created() {
      //console.log(this.$route)
      /*let  url = location.search
      console.log(url)*/
      this.$http.get('http://192.168.3.198:8080/api/seller').then(response => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.seller = response.data
        }
      })
    },
    components: {
      Hello
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    width 100%
    .navs
      display -webkit-flex
      height 40px
      justify-content space-around
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
    .tab-item
      flex 1
      text-align center
      line-height 40px
      font-size: 14px
      color rgb(78, 85, 93)
    a
      display block
      font-size 14px
      color rgb(77, 85, 93)
    & .active
      color rgb(240, 20, 20)
</style>
