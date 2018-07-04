import Vue from 'vue'
import Router from 'vue-router'

import goods from './components/nav/nav.vue'
import ratings from './components/section/section.vue'




Vue.use(Router)

const routes = [{
  path: '/',
  redirect: '/goods'
}, {
  path: '/goods',
  component: goods
}, {
  path: '/ratings',
  component: ratings
}];

export default new Router({
  linkActiveClass: 'active',
  routes
});
