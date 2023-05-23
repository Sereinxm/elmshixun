<template>
  <div class="search-city">
    <div class="nav">
      <van-icon class="icon" @click="returnLastPage" name="arrow-left" color="#fff" size="25"/>
      <p>{{currentCity}}</p>
      <p class="change">切换城市</p>
    </div>
    <div class="content">
      <input type="text" placeholder="输入学校、商务楼、地址" v-model="msg"/>
      <p class="btn" @click="submitAction">提交</p>
    </div>
<!--    展示搜索到的店铺信息-->
    <ul class="shop-list">
      <li v-for="(obj,i) in shopArray">
        <p>{{obj.name}}</p>
        <p>{{obj.address}}</p>
      </li>
    </ul>



  </div>


</template>
<script>
  export default {
    name: "SearchCity",
    data:function (){
      return{
        currentCity:"",
        msg:"",
        cityObj:"",
        shopArray:[],
      }
    },
    created() {
      //先从本地去除上页点击的城市信息
      var cityObj = JSON.parse(localStorage.getItem("city"));
      this.currentCity = cityObj.name;
      this.cityObj= cityObj;
    },

    methods:{
      returnLastPage() {
        this.$router.back();
      },
      submitAction() {
        console.log(this.cityObj.id);
        console.log(this.msg);
        this.axios.get("https://elm.cangdu.org/v1/pois?type=search&city_id="
            + this.cityObj.id + "&keyword=" + this.msg).then(res => {
          this.shopArray=res.data;
        })

      }

    }
  }

</script>
<style scoped>
.search-city{
  background-color: #f2f2f2;
  width: 100vw;
  height: 100vh;
  padding-top: 60px;
}
.nav{
  position: fixed;
  left: 0;
  top: 0;
  background-color: deepskyblue;
  height: 45px;
  line-height: 35px;
  /*vw  设备的宽*/
  width: 100vw;
  color: white;
  box-sizing: border-box;
  padding: 5px;
  /*    */
  display: flex;
  justify-content: space-between;
}
.nav .title{
  width: 70px;
  text-align: right;
  font-weight: bold;

}
/*    ---*/
.content{
  width: 100vw;
  height: 120px;
  background-color: white;
  padding: 10px;
  box-sizing: border-box;
}
.content input{
  width: 98%;
  height: 35px;
  outline: none;
  border: 1px solid #999;
  border-radius: 5px;
  padding-left: 2%;
}
.btn{
  width: 100%;
  height: 35px;
  line-height: 35px;
  background-color: deepskyblue;
  color: white;
  text-align: center;
  margin: 10px 0;
  border-radius: 4px;
}

.shop-list{
  margin-top: 2px;
}
.shop-list li{

  padding: 20px 15px;
  background-color: white;
  border-bottom: 1px solid #f2f2f2;
  line-height: 25px;
}

.shop-list li p:last-child{
  font-size: 13px;
  color: #999999;
  height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>