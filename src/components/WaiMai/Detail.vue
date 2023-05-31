<template>
  <div class="detail">
    <div class="nav" :style="{'background-image': 'url(http://elm.cangdu.org/img/'+shopObj.image_path+')'}">
      <div class="header">
        <van-icon @click="()=>{this.$router.back()}" class="icon" name="arrow-left" size="23" color="#fff"/>
        <img :src="'http://elm.cangdu.org/img/'+shopObj.image_path" alt=""/>
        <div class="center">
          <h3>{{shopObj.name}}</h3>
          <p>商家配送/分钟送达/配送费￥{{shopObj.float_delivery_fee}}</p>
          <p>{{shopObj.promotion_info}}</p>

        </div>
      </div>
      <ul class="change-model">
        <li :class="{active:navIndex==0}" @click="navIndex=0">商品</li>
        <li :class="{active:navIndex==1}" @click="navIndex=1">评价</li>
      </ul>
        </div>
<!--    展示数据 包括食品详情和评论-->
    <div class="content">
<!--      父传子 将请求到的数据传给子组件-->
      <GoodsDetail v-if="navIndex===0" :big_obj="bigObj"></GoodsDetail>
      <CommentDetail v-else></CommentDetail>
    </div>

  </div>
</template>

<script>
import CommentDetail from "@/components/WaiMai/CommentDetail.vue";
import GoodsDetail from "@/components/WaiMai/GoodsDetail.vue";
export default {
  name:"Detail",
  data(){
    return{
      bigObj:{},
      shopObj:{},
      navIndex:0,

    }
  },
  created(){
    let id=localStorage.getItem("shop_id");
    this.shopObj=JSON.parse(localStorage.getItem("shop_obj"));
    //进行网络请求
    this.axios.get("/elm/shopping/v2/menu?restaurant_id="+id).then(res=>{
      this.bigObj=res.data;
    })
  },
  components:{
    GoodsDetail,
    CommentDetail,
  }
}
</script>



<style scoped>

.detail{
  background-color: #f2f2f2;
  height: 100vh;
  width: 100vw;
  padding-top: 170px;
}
.nav{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 170px;
  background-repeat: no-repeat;
  background-size: 100%;
  z-index: 2;
}
.nav .icon{
  position: absolute;
  left: 10px;
  top: 10px;
}
.header{
  width: 100%;
  height: 120px;
  background-color: rgba(0,0,0,0.5);
  padding: 40px 10px 10px;
  box-sizing: border-box;
}
.header img{
  width: 70px;
  border-radius: 5px;
  float: left;
}
.header .center{
  color: white;
  float: left;
  margin-left: 10px;
  line-height: 23px;
}
.center p{
  font-size: 12px;
}

.change-model{
  width: 100%;
  background-color: white;
  height: 26px;
  display: flex;
  justify-content: space-around;
  padding: 11px 0;
  border-bottom: 2px solid #999;



}

.change-model li{
  padding-bottom: 3px !important;
}

.active{
  color: #3190E8;
  border-bottom: 2px solid #3190E8;
}

.content{
  height: 493px;

}
</style>