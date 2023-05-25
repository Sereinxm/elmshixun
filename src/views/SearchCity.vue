<template>
    <div class="search-city">
      <div class="nav">
          <van-icon class="icon" @click="returnLastPage" name="arrow-left" color="#fff" size="25"/>
          <p class="title">{{currentCity}}</p>
          <p class="change"  @click="enterCityListPage">切换城市</p>
      </div>

        <div class="content">
            <input type="text" placeholder="请输入学校,商务楼,地址" v-model="msg"/>
            <p @click="submitAction" class="btn">提交</p>
        </div>

<!--        搜索历史-->
        <ul v-if="shopArray.length == 0" class="shop-list">
            <p v-if="historyArray != null" style="padding-left: 10px; color: gray;font-size: 13px">搜索历史</p>
            <li v-for="(obj, i) in historyArray" @click="enterWaiMaiPage(obj)">
                <p>{{obj.name}}</p>
                <p>{{obj.address}}</p>
            </li>
            <div v-if="historyArray != null" class="clear" @click="clearHistory">清空历史</div>
        </ul>

<!--        展示搜索到的店铺信息-->
        <ul v-else class="shop-list">
            <li v-for="(obj, i) in shopArray" @click="enterWaiMaiPage(obj)">
                <p>{{obj.name}}</p>
                <p>{{obj.address}}</p>
            </li>
        </ul>


    </div>
</template>

<script>
    export default {
        name: "SearchCity",
        data:function () {
         return{
             currentCity:"",
             msg:"",
             cityObj:"",
             shopArray:[],
             //定义数组  用来实现历史记录功能
             historyArray:[]
         }
        },
        created() {
            //先从本地取出上页点击的城市信息
            var cityObj = JSON.parse(localStorage.getItem("city"));
            this.currentCity = cityObj.name;
            this.cityObj = cityObj;


            this.historyArray = JSON.parse(localStorage.getItem("localHistory"));

        },
        methods:{
            returnLastPage(){
                this.$router.back();
            },
            submitAction(){
                console.log(this.cityObj.id);
                console.log(this.msg)
                this.axios.get("/elm/v1/pois?type=search&city_id="
                    + this.cityObj.id + "&keyword=" + this.msg).then(res => {
                    this.shopArray = res.data;
                })
            },
            enterWaiMaiPage(obj){
             //将点击的位置存储到本地
                localStorage.setItem("location", JSON.stringify(obj));
                //不但进入外卖页面 还会把当前所点击的地点 存储到本地 生成历史记录
                var localHistory = JSON.parse(localStorage.getItem("localHistory"));
                if(localHistory == null) {
                    localHistory = new Array();
                }
                // 去重操作  历史记录中存在的 就不能再次添加
                let isExits = 0;//假设不存在
                for(let i in localHistory){
                    if (localHistory[i].name == obj.name){
                      isExits = 1;
                    }
                }

                if (isExits == 0){
                    localHistory.push(obj);
                }


                //赋值给data
                this.historyArray = localHistory;
                //存储到本地
                localStorage.setItem("localHistory", JSON.stringify(localHistory));

                this.$router.push("/tabbar");
            },
            clearHistory(){
                //一件事  就是清空内存
               //删除
                localStorage.removeItem("localHistory");
                this.historyArray = null;
            },
            enterCityListPage(){
                //切换城市

                this.$router.push("/");
            }        },


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

    .clear{
        width: 100vw;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: white;
        color: gray;
    }
</style>