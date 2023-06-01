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


//我的模块中的路由
  //账户信息
  {
    path:"/user/info",
    component:()=>import("../components/Mine/UserInfo.vue"),
  },
  {
    path:"/user/edit/name",
    component:()=>import("../components/Mine/EditUsername.vue"),
  },
  {
    path: "/user/edit/address",
    component:()=>import("../components/Mine/EditAddress.vue"),
  },
  {
    path:"/new/address",
    component:()=>import("../components/Mine/NewAddress.vue"),
  },
  {
    path: "/new/address/search",
    component:()=>import("../components/Mine/SearchAddress.vue"),
  },
  {
    path:"/user/edit/password",
    component:()=>import("../components/Mine/EditPassword.vue"),
  },
  {
    path:"/WaiMai/detail",
    component:()=>import("../components/WaiMai/Detail.vue"),
  },
  {
    path:"/detail/sure",
    component:()=>import("../components/Detail/SureOrder.vue"),
  }






]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
