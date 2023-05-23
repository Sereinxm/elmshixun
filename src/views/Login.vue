<template>
    <div class="login">
        <div class="nav">
          <van-icon @click="returnLastPage" name="arrow-left" color="#fff" size="25"/>
            <p>密码登录</p>

        </div>
      <ul class="content">
        <li>
          <input type="text" placeholder="账号"/>
        </li>
        <li>
          <input type="password" placeholder="密码"/>
          <van-switch  class="switch" v-model="checked" active-color="#00ff00" inactive-color="#dcdee0" size="23" />
        </li>
        <li>
          <input type="text" placeholder="验证码"/>
        </li>
      </ul>
      <p class="tishi">温馨提示：未注册的账号，将自动注册登录；已有账号请输入密码登录！</p>
      <p class="btn">登录</p>
    </div>

</template>

<script>
export default {
    name: "Login",
  data:function (){
      return{
        checked: false,
      }
  },
  methods:{
    returnLastPage(){
      this.$router.back();
    }
  },
}
</script>

<style scoped>
.login{
  width: 100vw;
  height: 100vh;
  background-color: #f2f2f2;
}
.nav{
  position: fixed;
  left: 0;
  top: 0;
  background-color: deepskyblue;
  height: 45px;
  line-height: 45px;
  /*vw  设备的宽*/
  width: 100vw;
  color: white;
  box-sizing: border-box;
  padding: 5px;
}
.nav p{
  position: absolute;
  width: 80%;
  text-align: center;
  left: 0;

  top: 0;
  font-weight: bold;
  font-size: 18px;
  //background-color: seagreen;
  right: 0;
  margin: 0 auto;

}
.content{
  padding-top: 60px;
  background-color: #f2f2f2;
}
.content li{
  line-height: 55px;
  height: 55px;
  background-color: white;
  border-bottom: 1px solid #f2f2f2;
  padding: 0 10px;
  position: relative;

}
.content input{
  border: none;
  outline: none;
}
.switch{
  position: absolute;
  right: 10px;
  top: 11px;
}

.btn{
  width: 90%;
  margin: 10px auto;
  background-color: darkseagreen;
  height: 45px;
  line-height: 45px;
  color: white;
  text-align: center;
  border-radius: 5px;

}
.tishi{
  font-size: 12px;
  color: red;
  padding: 10px;
  line-height: 18px;
}
</style>