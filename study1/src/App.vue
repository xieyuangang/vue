<template>
  <div id="app">
    <router-link to="/" tag="button">默认</router-link>
    <router-link :to="{path:'/style'}">style</router-link><!--这个方便传值-->
    <router-link to="/HelloWorld">HelloWorld</router-link>
    <router-view/>
    <div class="row" v-show="xShowM">
      <h3>还有{{count}}件事没完成</h3>
      <div class="col-xs-6">
        <input type="text" v-model="modeVal1" class="form-control" @keyup.enter="add1">
        <div>
          <div class="btn-group" role="group" :class="{back:hash==='all'}">
            <a href="#/all"  type="button" class="btn ">全部任务</a>
          </div>
          <div class="btn-group" role="group" :class="{back:hash==='finish'}">
            <a href="#/finish"  type="button" class="btn ">已完成</a>
          </div>
          <div class="btn-group" role="group" :class="{back:hash==='unfinish'}">
            <a href="#/unfinish"  type="button" class="btn ">未完成</a>
          </div>
        </div>
        <ul class="list-group">
          <li class="list-group-item" :class="{a:a.checkboxS}"
              v-for="(a,index) in filterList" :key="index" @dblclick="listApp(a)">
           <span v-show="xShow!=a">
              <input type="checkbox" v-model="a.checkboxS" >
               {{a.a}}
           </span>
            <input type="text" v-model="a.a" v-show="xShow==a" @blur="cancel"
                   @keyup.enter="cancel" v-focus="xShow==a">
            <span class="badge" @click="del(index)">X</span>
          </li>
        </ul>
      </div>
      <hr/>
    </div>
    <div v-show="xShowM">
      <input type="text" v-model="message" style="width: 30px;">
      <span v-text="message"></span>
      <p v-once>{{message}}</p>
      <span v-html="p"></span>
      <ul>
        <li v-for="(ll,index) in list" :key="ll.id">{{index}}：{{ll.name}}
          <span v-for="pot in ll.color" :key="pot.id">{{pot}}</span>
        </li>
      </ul>
      <!--传参数就加括号   不传就不加括号-->
      <button @click="app($event)">点击</button>
      <input type="text" v-model="modeVal" @keyup.enter="add">
      <ul>
        <li v-for="(a,index) in  lsit1" :key="a.id">{{a}} <b @click="box(index)">x</b></li>
      </ul>
      <input type="checkbox" v-model="l" value="1">1
      <input type="checkbox" v-model="l" value="2">2
      <input type="checkbox" v-model="l" value="3">3
      {{l}}
    </div>
    <!--<img src="./assets/logo.png">-->
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      message: '年后',
      p: '<p>你好我是某某</p>',
      list: [
        {name: '苹果', color: ['1', '2']},
        {name: '西瓜', color: ['1', '2', '3']},
        {name: '桃子', color: ['1', '2']},
        {name: '荔枝', color: ['1']}
      ],
      modeVal: '',
      lsit1: [],
      l: [],
      list2: [
        {a: '吃饭', checkboxS: false},
        {a: '睡觉', checkboxS: true},
        {a: '打豆豆', checkboxS: false}
      ],
      modeVal1: '',
      xShow: '',
      hash: '',
      xShowM: false
    }
  },
  methods: {
    app (event) {
      /* console.log(this.list[1].name)
      console.log(event) */
    },
    add (e) {
      if (this.lsit1.indexOf(this.modeVal)) { // indexOf数组去重
        this.lsit1.unshift(this.modeVal) // unshift从头添加进数组
        this.modeVal = ''
      }
    },
    box (i) {
      // this.lsit1 = this.lsit1.filter((item, index) => index !== i)
      this.lsit1 = this.lsit1.filter(function (item, index) {
        return index !== i
      })
    },
    add1 () {
      this.list2.unshift({a: this.modeVal1, checkboxS: false})
      this.modeVal1 = ''
    },
    del (i) {
      this.list2 = this.list2.filter((item, index) => index !== i)
    },
    listApp (i) {
      this.xShow = i
    },
    cancel () {
      this.xShow = ''
    }
  },
  computed: {
    filterList () {
      if (this.hash === 'all') return this.list2
      if (this.hash === 'finish') return this.list2.filter(item => item.checkboxS)
      if (this.hash === 'unfinish') return this.list2.filter(item => !item.checkboxS)
      return this.list2
    },
    count () {
      return this.list2.filter(item => !item.checkboxS).length
    }
  },
  directives: { // 自定义指令
    color (el, bindings) { // el是指带的button按钮 这两个都是参数 bindings定义的值
      el.style.background = bindings.value
    },
    focus (el, bindings) { // 获取焦点
      if (bindings.value) {
        el.focus() // js获取焦点事件
      }
    }
  },
  watch: { // watch 默认只监控一次数据变化
    list2: { // 深度监控 默认写成函数也是handle
      handler () {
        localStorage.setItem('data', JSON.stringify(this.list2))
      }, deep: true
    }
  },
  created () {
    // 如果里面有就用有没有就用原始数据
    this.list2 = JSON.parse(localStorage.getItem('data')) || this.list2
    // 监控hash值的变化
    this.hash = window.location.hash.slice(2) || 'all'
    window.addEventListener('hashchange', () => {
      this.hash = window.location.hash.slice(2)
    }, false)
  }
}
</script>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .a {background: red}
  .b {color: #a0baff}
  .back{background: red}
  .abb{background: red} /*  路由高亮class*/
</style>
