<template>
    <div class="edit-address">
        <div class="nav">
            <van-icon @click="()=>{this.$router.back()}" class="icon" name="arrow-left" size="23" color="#fff"/>
            <p class="title">编辑地址</p>
            <p class="btn" @click="editAction">编辑</p>
        </div>

        <ul class="content">
          <li v-for="(obj,i) in addressList" :key="i">
            <p>{{obj.name}}&nbsp; &nbsp;  {{obj.phone}}</p>
            <p>{{obj.address}}</p>
            <van-icon v-if="!isState" class="delete" name="cross" color="#666" size="25" @click="deleteAction(obj,i)"/>
          </li>




            <div @click="()=>{this.$router.push('/new/address')}">新增地址
            <van-icon class="right"  name="arrow" size="21" color="#d3d3d3"/>
            </div>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "EditAddress",
      data(){
        return{
          addressList:[],
          isState:true,
          editText:"编辑",
          user:{},
        }
      },
      methods:{
        editAction(){
          this.isState=!this.isState;
          this.editText=this.isState?"完成":"编辑";
        },
        deleteAction(obj,i){
          this.axios.delete("/elm/v1/users/"+this.user.id+"/addresses/"+obj.id).then(res=>{
            console.log(res);
            this.addressList.splice(i,1);
          })
        }
      },
      created() {
          this.user = JSON.parse(localStorage.getItem("user"));
          this.axios.get("/elm/v1/users/"+this.user.id+"/addresses").then(res=>{
            this.addressList=res.data;
              console.log(res);
          })
      }
    }
</script>

<style scoped>
    .edit-address{
        padding-top: 55px;
        background-color: #f2f2f2;
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
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        box-sizing: border-box;
    }

    .content{
      background-color: #f2f2f2;
    }
    .content div{
        width: 100vw;
        height: 50px;
        line-height: 40px;
        padding-left: 10px;
        box-sizing: border-box;
        background-color: white;
        border:1px solid #d3d3d3;
        border-left: none;
        border-right: none;
        position: relative !important;
      margin-top: 15px;
    }
    .content .right{
        position: absolute;
        right: 10px;
        top: 11px;
    }
    .content li{
      height: 50px;
      padding: 15px 13px;
      Line-height: 25px;
      border-bottom: 1px solid #f2f2f2;
      background-color: white;
      color: #666666;
      position: relative;
    }
    .content .delete{
    position: absolute;
      right: 10px;
      top: 29px;}
</style>