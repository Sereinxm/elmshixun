<template>
  <div class="search">
    <div class="nav">
      <van-icon class="icon" @click="returnLastPage" name="arrow-left" color="#fff" size="25"/>
      <p>搜索</p>
    </div>
    <div class="content">
      <input type="text" placeholder="请输入商家或者美食名字" />
      <p>搜索</p>
    </div>
  </div>
</template>
<script>
export default {
  name:"Search",
  methods:{
    returnLastPage(){
      this.$router.back();
    }
  }
}
</script>
<style scoped>
.search{
  width: 100vw;
  height: 100vh;
  background-color: #f2f2f2;
  padding-top: 45px;

}
.nav{
  width: 100vw;
  height: 45px;
  background-color: deepskyblue;
  line-height: 45px;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  text-align: center;
}
.nav p{
  color: white;
font-weight: bold;
  width: 90%;
  font-size: 18px;
}
.content{
  width: 100vw;
  height: 50px;
  padding: 20px 0;
  background-color: white;
}
.content input{
 background-color: lightgray;
  border:1px solid #f2f2f2;
  outline: none;
  border-radius: 4px;
  padding-left: 10px;
  margin-left: 10px;
  width: 70%;
  height: 40px;
}
.content p{
  background-color: #3290E8;
  display: inline-block;
  width: 20%;
  height: 40px;
  line-height: 40px;
  color: white;
  border-radius:4px ;
  text-align: center;
  margin-left: 5px;
}
</style>