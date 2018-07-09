<template>
  <div class="hello">
    <hr/>
    <div :class="[class2,class1]">asfasfsa</div>
    <div :class="{c:clickApp1}">asfasfsa</div>
     <div><p v-for="(a,index) in listTou" :class="{a:index%2}" >{{a}}</p></div>
    事件
    <div @click="app1">
      app1
      <div @click.stop="app2">
        app2
        <div @click.stop="app3">app3</div>
      </div>
      <hr>
    </div>
    <div style="margin: 20px">
      全部<input type="checkbox" v-model="checkboxAll">
      <input type="checkbox" v-for="sp in checkboxS" v-model="sp.of">
    </div>
    <div>
     <input type="text" v-model="inputVal">{{msg}}
   </div>
    <div>
      watch<input type="text" v-model="inputValWatch">{{msgWatch}}
    </div>
    <div>
      <!--template 是v-if自带的没得实际意义  不支持v-show-->
      <template v-if="clickApp">
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </template>
      <div v-else>2</div>
    </div>
    <div>
      <!--切换dom   默认情况下一样的会复用要不一样需要加key-->
      <button @click="clickApp1=!clickApp1">点击</button>
      <div v-if="clickApp1">
        <span>登录</span>
        <input type="text" key="1" value="1">
      </div>
      <div v-else>
        <span>注册</span>
        <input type="text" key="2" value="2">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      list: [],
      checkboxS: [{of: true}, {of: false}, {of: true}],
      inputVal: '',
      inputValWatch: '',
      msgWatch: '',
      clickApp: true,
      clickApp1: true,
      class1: 'a',
      class2: 'b',
      listTou: [1, 2, 3, 4, 5, 5, 6]
    }
  },
  watch: {
    inputValWatch (newVal, oldVal) {
      if (newVal.length < 3) {
        return this.msgWatch = '太少'
      } else if (newVal.length > 6) {
        return this.msgWatch = '太多'
      }
      this.msgWatch = ''
    }
  },
  computed: {
    checkboxAll: { // 全选反选
      get () {
        return this.checkboxS.every(item => item.of)
      },
      set (val) {
        return this.checkboxS.forEach(item => item.of = val)
      }
    },
    msg: {
      get () {
        if (this.inputVal.length < 3) {
          return "太少了"
        } else if (this.inputVal.length > 6) {
          return "太多了"
        }
        return " "
      }
    }
  },
  methods: {
    app1 () {
      alert("app1")
    },
    app2 () {
      alert("app2")
    },
    app3 () {
      alert("app3")
    }
  }
}
</script>

<style scoped>
  .a{background:red}
  .b{color: #a0baff}
  .c{background: #aeff6b}
</style>
