<template>
    <div class="edit-name">
        <div class="nav">
            <van-icon @click="()=>{this.$router.back()}" class="icon" name="arrow-left" size="23" color="#fff"/>
            <p>修改用户名</p>
        </div>

        <div class="content">
            <input type="text" v-model="username" placeholder="输入用户名">
            <p class="msg">{{msg}}</p>
            <p class="btn">确认修改</p>
        </div>



    </div>
</template>

<script>
    export default {
        name: "EditUsername",
        data:()=>{
            return{
                username:"",
                msg:"用户名只能修改一次,长度在5-24字符之间"
            }
        }
    }
</script>

<style scoped>
    .edit-name{
        padding-top: 55px;
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
/*    -----------*/
    .content input{
        width: 93vw;
        margin-left: 2vw;
        height: 40px;
        border: 1px solid #d3d3d3;
        outline: none;
        border-radius: 2px;
        padding-left: 3vw;
    }
    .content .msg{
        color: #666666;
        font-size: 13px;
        margin: 5px 0 30px 15px;

    }
    .content .btn{
        width: 96vw;
        margin: 0 auto;
        background-color: deepskyblue;
        opacity: 0.5;
        color: white;
        height: 40px;
        text-align: center;
        line-height: 40px;
    }

</style>