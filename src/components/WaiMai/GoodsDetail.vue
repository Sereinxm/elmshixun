<template>
  <div class="goods-detail">
    <div class="left">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item  v-for="(obj,i) in big_obj" :key="i" :title="obj.name" :href="'#right'+i"/>

      </van-sidebar>
    </div>
    <div class="right">
      <ul v-for="(obj,i) in big_obj" :id="'right'+i">
        <p class="title">
          <strong>{{obj.name}}</strong>
          <span>{{obj.description}}</span>
        </p>
        <li v-for="(food,j) in obj.foods">
          <img :src="'https://elm.cangdu.org/img/'+food.image_path" alt="">
          <div class="text">
            <h3>{{food.name}}</h3>
            <p class="desc">{{food.description}}</p>
            <p class="num">月售{{food.month_sales}}份 好评率{{food.satisfy_rate}}%</p>
            <p class="activity" v-if="food.activity">{{food.activity?food.activity.image_text:""}}</p>
            <p class="money"><strong>{{food.specfoods.price}}</strong></p>
          </div>

<!--          步进器 数量-->
          <van-stepper class="step" v-model="food.is_featured" min="0" @change="stepChange(food.is_featured,food,i)" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name:"GoodsDetail",
    props:["big_obj"],
    data(){
      return{
        activeKey: 0,
        rightTop:0,
      }
    },
    methods:{
      stepChange(num,foodObj,index){
        console.log(num,foodObj,index);
        //将数据存储到本地

      }
    },

  }
</script>


<style scoped>
.goods-detail{
  background-color: seagreen;
  padding-bottom: 50px;
  height: 447px;
}
.left{
  height: 447px;
  overflow-y: scroll;
  width: 80px !important;
  float: left;
}
.right{
  height: 447px;
  overflow-y: scroll;
  background-color: white;



}
.right ul .title{
  font-size: 17px;
  padding-left: 10px;
  background-color: #f2f2f2;
  color: #666666;
  height: 40px;
  line-height: 40px;
}
.right .title span{
  font-size: 13px;
  color: #999999;
  margin-left: 13px;
}

.right li{
  background-color: white;
  padding:15px 10px;
  border-bottom: 1px solid #f2f2f2;
  position: relative;
}
.right li img{
  width: 60px;
  float: left;
}
.right li .text{
  margin-left: 70px;
  line-height: 22px;
}
.right .text .desc{
  color: #999999;
  font-size: 14px;
}
.right .text .num{
  font-size: 13px;
}
.right .text .money{
  color: #ff6600;
  font-size: 13px;
}
.right .text .money strong{
  font-size: 16px;
}

.right .activity{
  font-size: 12px;
  border: 1px solid #ff6600;
  color: #ff6600;
  display: inline-block;
  border-radius: 7px;
  line-height: 15px;
  padding:2px;
}

.right .step{
  position: absolute;
  right: 10px;
  bottom: 15px;
}

</style>