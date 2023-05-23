<template>
  <div class="city">
<!--      顶部导航栏-->
    <div class="nav">
      <p class="fl">ele.me</p>
      <p class="fr" v-on:click="enterLoginPage">注册/登录</p>
    </div>
<!--      当前城市-->

      <ul class="current-city">
          <p class="title">当前城市:</p>
          <li>{{currentCity.name}}</li>
      </ul>
<!--      热门城市-->
      <p class="title">热门城市:</p>

      <ul class="hot-city">
          <li v-for="(v,i) in hotCity" v-bind:key="i">
              {{v.name}}
          </li>
      </ul>
<!--      全部城市-->
      <ul class="all-city">
          <div v-for="(v,i) in allKey" v-bind:key="i">
              <h3>{{v}}</h3>
                  <li v-for="(obj,index) in allCity[v]" v-bind:key="index">
                      {{obj.name}}
                  </li>
          </div>
      </ul>
  </div>


</template>

<script>
import axios from "axios";

export default {
    name: "CityList",
    data:function (){
        //本组件的数据源
        return{
            currentCity:"郑州",
            hotCity:[],
            allCity:{},
            allKey:[]//存储排序后的ABCD
        }
    },
    //组件的生命周期方法 自动执行
    //组件创建成功后自动执行
    created(){
        //1.请求当前的定位城市
        this.axios.get("https://elm.cangdu.org/v1/cities?type=guess").then(res=>{
            //res中存储的是响应的数据
            this.currentCity=res.data;
        })
        //2.请求当前的热门城市
        this.axios.get("https://elm.cangdu.org/v1/cities?type=hot").then(res=>{
            //res中存储的是响应的数据
            this.hotCity=res.data;
        })
        //3.请求当前的全部城市
        this.axios.get("https://elm.cangdu.org/v1/cities?type=group").then(res=>{
            //res中存储的是响应的数据
            this.allKey=Object.keys(res.data).sort();
            this.allCity=res.data;
        })


    },
    methods:{
        enterLoginPage(){
            //进入登录页面
            this.$router.push("/login");
        }
    },

}
</script>

<style scoped>
.city{
    width: 100%;
}
.nav{
    width: 100%;
    height: 45px;
    background-color: deepskyblue;
    /*固定*/
    position: fixed;
    left: 0;
    top: 0;
    color: white;
    line-height: 45px;

}
.fl{
    float: left;
}
.fr{
    float: right;
}

.nav p{
    padding: 0 10px;
}
ul{
    list-style: none;
}

.current-city{
    padding-top: 50px;

}
ul li, .title{
    color: #666;
    font-size: 14px;
    padding-left: 10px;
    border-bottom: 1px solid #f2f2f2;
    height: 35px;
    line-height: 35px;

}
.current-city li, .hot-city li{
    color: deepskyblue;
}
.hot-city{
    display: flex;
    flex-wrap: wrap;
}
.hot-city li{
    width: 25%;
    box-sizing: border-box;
    border: 1px solid #f2f2f2;
    text-align: center;

}
.current-city li{
    font-size: 18px !important;
}
.all-city p{
    padding-left: 10px;
    border-bottom: 1px solid #f2f2f2;
    height: 35px;
    line-height: 35px;
    color: deepskyblue;
}
</style>