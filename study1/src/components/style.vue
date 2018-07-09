<template>
  <div class="hello">
    <hr/>
    <button v-color="flag">点击</button>
    <div class="c" v-drag></div>
    <p ref="mp">{{flag}}</p>
    <div>
      <p>1号{{money}}</p>
      <!--<sonModel :m="money" @child-msg="val=>this.money=val"/>-->
      <sonModel :m.sync="money" /><!-- 上面的简便写法  :m.sync语法糖  -->
    </div>
  </div>
</template>
<script>
/* import axIos from 'axios' */
import sonModel from './sonModel.vue'
export default {
  name: 'HelloWorld',
  data () {
    return {
      flag: 'red',
      money: 300
    }
  },
  components: { // 组件
    sonModel
  },
  mounted () { // 真事dom渲染完了在操作dom
   // console.log(this.$refs.mp)
  },
  methods: {
   /*  msgS (val) { // 子组件传的值
      this.money = val
    } */
  },
  directives: { // 自定义指令
    color (el, bindings) { // el是指带的button按钮 这两个都是参数 bindings定义的值
      el.style.background = bindings.value;
    },
    drag (el) {
      el.onmousedown = function (e) {
        let disX = e.pageX - el.offsetLeft;
        let disY = e.pageY - el.offsetTop;
        document.onmousemove = function (e) {
          el.style.left = e.pageX - disX + 'px'
          el.style.top = e.pagey - disY + 'px'
        }
        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null;
        }
        e.preventDefault();
      }
    }
  }
}
</script>

<style scoped>
  .a {background: red}
  .b {color: #a0baff}
  .c {background: #aeff6b;width: 50px;height: 50px;position: absolute}
</style>
