<template>
    <div class="search">
        <div class="nav">
            <van-icon class="icon" @click="returnLastPage" name="arrow-left" color="#fff" size="25"/>
            <p>搜索地址</p>
        </div>

        <div class="content">
            <input type="text" placeholder="请输小区/写字楼/学校" v-model="address">
            <p @click="searchAddress">确认</p>
        </div>
        <p class="msg">为满足商家的送餐要求,建议您从列表中选择地址</p>
<!--展示搜索的数据-->
      <ul class="list">
        <li v-for="(obj,i) in addressArray" :key="i" @click="chooseAddress(obj)">
          <p>{{obj.name}}</p>
          <p>{{obj.address}}</p>
        </li>
      </ul>



        <p class="info" v-if="addressArray.length==0">
            找不到地址? <br>
            请尝试输入小区,写字楼或者学校名 <br>
            详细地址(如门牌号) 可稍后输入哦
        </p>
    </div>
</template>

<script>
    export default {
        name: "SearchAddress",
        data(){
            return{
                address:"",
              addressArray:[],
            }
        },
        methods:{
            returnLastPage(){
                this.$router.back();
            },
            searchAddress(){
                this.axios.get("https://elm.cangdu.org/v1/pois?type=nearby&keyword="+this.address).then(res=>{
                    this.addressArray = res.data;
                })
            },
          chooseAddress(obj){
              localStorage.setItem("address",JSON.stringify(obj));
              this.$router.back();
          },

        },
        created(){
            this.city= JSON.parse(localStorage.getItem("city"));
        }
    }
</script>

<style scoped>
    .search{
        background-color: #f2f2f2;
        width: 100vw;
        min-height: 100vh;
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

    .content{
        width: 100vw;
        height: 45px;
        padding: 10px 0;
        background-color: white;

    }
    .content input{
        background-color: #f2f2f2;
        border: 1px solid lightgray;
        outline: none;
        border-radius: 4px;
        padding-left: 10px;
        margin-left: 10px;
        width: 70%;
        height: 40px;
        font-size: 14px;

    }
    .content p{
        background-color: #3290E8;
        width: 60px;
        height: 40px;
        line-height: 40px;
        display: inline-block;
        color: white;
        border-radius: 4px;
        text-align: center;
        margin-left: 5px;
    }
/*    --------*/
    .msg{
        width: 100%;
        background-color: #fff6e4;
        color: #ff883f;
        text-align: center;
        font-size: 14px;
        line-height: 25px;
    }

    .info{
        position: absolute;
        top: 0;
        bottom: 0;
        margin:auto 0;
        width: 100%;
        color: #999999;
        height: 75px;
        line-height: 25px;
        text-align: center;
    }
    .list li{
      height: 60px;
      line-height: 30px;
      border-bottom: 1px solid #999999;
      padding-left: 13px;
      overflow: hidden;
      color: #666666;
    }

</style>