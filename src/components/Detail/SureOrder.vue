<template>
    <div class="sure-order">
        <div class="nav">
            <van-icon class="icon" @click="()=>{this.$router.back()}" name="arrow-left" color="#fff" size="25"/>
            <p>确认订单</p>
        </div>

        <div class="content">
            <div class="location">
                <van-icon name="location-o" color="#3190E8" size="20"/>
                <div class="info">
                    <strong>{{currentLocation.name}}</strong> &nbsp;
                    <span>先生 {{currentLocation.phone}}</span>
                    <p>{{currentLocation.address}}</p>

                </div>
                <van-icon name="arrow" class="right"/>
            </div>

            <div class="time">
                <p>送达时间</p>
                <p class="time-right">
                   尽快送达 | 预计 12:30 <br>
                    <span>蜂鸟专送</span>
                </p>
            </div>

<!--            支付方式-->
            <ul class="pay">
                <li>
                    <span>支付方式</span>
                    <span>在线支付></span>
                </li>
                <li>
                    <span>红包</span>
                    <span>暂时只在饿了么APP中支持</span>
                </li>
            </ul>
<!--             订单信息-->
            <ul class="order">
                <div class="header">
                    <img :src="'http://elm.cangdu.org/img/' + shop_obj.image_path" alt="">
                    <span>{{shop_obj.name}}</span>
                </div>
                <li v-for="(typeObj, i) in foodObj">
                    <div v-for="(food, j) in typeObj">
                        <p>{{food.name}}</p>
                        <p class="num">x{{food.is_featured}}</p>
                        <p>￥{{food.specfoods[0].price}}</p>
                    </div>
                </li>
                <li>
                    <div>
                    <p>餐盒</p>
                    <p>￥5</p>
                    </div>
                </li>
                <li>
                    <div>
                        <p>配送费</p>
                        <p>￥3</p>
                    </div>
                </li>
                <li>
                    <div>
                        <p>订单</p>
                        <p>待支付</p>
                    </div>
                </li>
            </ul>
                
<!--            备注-->
            <ul class="pay">
                <li>
                    <span>订单备注</span>
                    <span>口味,偏好等></span>
                </li>
                <li>
                    <span>发票抬头</span>
                    <span>不需要开发票</span>
                </li>
            </ul>
        </div>


    </div>
</template>

<script>
    export default {
        name: "SureOrder",
        data(){
            return{
                locationArray:[],
                currentLocation:{},
                shop_obj:{},
                foodObj:{}
            }
        },

        created() {
            this.user = JSON.parse(localStorage.getItem("user"));
            this.axios.get("/elm/v1/users/" + this.user.id + "/addresses").then(res=>{
                this.locationArray = res.data;
                this.currentLocation = res.data[0];
            });

            this.shop_obj = JSON.parse(localStorage.getItem("shop_obj"));
            this.foodObj = JSON.parse(localStorage.getItem("cart_obj"))[this.shop_obj.id];


        }


    }
</script>

<style scoped>
.sure-order{
    width: 100vw;
    background-color: #f2f2f2;
    padding-top: 45px;
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
    z-index: 10;

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


}
    .content .location{
        height: 80px;
        background-color: white;
        margin-bottom: 10px;
        display: flex;
        padding: 15px 15px;
        align-items: center;
        box-sizing: border-box;
        line-height: 25px;
        justify-content: space-between;

    }
    .content .location .info{
        width: 290px;
        margin-left: 10px;
        color: #666666;
        font-size: 13px;

    }
.content .location .info strong{
   font-size: 16px;

}
/*    ------------*/
    .time{
        height: 100px;
        display: flex;
        padding: 0 20px;
        border-left: 5px solid #3190E8;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;
        margin-bottom: 15px;
    }
    .time p:first-of-type{
        font-weight: bold;
        font-size: 16px;
    }
    .time-right{
        text-align: right;
        color: #3190E8;
        font-size: 14px;
        line-height: 25px;
    }
    .time-right span{
        padding: 3px;
        border-radius: 4px;
        background-color: #3190E8;
        color: white;
        font-size: 12px;
    }

    .pay{
        line-height: 45px;
        height: 91px;
    }
    .pay li{
        height: 45px;
        border-bottom: 1px solid #f2f2f2;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        font-size: 14px;
        color: #999999;
    }
    .pay li:first-of-type span:first-of-type{
        color: #333333;
        font-size: 16px;

    }
/*    -----------*/
.order{
    margin-bottom: 15px;
    margin-top: 15px;
}
    .order div{
        border-bottom: 1px solid #f2f2f2;
        background-color: #fff;
        display: flex;
        align-items: center;
        color: #666666;
        padding: 0 15px;
    }
    .order .header{
        height: 60px;
        font-size: 18px;

    }
    .order li div{
        height: 50px;
        justify-content: space-between;
        font-size: 14px;
    }

.order .header img{
    width: 40px;
    border-radius: 50%;
    margin-right: 10px;
}
.order li div p:first-of-type{
    width: 200px;
}
.order li div .num{
    color: #ff6600;
    width: 60px;
    text-align: right;
}

</style>