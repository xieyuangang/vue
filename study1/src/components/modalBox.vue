<template>
  <div class="modalBox">
       <h3>组件</h3>
      <button @click="map">点击</button>{{xShow}}
    <!--这里放的内容都属于父级元素的   只有属性名属于子组件的-->
   <!-- <modalBox1 :m.sync="xShow" :p.sync="back" />-->
   <!-- <modalBox2><h1 slot="title">哈哈哈</h1> <span slot="name">ooooo </span> </modalBox2>-->
    <!--<modalBox3 ref="load"></modalBox3>-->
  <!--  <input type="radio" v-model="red" value="modalBox3">1
     <input type="radio" v-model="red" value="modalBox4">2
    <keep-alive>
      <component :is="red"></component>
    </keep-alive>-->
    <!--<livingExample type="primary" @but="appData">
         <h3 slot="title">我是h3</h3>
    </livingExample>-->
    <modalBoxlist :p.sync="list"></modalBoxlist>
    <!--<modalBoxlist :score="list"></modalBoxlist>-->
  </div>
</template>
<script>
  import modalBox1 from './mode/modalBox1'
  import modalBox2 from './mode/modalBox2'
  import modalBox3 from './mode/modalBox3'
  import modalBox4 from './mode/modalBox4'
  import livingExample from './mode/livingExample'
  import modalBoxlist from './mode/modalBoxlist'
  export default {
    name: 'modalBox',
    data () {
      return {
        xShow:true,
        back:"red",
        red:'modalBox3',
        list:[
          {name:'小明',title:'1班',pay:12},
          {name:'小哈',title:'3班',pay:8},
          {name:'小米',title:'2班',pay:1},
          {name:'小西校',title:'6班',pay:3},
        ]
      }
    },
    mounted(){  //父组件调用子组件方法  load是ref的值
       // ref 放在组件上  获取得是实力  不是dom元素
      // this.$refs.load.hide()
     // this.$refs.load.$el.style.background='red' // 变红操作dom元素
    /* this.$nextTick(()=>{  想操作dom就得加上这个方法
         this.$refs.load.$el.style.background='red'
       })   */
    },
    methods: {
       map(){
         this.xShow=true;
       },
      appData(val){
         alert(val)
      }
    },
    components: { // 组件
      modalBox1,
      modalBox2,
      modalBox3,
      modalBox4,
      livingExample,
      modalBoxlist
    },
  }
</script>

<style scoped>
</style>
