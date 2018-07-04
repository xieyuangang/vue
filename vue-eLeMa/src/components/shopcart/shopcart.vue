<template>
  <div class="shopcart">
    <div class="console">
      <div class="console-left">
        <div class="log">
          <div class="logo-wrapper" :class="{'highlight':totalCount>0}">
            <i class="iconfont icon-ai66" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="label" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="money" :class="{'highlight':totalCount>0}">￥{{totalPrice}}</div>
        <div class="distribution">另需配送费{{deliveryPrice}}元</div>
      </div>
      <div class="console-right" :class="payClass">{{payDesc}}</div>
    </div>
    <div class="ball-container">
      <div v-for="ball in balls" :key="ball.id">
        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 10,
              count: 2
            }
          ]
        }
      },
      minPrice: {
        type: Number,
        default: 0
      },
      deliveryPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      }
    },
    computed: {
      totalPrice() {
        let total = 0
        this.selectFoods.forEach((fodd) => {
          total += fodd.price * fodd.count
        })
        return total
      },
      totalCount() {
        let count = 0
        this.selectFoods.forEach((fodd) => {
          count += fodd.count
        })
        return count
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}起送` // 反引号 es6的特性 相当于拼接字符串
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差${diff}元起送`
        } else {
          return '去结算'
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      }
    },
    methods: {
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeDrop(el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      dropping(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
          el.addEventListener('transitionend', done)
        })
      },
      afterDrop(el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./../../common/font/iconfont.css";
  .shopcart
    position fixed
    left 0
    bottom 0
    width 100%
    height 48px
    z-index 50
    .console
      display -webkit-flex
      .console-left
        flex 1
        background #141D27
        display -webkit-flex
        .log
          display inline-block
          vertical-align top
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background #141d27
          .logo-wrapper
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background #2b343c
            &.highlight
              background rgb(0, 160, 220)
            i
              width 100%
              height 100%
              border-radius 50%
              text-align center
              background #2b343c
              font-size 43px
              &.highlight
                background rgb(0, 160, 220)
                color #fff
          .label
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #fff
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .money
          display inline-block
          vertical-align top
          margin-top 12px
          line-height 24px
          height 25px
          padding-right 12px
          box-sizing border-box
          font-size 16px
          font-weight 700
          color #979A9C
          border-right 1px solid #979A9C
          &.highlight
            color #ff
        .distribution
          display inline-block
          vertical-align top
          margin 12px 0 0 12px
          line-height 24px
          font-size 10px
          color #979A9C
      .console-right
        width 105px
        background #2B333B
        font-size 12px
        color #979A9C
        font-weight 700
        line-height 48px
        text-align center
        padding 0 8px
        box-sizing border-box
        &.not-enough
          background #2b333b
        &.enough
          background #00b43c
          color #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
</style>
