<template>
    <div class="tabbar">
      <router-view/>
      <van-tabbar route>
        <van-tabbar-item replace to="/tabbar/waimai" icon="home-o" >首页</van-tabbar-item>
        <van-tabbar-item replace to="/tabbar/search" icon="search" >搜索</van-tabbar-item>
        <van-tabbar-item replace to="/tabbar/order" icon="description" >订单</van-tabbar-item>
        <van-tabbar-item replace to="/tabbar/mine" icon="user-o" >我的</van-tabbar-item>
      </van-tabbar>
    </div>
</template>
<script>
export default {
  name:"Tabbar",
}
</script>
<style scoped>

</style>