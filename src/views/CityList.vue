<template>
  <div class="city">
<!--      顶部导航栏-->
    <div class="nav">

    </div>
<!--      当前城市-->
      <ul class="current-city">
          <li>{{currentCity.name}}</li>
      </ul>
<!--      热门城市-->
      <ul class="hot-city">
          <li v-for="(v,i) in hotArr" v-bind:key="i">
              {{v.name}}

          </li>
      </ul>
<!--      全部城市-->
      <ul class="all-city">
          <li v-for="(v,i) in allKey" v-bind:key="i">
              <h3>{{v}}</h3>
              <ul>
                  <li v-for="(item,index) in allcity[v]" v-bind:key="index">
                      {{item.name}}
                  </li>
              </ul>
          </li>
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
            hotArr:[],
            allcity:{},
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
            this.hotArr=res.data;
        })
        //3.请求当前的全部城市
        this.axios.get("https://elm.cangdu.org/v1/cities?type=group").then(res=>{
            //res中存储的是响应的数据
            this.allKey=Object.keys(res.data).sort();
            this.allcity=res.data;
        })


    },

}
</script>

<style scoped>
.city{
    width:100%;
    height:100%;
    background-color: #f5f5f5;
}
.nav{
    width:100%;
    height:40px;
    background-color: rgba(255, 255, 255, 0.91);
}
</style>