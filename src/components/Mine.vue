<template>
  <div class="mine">
    <div class="nav">
      <van-icon class="icon" @click="returnLastPage" name="arrow-left" color="#fff" size="25"/>
      <p>我的</p>
    </div>
    <!--        内容开始-->
    <!--        个人性息-->
    <div class="info" @click="enterUserInfo">
      <img src="/elm/img/default.jpg" alt="">
      <p>
        <span v-if="!user">登录/注册</span>
        <span v-else>{{user.username}}</span>
        <br>
        <span>📱暂无手机号</span>
      </p>

      <!--          右侧箭头-->
      <van-icon name="arrow"  size="20px" color="#fff" class="right"/>
    </div>
    <!--余额 优惠 积分-->
    <ul class="money">
      <li>
        <span v-if="!user">0.00</span>
        <span v-else>{{user.balance}}.00元</span>
        <p>我的余额</p>
      </li>
      <li>
        <span v-if="!user">0</span>
        <span v-else>{{user.gift_amount}}</span>个
        <p>我的优惠</p>
      </li>
      <li>
        <span v-if="!user">0</span>
        <span v-else>{{user.point}}</span>分
        <p>我的积分</p>
      </li>
    </ul>
    <!--我的订单等信息-->
    <ul class="last">
      <li>我的订单
        <van-icon name="arrow" class="right" size="18" color="#999"/>
      </li>
      <li>积分商城
        <van-icon name="arrow" class="right" size="18" color="#999"/>
      </li>
      <li>饿了吗会员卡
        <van-icon name="arrow" class="right" size="18" color="#999"/>
      </li>
      <li>服务中心
        <van-icon name="arrow" class="right" size="18" color="#999"/>
      </li>
      <li>下载饿了吗APP
        <van-icon name="arrow" class="right" size="18" color="#999"/>
      </li>

    </ul>

  </div>
</template>
<script>
export default {
  name:"Mine",
  data(){
    return{
      user:{},
    }
  },
  methods:{
    returnLastPage(){
      this.$router.back();
    },
    enterUserInfo(){
      if(this.user){
        this.$router.push("/user/info");
      }else {
        this.$router.push("/login");
      }
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }
}
</script>
<style scoped>
.mine{
  background-color: #f2f2f2;
  width: 100vw;
  height: 100vh;
  padding-top: 45px;
}
.nav{
  width: 100vw;
  height: 45px;
  line-height: 45px;
  background-color: deepskyblue;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  text-align: center;
  align-items: center;
}
.nav p{
  color: white;
  font-weight: bold;
  width: 90%;
  font-size: 18px;
}
/*    ---------------*/
.info{
  width: 100vw;
  height: 86px;
  padding: 15px;
  box-sizing: border-box;
  background-color: deepskyblue;
}
.info img{
  width: 56px;
  border-radius: 50%;
  float: left;
}
.info p{
  float: left;
  margin-left: 10px;
  line-height: 28px;
  font-size: 13px;
  color: white;
}
.info p span:first-child{
  padding-left: 8px;
  font-weight: bold;
  font-size: 18px;
}
.info .right{
  float: right;
  margin-top: 10px;
}
/*    -------*/
.money{
  display: flex;
  justify-content: space-between;
  width: 100vw;
}
.money li{
  width: 33%;
  background-color: white;
  color: gray;
  height: 60px;
  padding: 20px 0;
  text-align: center;
  font-size: 13px;
}
.money li:first-child span{
  color: #ff9900;

}
.money li span{
  font-size: 30px;
  font-weight: bold;
}

.money li:nth-child(2) span{
  color: #ff5f3e;

}
.money li:nth-child(3) span{
  color: #6ac20b;

}

/*    ------------  */
.last{
  margin-top: 10px;
}
.last li{
  width: 100vw;
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  box-sizing: border-box;
  background-color: white;
  border-bottom: 1px solid #f2f2f2;
  position: relative;
}
.last .right{
  position: absolute;
  right: 15px;
  top: 10px;
}
.last li:nth-child(4){
  margin-top: 10px;
}






</style>