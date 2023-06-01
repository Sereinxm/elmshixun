<template>
  <div class="waimai">
    <div class="nav">
      <van-icon class="icon" @click="enterSerachPage" name="search" color="#fff" size="25"/>
      <p class="location">
        {{locationObj.name}}
      </p>
      <van-icon class="icon" @click="enterMinePage" name="contact" color="#fff" size="25"/>
    </div>
    <!--        内容的开始-->
    <div class="type">
      <ul>
        <li v-for="(obj,i) in typeArray" :key="i">
          <img :src="'http://fuss10.elemecdn.com/'+obj.image_url" alt="">
          <p>{{obj.title}}</p>
        </li>
      </ul>
    </div>
    <!--        附件商家-->
    <ul class="shop">
      <div>
        <van-icon name="location-o" size="20" color="#666"/>
        附件商家
      </div>
      <li v-for="(obj,i) in allShop" :key="i" @click="enterShopDetail(obj)">
        <img :src="'/elm/img/'+obj.image_path" alt="">
        <div class="center">
          <strong>{{obj.name}}</strong>
          <strong>{{obj.rating}}</strong>
          <van-rate v-model="obj.rating" :allow-half="true" :readonly="true" size="12" color="#ff9a0d"/>
          <span>{{obj.rating}}</span>
          <span>月售{{ obj.recent_order_num }}单</span>
          <p>
            ¥{{obj.float_minimum_order_amount}}起送/
            配送费¥{{obj.float_delivery_fee}}
          </p>
        </div>
        <div class="right">
          <p class="first">
            <span>保</span>
            <span>准</span>
            <span>票</span>
          </p>
          <p class="second">
            <span>蜂鸟专送</span>
            <span>准时达</span>
          </p>
          <p>
            {{obj.distance}}公里/
            <span>{{obj.order_lead_time}}</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name:"WaiMain",
  data:function (){
    return{
      locationObj:{},
      typeArray:[],
      allShop:[],
    }
  },
  methods:{
    enterSerachPage(){
      this.$router.push("/tabbar/search");
    },
    enterMinePage(){
      this.$router.push("/tabbar/mine");
    },
    enterShopDetail(obj){
      localStorage.setItem("shop_id",obj.id);
      localStorage.setItem("shop_obj",JSON.stringify(obj));
      this.$router.push("/waimai/detail");
    }
  },
  created() {
    //取出定位对象
    this.locationObj = JSON.parse(localStorage.getItem("location"));
    //请求分类数据
    this.axios.get("/elm/v2/index_entry").then(res=>{
      this.typeArray = res.data;
    });
    //请求所有店铺数据
    this.axios.get("/elm/shopping/restaurants?latitude="+this.locationObj.latitude+"&longitude="+this.locationObj.longitude).then(res=>{
      this.allShop = res.data;
    })

  }
}
</script>
<style scoped>


.waimai{
  background-color: #f2f2f2;
  width: 100vw;
  padding-top: 60px;
  padding-bottom: 60px;

}
.nav{
  width: 96vw;
  padding: 0 2vw;
  height: 45px;
  line-height: 45px;
  background-color: deepskyblue;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  z-index: 1;
}

.type{
  width: 100vw;
  overflow-x: scroll;
  border-bottom: 1px solid lightgray;
  background-color: white;

}

.type ul li{
  width: 12.5%;
  height: 100px;
}
.type ul{
  display: flex;
  height: 200px;
  width: 200vw;
  justify-content: space-around;
  flex-wrap: wrap;
  text-align: center;
  font-size: 13px;
  color: #666666;
}
.type ul li img{
  width: 40px;
  margin-bottom: 10px;
}

/*---------------*/
/*    所有商铺*/
.shop{
  margin-top: 10px;
  background-color: white;
}
.shop>div{
  color: gray;
  font-size: 14px;
  margin-bottom: 10px;
  padding: 10px;
}
.shop li{
  border-bottom: 1px solid lightgray;
  display: flex;
  height: 81px;
  padding: 15px 8px;
}
.shop li>img{
  width: 64px;
  height: 64px;
  margin-right: 10px;
  margin-top: 7px;
}
.shop .center {
  line-height: 27px;

}
.shop .center  strong:first-child{
  background-color: #ffd930;
  font-size: 13px;
  margin-right: 5px;
}
.shop .center span{
  color: #ff9a0d;
  margin: 4px;
  font-size: 14px;
}
.shop .center span:last-of-type{
  color: black;
  font-size: 12px !important;
}

.shop .money{
  font-size: 12px;
}
/*--*/
.shop .right{
  font-size: 12px !important;
  text-align: right;
  line-height: 27px;
  position: absolute;
  right: 10px;
}
.shop .right .first span{
  padding: 3px;
  border: 1px solid #f2f2f2;
  color: gray;
  margin-left: 1px;
}
.shop .right .second span:first-child{
  background-color: #3190E8;
  color: white;
  margin-right: 2px;
  padding: 2px 1px;
}
.shop .right .second span:last-of-type{
  border:1px solid #3190E8;
  color: #3190E8;
  padding: 2px 1px;
}
.shop .right p:last-of-type{
  color: gray;
}
.shop .right p:last-of-type span:last-of-type{
  color: #3190E8;
}
</style>