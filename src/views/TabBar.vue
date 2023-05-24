<template>
    <div class="tabbar">
      <router-view/>
      <van-tabbar route>
        <van-tabbar-item replace to="/tabbar/waimai" icon="home-o" ></van-tabbar-item>
        <van-tabbar-item replace to="/tabbar/search" icon="search" ></van-tabbar-item>
        <van-tabbar-item replace to="/tabbar/order" icon="home-o" ></van-tabbar-item>
        <van-tabbar-item replace to="/tabbar/mine" icon="search" ></van-tabbar-item>
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