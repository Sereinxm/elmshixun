import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect:"/home"
  },
  {
    path: "/home", //首页
    component:()=>import("../views/CityList.vue"),
  },
  {
    path: "/login", //登录
    component:()=>import("../views/Login.vue"),
  },
  {
    path: "/city",
    component:()=>import("../views/SearchCity.vue"),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
