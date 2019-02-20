import Vue from 'vue'
import Router from 'vue-router'
import goods from "./components/goods/goods"
import ratings from "./components/ratings/ratings"

Vue.use(Router)

const seller = () => import("./components/seller/seller")
export default new Router({
  
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass:"active",
  routes: [
   {
    path: '/goods', component: goods
   },{
    path: '/', component: goods
   },
   {
    path: '/ratings', component: ratings
   },{
    path: '/seller', component: seller
   }
  ]
})
