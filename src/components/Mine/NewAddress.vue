<template>
    <div class="new-address">
        <div class="nav">
            <van-icon @click="()=>{this.$router.back()}" class="icon" name="arrow-left" size="23" color="#fff"/>
            <p>新增地址</p>
        </div>

        <ul class="content">
            <li>
                <input type="text" placeholder="请填写你的姓名" v-model="name">
            </li>
            <li>
                <input type="text" @click="()=>{this.$router.push('/new/address/search')}" placeholder="小区/写字楼/学校等" v-model="getAddress">
            </li>
            <li>
                <input type="text" placeholder="请填写详细送餐地址" v-model="detailAddress">
            </li>
            <li>
                <input type="text" placeholder="请填写能够联系到你的手机号" v-model="tel">
            </li>
            <li>
                <input type="text" placeholder="备用联系电话(选填)" v-model="otherTel">
            </li>


        </ul>
        <div class="btn" @click="addAddress">新增地址</div>
    </div>
</template>

<script>
    import {Dialog} from "vant";

    export default {
        name: "NewAddress",
        data(){
            return{
                name:"",
                address:"",
                detailAddress:"",
                tel:"",
                otherTel:"",
              user:{},
            }
        },
      //计算属性
      computed:{
          getAddress(){
            let address= JSON.parse(localStorage.getItem("address"));
            return address? address.name:"";
          }
      },
      methods:{
          //盘那段输入框不能为空
        addAddress(){
          if(this.name==""||this.addAddress()==null||this.detailAddress==""||this.tel==""||this.otherTel==""){
              Dialog.alert({
                message:'请补全地址信息'
              }

              ).then(()=>{
                // on close
              });
              return;
          }
          //如果代码执行到这里，说明输入框中都是值
          this.axios.post("/elm/v1/users/"+this.user.id+"/addresses",{
            address:this.getAddress,
            address_detail:this.detailAddress,
            geohash:JSON.parse(localStorage.getItem("address")).geohash,
            name:this.name,
            phone:this.tel,
            tag:"家庭",
            sex:1,
            phone_bk:this.otherTel,
            tag_type:2,
          }).then(res=>{
            if(res.data.status==1){
              this.$router.back();

            }else {
              this.$dialog.alert({
                message:'添加失败'
              });

            }
          })
        },
created(){
            this.user= JSON.parse(localStorage.getItem("user"));
}


      }
    }
</script>

<style scoped>
.new-address{
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
/*    -----------*/

    .content{
        padding: 10px 15px 1px;
        background-color: white;
    }
    .content li{
     margin-bottom: 10px;

    }
    .content input{
        width: 98%;
        height: 35px;
        border: 1px solid #d3d3d3;
        border-radius: 4px;
        padding-left: 2%;
        background-color: #f2f2f2;
        font-size: 14px;
    }
    .btn{
        width: 96vw;
        background-color: seagreen;
        color: white;
        margin: 30px auto;
        text-align: center;
        line-height: 40px;
        height: 40px;
        border-radius: 4px;
        opacity: 0.6;

    }
</style>