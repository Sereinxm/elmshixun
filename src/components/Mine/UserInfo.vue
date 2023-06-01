<template>
    <div class="user-info">
      <div class="nav">
        <van-icon @click="()=>{this.$router.back()}" class="icon" name="arrow-left" color="#fff" size="23"/>
        <p>账户信息</p>
      </div>
<!--      内容开始-->
      <ul class="content">
        <li>头像
          <img class="right2" src="/elm/img/default.jpg" alt="">
          <van-icon name="arrow" class="right1"  size="20" color="#d3d3d3" />

        </li>
        <li @click="()=>{this.$router.push('/user/edit/name')}">用户名
          <span>{{user.username}}</span>
          <van-icon name="arrow" class="right1"  size="20" color="#d3d3d3" />

        </li>
        <li @click="()=>{this.$router.push('/user/edit/address')}">
        收货地址
          <van-icon name="arrow" class="right1"  size="20" color="#d3d3d3" />

        </li>
        <p> 账号绑定</p>
        <li>手机

          <van-icon name="arrow" class="right1"  size="20" color="#d3d3d3" />

        </li>
        <p> 安全设置</p>

        <li>登录密码
          <span>修改</span>
          <van-icon name="arrow" class="right1"  size="20" color="#d3d3d3" />

        </li>
        <li class="btn" @click="signOut">退出登录</li>
      </ul>
    </div>
</template>

<script>
  import router from "@/router";

  export default {
    name:"UserInfo",
    data(){
      return{
        user:{},
      }
    },
    methods:{
      signOut(){
        this.axios.get("/elm/v2/signout").then(res=>{
          if(res.data.status===1){
            localStorage.removeItem("user");
            this.$router.back();
          }
        })
      },


    },
    created() {
      //去除笨的存储的用户信息
      this.user = JSON.parse(localStorage.getItem("user"));

    }
  }
</script>



<style scoped>
.user-info {
  padding-top: 50px;
  background-color: #f2f2f2;
  width: 100vw;
  height: 100vh;
}

.nav{
  position: fixed;
  left: 0;
  top: 0;
  background-color: deepskyblue;
  color: white;
  height: 45px;
  width: 100vw;
  height: 45px;
  font-weight: bold;

}
.nav .icon{
  position: absolute;
  left: 10px;
  top: 11px;
}
.nav p{
  width: 100vw;
  height: 45px;
  text-align: center;
  line-height: 45px;
}
/*-------------------------------*/
.content{
  border-top: #d3d3d3;
}
.content li{
  background-color: #fff;
  border-bottom: 1px solid #d3d3d3;
  height: 40px;
  line-height: 40px;
  color: #666;
  padding: 0 10px;
  position: relative;
  font-size: 14px;
}
.content li:first-child{
  height: 70px;
  padding: 15px 10px;
  line-height: 40px;
  box-sizing: border-box;

}
.content img{
  width: 40px;
  border-radius: 50px;
  position: absolute;
  right: 35px;
  top: 15px;
}
.content li .right1{
  position: absolute;
  right: 10px;
  top: 10px;
}
.content li:first-child .right1{
  top: 25px;
}
.content li span{
  position: absolute;
  right: 35px;
  color: #999999;
}
.content  p{
  height: 35px;
  line-height: 35px;
  font-size: 13px;
  padding-left: 10px;
  color: #666666;
  border-bottom: 1px solid #d3d3d3;
}
.content .btn{
  width: 96vw;
  box-sizing: border-box;
  margin: 40px auto;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: white;
  background-color: #D8584a;
  border-radius: 5px;
}
</style>