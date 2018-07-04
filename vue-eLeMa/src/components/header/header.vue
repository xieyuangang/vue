<template>
  <div class="header">
    <div class="header-top">
      <div class="header-img">
        <img width="64" height="64" :src="seller.avatar" alt="头像">
      </div>
      <div class="header-nav">
        <div class="the"><span class="brand"></span><span>{{seller.name}}</span></div>
        <div class="time">{{seller.description}}/{{seller.deliveryTime}}分钟到达</div>
        <div class="anumber" v-if="seller.supports">
          <span class="icon"
                :class="classMap[seller.supports[0].type]"></span><span>{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="header-support" v-if="seller.supports" @click="button">
        <span>{{seller.supports.length}}个</span>
        <i class="iconfont icon-you"></i>
      </div>
    </div>
    <div class="header-button" @click="button">
      <span class="img"></span><span class="text">{{seller.bulletin}}</span><i class="iconfont icon-you"></i>
    </div>
    <div class="background"><img :src="seller.avatar" alt="图片" width="100%" height="100%"></div>
    <transition name="fade">
      <div v-show="transitionShow" class="transition">
        <div class="transition-nav">
          <div class="details">
            <h3>{{seller.name}}</h3>
            <div class="star-map">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <span class="line"></span>
              <span class="text">优惠信息</span>
              <span class="line"></span>
            </div>
            <ul class="activity" v-if="seller.supports">
              <li v-for="(iten,index) in seller.supports" :key="iten.index">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="test">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <span class="line"></span>
              <span class="text">商家公告</span>
              <span class="line"></span>
            </div>
            <div class="particulars">
              <p>{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="transition-close">
          <i class="iconfont icon-cuowu" @click="close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import Star from './../star/star.vue'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        transitionShow: false
      }
    },
    methods: {
      button() {
        this.transitionShow = true
      },
      close() {
        this.transitionShow = false
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {
      Star
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./../../common/font/iconfont.css";
  @import "./min.styl";
  .header
    color #fff
    position relative
    background rgba(7, 17, 27, 0.5)
    overflow: hidden;
    .header-top
      padding 24px 12px 4px 24px
      position relative
      .header-img
        display inline-block
        vertical-align top
        img
          border-radius 2px
      .header-nav
        display inline-block
        margin-left 16px
        .the
          padding 2px 0 8px 0
          font-size 17px
          font-weight bold
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
            margin-right 6px
        .time
          padding-bottom 10px
          font-size 12px
          font-weight 200
        .anumber
          padding-bottom 2px
          font-size 10px
          font-weight 200
          .icon
            display inline-block
            width 12px
            height 12px
            margin-right 4px
            vertical-align: top
            background-size 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
      .header-support
        position absolute
        bottom 14px
        right 12px
        background rgba(0, 0, 0, 0.2)
        padding 0 8px
        border-radius 12px
        line-height 24px
        height 24px
        font-size 10px
        text-align: center
        vertical-align: top
        i
          vertical-align: top
          font-size 10px

    .header-button
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background: rgba(7, 17, 27, 0.2)
      .img
        display: inline-block
        vertical-align: top
        margin-top: 8px
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .text
        vertical-align: top
        margin: 0 4px
        font-size: 10px
      i
        position: absolute
        font-size: 10px
        right: 12px
        top: 0px
    .background
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      filter: blur(10px)
      z-index -1
    .transition
      position fixed
      top 0
      left 0
      width 100%
      height 100%
      overflow auto
      background rgba(7, 17, 27, 0.8)
      backdrop-filter blur(10px)
      opacity 1
      &.fade-enter-active, &.fade-leave-active //过度
        transition: all 0.5s
      &.fade-enter, &.fade-leave-active
        opacity: 0
        background: rgba(7, 17, 27, 0)
      .transition-nav
        width: 100%
        min-height 87%
        .details
          margin-top 64px
          padding-bottom 64px
        h3
          text-align center
          font-size 16px
          font-weight 700
        .star-map
          margin-top: 18px
          padding: 2px 0
          text-align: center
        .title
          display flex
          width 80%
          margin 28px auto 24px auto
          .line
            flex 1
            border-bottom 1px solid rgba(255, 255, 255, 0.2)
            position relative
            top -6px
          .text
            font-size 14px
            padding 0 12px
        .activity
          width 80%
          margin 24px auto 28px auto
          .test
            font-size 12px
            font-weight 200
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
        .particulars
          width 80%
          margin auto
          p
            font-size 12px
            font-weight 200px
            line-height 24px
      .transition-close
        position relative
        width 32px
        margin -64px auto 0 auto
        clear both
        i
          font-size 32px

</style>
