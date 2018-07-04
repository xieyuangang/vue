<template>
  <div class="goods">
    <div class="list" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="item.id" class="list-li"
            :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
          <span class="text">
            <span v-show="item.type>0" :class="classMap[item.type]" class="icon"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="nav" ref="foodsWrapper">
      <div>
        <div v-for="item in goods" :key="item.id" ref="foodList">
          <h3 class="title">{{item.name}}</h3>
          <ul v-for="food in item.foods" :key="food.id" class="ul-list">
            <li class="particulars">
              <div class="img">
                <img :src="food.image" alt="" width="57" height="57">
              </div>
              <div class="txt">
                <h4 class="title-h4">{{food.name}}</h4>
                <p class="flavour">{{food.description}}</p>
                <p class="sales">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评{{food.rating}}%</span>
                </p>
                <p class="sales price">
                  <span class="reality">￥<b class="reality-b">{{food.price}}</b></span>
                  <span class="remove" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </p>
                <div class="cartcontrol-wrapper">
                  <Cartcontrol :food="food"></Cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice"
              :minPrice="seller.minPrice"></shopcart>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import Shopcart from '../shopcart/shopcart.vue'
  import Cartcontrol from '../cartcontrol/cartcontrol.vue'

  const ERR_OK = 0

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      }
    },
    computed: { // 计算函数
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods() { //  计算count的函数 个数
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$http.get('http://192.168.3.198:8080/api/goods').then(response => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.goods = response.data
          this.$nextTick(() => { // dom数据更新完后执行回调
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) { // 阻止非vue事件
          return
        }
        let foodList = this.$refs.foodList
        let le = foodList[index]
        this.foodsScroll.scrollToElement(le, 600)
      },
      _initScroll() { // 滑动插件
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          if (pos.y <= 0) {
            this.scrollY = Math.abs(Math.round(pos.y))
          }
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodList
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      _drop(target) {
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target)
        })
      }
    },
    components: {
      Shopcart,
      Cartcontrol
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./../header/min.styl";
  .goods
    border-top 1px solid rgba(7, 17, 27, 0.1)
    display -webkit-flex
    position absolute
    width 100%
    top 164px
    bottom 64px
    z-index -1
    overflow hidden
    .list
      flex: 0 0 80px
      width: 80px
      background #f3f5f7
      .list-li
        display: table //垂直居中
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: bold
          .text
            border-none()
            font-weight 700
        .text
          display table-cell
          vertical-align middle
          font-size 12px
          font-weight 200
          border-1px rgba(7, 17, 27, 0.1)
          .icon
            display inline-block
            width 12px
            height 12px
            margin-right 2px
            vertical-align: top
            background-size 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')
    .nav
      flex 1
      .title
        background #f3f5f7
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        font-weight 700
        line-height 26px
        height 26px
        text-indent 12px
      .ul-list
        padding 0 18px
        .particulars
          display -webkit-flex
          padding 18px 0
          border-bottom 1px solid rgba(7, 17, 27, 0.1)
          .img
            border-radius 1px
            display inline-block
          .txt
            flex 1
            vertical-align: top;
            display inline-block
            margin-left 10px
            position relative
            .title-h4
              font-size 14px
              color: rgb(7, 17, 27)
              line-height 14px
              padding 1px 0 4px 0
            .flavour
              font-size 10px
              color rgb(147, 153, 159)
              line-height 12px
              padding-bottom 4px
            .sales
              font-size 10px
              color rgb(147, 153, 159)
              line-height 12px
              .reality
                color #FF0000
                .reality-b
                  font-size 14px
                  font-weight 700
              .remove
                text-decoration: line-through;
            .price
              line-height 24px
            .cartcontrol-wrapper
              position absolute
              right 0
              bottom 0px
</style>
