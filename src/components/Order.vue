<template>
    <div class="order">
      <div class="nav">
        <van-icon class="icon" @click="returnLastPage" name="arrow-left" color="#fff" size="25"/>
        <p>订单列表</p>
      </div>
    </div>
</template>
<script>
export default {
  name:"Order",
  methods:{
    returnLastPage(){
      this.$router.back();
    }
  }
}
</script>
<style scoped>

  .order{
    width: 100vw;
    height: 100vh;
    background-color: #f2f2f2;
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
</style>