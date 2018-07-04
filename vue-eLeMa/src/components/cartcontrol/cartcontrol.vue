<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart">
        <span class="inner">-</span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click="addCart">+</div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue' // 接口

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) { // 阻止非vue事件
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1) // 通知 由于Javascript的限制，Vue不能自动检测以下变动的数组 所以需要 Vue.set触发
        } else {
          this.food.count++
        }
        this.$emit('add', event.target)
      },
      decreaseCart(event) {
        if (!event._constructed) { // 阻止非vue事件
          return
        }
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    .cart-decrease
      display inline-block
      opacity: 1
      transform: translate3d(0, 0, 0)
      .inner
        display: inline-block
        background #00A0DC
        padding 4px 7px
        border-radius 50px
        color #fff
        transition: all 0.4s linear
        transform: rotate(0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .cart-count
      display inline-block
      color #91969A
    .cart-add
      display inline-block
      background #00A0DC
      padding 4px 7px
      border-radius 50px
      color #fff
</style>
