import Vue from 'vue'
import Router from 'vue-router'
import vueRouter from '@/components/vueRouter'
import style from '@/components/style'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
 // mode:'history', // 线上模式 history.pushState 可以去掉/#
  routes: [
    {
      path: '/',
      name: 'vueRouter',
      component: vueRouter
    },
    {
      path: '/style',
      name: 'style',
      component: style,
      children:[
        {
          path:'',
          component:HelloWorld
        }
      ]
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '*',
      redirect:'/HelloWorld'  // 当地址不存在是跳转默认地址
    }
  ],
  linkExactActiveClass:'abb'//点击选中的class
})
