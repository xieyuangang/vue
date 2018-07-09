<template>
  <div class="hello">
    <hr/>
    <div class="container">
      <table class="table table-hover table-striped">
        <caption>购物车</caption>
        <tr>
          <th>全选<input type="checkbox" v-model="checkAll"></th>
          <td>商品</td>
          <td>数量</td>
          <td>单价</td>
          <td>小计</td>
          <td>操作</td>
        </tr>
        <tr v-for="a in list" :key="a.id">
          <td>选这<input type="checkbox" v-model="a.Select"></td>
          <td>{{a.name}}</td>
          <td><img :src="a.msg">{{a.littleTitle}}</td>
          <td><input type="number" v-model.number.lazy="a.Number" min="0"></td>
          <td>{{a.Number *  a.UnitPrice | toFixed(2)}}</td>
          <td><button class="btn-block" @click="prmove(a)">删除</button></td>
        </tr>
        <tr>
          <td colspan="6">总价：{{ sun | toFixed(2)}} 元</td>
        </tr>
      </table>
    </div>

    <Star/>
    <incident/>

  </div>
</template>

<script>
import Star from './animation.vue'
import incident from './incident.vue'
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      list: []
    }
  },
  created () { // this.什么什么
    this.getData()
  },
  methods: {
    /* sun () {
      return this.list.reduce((prev, next) => {
        if (!next.Select) return prev // 判断是否有选中
        return prev + next.Number * next.UnitPrice // 计算总价
      }, 0
      )
    },
    changeOne () { // every检测数组里面是否有false 然后把他变成false
      this.checkAll = this.list.every(item => item.Select)
    },
    change () {
      this.list.forEach(item => item.Select = this.checkAll)
    } */
    getData () {
      axios.get('./static/index.json').then(res => { // function(){] this是挂在在windows上面的 箭头函数是在当前的this
        this.list = res.data
        // this.changeOne() // 数据获取完成后执行
        // console.log(res.data)
      }, err => {
        console.log(err)
      })
    },
    prmove (p) {
      this.list = this.list.filter(item => item !== p)
    }
  },
  filters: { // 可以有好多过滤器
    toFixed (input, param) { // 这里不能写this input是前面的值 param是保留的数
      return '$' + input.toFixed(param)
    }
  },
  computed: { // 计算函数
    checkAll: { // 计算值
      // 当list值变化是 就会重新计算
      get () { // get 和set都是this 默认v-model会获取checkall的值  every 检测数组所有元素进行对比
        return this.list.every(item => item.Select)
      },
      set (val) { // 当checkbox值变化时重新计算
        return this.list.forEach(item => item.Select = val)
      }
    }, // 是否全选
    sun () { // 如果计算属性默然调用的是get方法 set是修改方法
      return this.list.reduce((prev, next) => {
        if (!next.Select) return prev // 判断是否有选中
        return prev + next.Number * next.UnitPrice // 计算总价
      }, 0)
    }
    /* sun: {
      get () { // 如果计算属性默然调用的是get方法
        return this.list.reduce((prev, next) => {
          if (!next.Select) return prev // 判断是否有选中
          return prev + next.Number * next.UnitPrice // 计算总价
        }, 0
        )
      }
    } */
  },
  components: {
    Star,
    incident
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
