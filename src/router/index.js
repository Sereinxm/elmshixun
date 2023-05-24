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
  },



  {
    path:"/tabbar",
    component:()=>import("../views/TabBar.vue"),
    children:[
      {
        path:"",
        redirect:"waimai",
      },
      //四大模块
      {
        path:"waimai",
        component:()=>import("../components/WaiMai.vue"),
        meta:{
          //控制是否显示tabbar
          deep:1
        }
      },
      {
        path:"search",
        component:()=>import("../components/Search.vue"),
        meta:{
          //控制是否显示tabbar
          deep:1
        }
      },
      {
        path:"order",
        component:()=>import("../components/Order.vue"),
        meta:{
          //控制是否显示tabbar
          deep:1
        }
      },
      {
        path:"mine",
        component:()=>import("../components/Mine.vue"),
        meta:{
          //控制是否显示tabbar
          deep:1
        }
      },
    ]


  },






]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
