<template class="Hello">
  <div class="hello">
    <hr/>
     <button @click="show=!show">app</button>
    <input type="text" v-model="quer">

    <transition-group
      name="custom-classes-transition"
      enter-active-class="animated bounce"
      leave-active-class="animated bounceOutUp"
    >
        <div v-for="(a,index) in newList" :key="index">{{a}}</div>
    </transition-group>

    <transition
      name="custom-classes-transition"
      enter-active-class="animated tada"
      leave-active-class="animated bounceOutRight"
     >
      <div class="div" v-show="show"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  data () {
    return {
      show: true,
      quer: '',
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  methods: {},
  computed: {
    newList () {
      return this.list.filter(item => item == this.quer)
    }
  }
}
</script>
<style scoped>
 .div{
   width: 50px;
   height: 50px;
   background: #00a0dc;
 }
</style>
