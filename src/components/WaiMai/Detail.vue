<template>
    <div class="detail">
        <div class="nav" :style="{'background-image': 'url(http://elm.cangdu.org/img/' + shopObj.image_path+ ')'}">
            <van-icon @click="()=>{this.$router.push('/tabbar/waimai')}" class="icon" name="arrow-left" size="23" color="#fff"/>
            <div class="header">
            <img :src="'http://elm.cangdu.org/img/' + shopObj.image_path" alt="">
            <div class="center">
                <h3>{{shopObj.name}}</h3>
                <p>商家配送/分钟送达/配送费¥{{shopObj.float_delivery_fee
                    }}</p>
                <p>{{shopObj.promotion_info}}</p>

            </div>

        </div>
            <ul class="change-model">
                <li :class="{active:navIndex === 0}" @click="productAction">商品</li>
                <li :class="{active:navIndex === 1}" @click="navIndex = 1">评价</li>
            </ul>

        </div>

<!--        展示数据  包括食品详情 和  评论-->
        <div class="content">
<!--            注意 父传子  将请求到的数据 传给子组件-->
            <div class="goods-detail" v-if="navIndex === 0">
                <div class="left" >
                    <van-sidebar v-model="activeKey">
                        <van-sidebar-item
                                v-for="(obj, i) in big_obj" :key="i"
                                :title="obj.name" :href="'#right' + i"
                                :badge="getbadge(obj.id) == 0 ? '' : getbadge(obj.id)"
                        />

                    </van-sidebar>
                </div>
                <div class="right">
                    <ul v-for="(obj, i) in big_obj" :id="'right' + i">
                        <p class="title">
                            <strong>{{obj.name}}</strong>
                            <span>{{obj.description}}</span>
                        </p>
                        <li v-for="(food, j) in obj.foods">
                            <img :src="'https://elm.cangdu.org/img/' + food.image_path
" alt="">
                            <div class="text">
                                <h4>{{food.name}}</h4>
                                <p class="desc">{{food.description}}</p>
                                <p class="num">月售{{food.month_sales}}份 好评率{{food.satisfy_rate}}%</p>
                                <p class="activity" v-if="food.activity">{{food.activity ? food.activity.image_text : ""}}</p>
                                <p class="money">¥<strong>{{food.specfoods[0].price}}</strong></p>
                            </div>

                            <!--                  步进器 数量-->
                            <van-stepper class="step" v-model="food.is_featured" min="0" @change="stepChange(food.is_featured, food, obj.id)"/>

                        </li>
                    </ul>
                </div>

                <!--        导入底部的结算-->
                <div class="cart-bottom" >

                    <div class="over" :class="{hidden:!isShow, show: isShow}" v-if="cart_obj" >
                        <ul @click="isShow = true">
                            <div class="title">
                                <h4>购物车</h4>
                                <p class="clear">清空</p>
                            </div>
                            <li v-for="(obj, i) in cart_obj[shop_id]">
                                <div v-for="(food, j) in obj">
                                    <h4>{{food.name}}</h4>
                                    <h4>¥{{food.specfoods[0].price}}</h4>
                                    <van-stepper v-model="food.is_featured" min="0"  theme="round" button-size="20" disable-input @change="stepChange(food.is_featured, food, i)"/>
                                </div>
                            </li>

                        </ul>
                    </div>

                    <div class="bottom">
                        <div class="child"  @click="isShow = !isShow">购物车
                            <p class="num">{{getNum}}</p>
                        </div>
                        <div class="price"  @click="isShow = !isShow">
                            <h3> ¥{{getPrice}}</h3>
                            <p>配送费¥5</p>
                        </div>
                        <div class="commit-btn" @click="enterSureOrder">去结算</div>
                    </div>

                </div>
            </div>
            <CommentDetail v-else></CommentDetail>

        </div>

    </div>
</template>

<script>
    import CommentDetail from "@/components/WaiMai/CommentDetail";
    export default {
        name: "Detail",
        data(){
            return{
                bigObj:{},
                shopObj:{},
                navIndex:0,
                activeKey:0,
                rightTop:0,
                cart_obj: null,
                shop_id:0,
                big_obj:[],
                isShow:false,


            }
        },
        methods:{
            enterSureOrder(){
                this.$router.push("/detail/sure");
            },

            productAction(){
                this.navIndex = 0;
            },
            //    步进器修改
            stepChange(num, foodObj, id){


                // console.log(num, foodObj);
                //将数据存储到本地
                this.cart_obj = JSON.parse(localStorage.getItem("cart_obj"));






                let big_id = id;
                let shop_id = this.shop_id;



                if (!this.cart_obj){
                    this.cart_obj = {};
                    let arr = new Array();
                    arr.push(foodObj);
                    let obj = {};
                    obj[big_id] = arr;
                    this.cart_obj[this.shop_id] = obj;
                    localStorage.setItem("cart_obj" , JSON.stringify(this.cart_obj));
                    return;
                }


                //如果不为空
                if (this.cart_obj[shop_id]){
                    if (this.cart_obj[shop_id][big_id]){
                        //存在键值对
                        let arr = this.cart_obj[shop_id][big_id];
                        let  isExits = false;
                        let i;
                        for( i in arr){
                            let food = arr[i];
                            if (food._id === foodObj._id){
                                isExits = true;
                                break;
                            }
                        }
                        if (isExits){
                            this.cart_obj[shop_id][big_id].splice(i, 1, foodObj);
                        }else {
                            this.cart_obj[shop_id][big_id].push(foodObj);
                        }
                    }else{

                        let obj = this.cart_obj[this.shop_id];
                        let arr = new Array();
                        arr.push(foodObj);
                        obj[big_id] = arr;

                    }




                }else{
                    let arr = new Array();
                    arr.push(foodObj);
                    let obj = {};
                    obj[big_id] = arr;
                    this.cart_obj[this.shop_id] = obj;
                }



                if (num === 0){
                    let arr = this.cart_obj[shop_id][big_id];
                    let index = arr.indexOf(foodObj);
                    arr.splice(index, 1);
                }

                //再将数据放回本地
                localStorage.setItem("cart_obj" , JSON.stringify(this.cart_obj));

            },
            //获取分类角标
            getbadge(id){
                let num = 0;
                if (!this.cart_obj || !this.cart_obj[this.shop_id]) {
                    return num;
                }

                let array = this.cart_obj[this.shop_id][id];
                if (array){
                    for(let index in array){
                        num += array[index].is_featured;
                    }
                }

                return  num;
            },


        },
        computed:{
            getNum(){
                let num = 0;
                if (!this.cart_obj){
                    return num;
                }
                if (this.cart_obj[this.shop_id]){
                    for(let key in this.cart_obj[this.shop_id]){
                        let arr = this.cart_obj[this.shop_id][key];
                        for(let i in arr){
                            let food = arr[i];
                            num += parseInt(food.is_featured);
                        }
                    }
                }
                return num;

            },
            //获取总价
            getPrice(){
                let money = 0;
                if (!this.cart_obj){
                    return money;
                }
                if (this.cart_obj[this.shop_id]){
                    for(let key in this.cart_obj[this.shop_id]){
                        let arr = this.cart_obj[this.shop_id][key];
                        for(let i in arr){
                            let food = arr[i];
                            money += parseInt(food.specfoods[0].price) * food.is_featured;
                        }
                    }
                }
                return money;

            },
        },
        created() {
            //取出当前餐馆id值
            let id = localStorage.getItem("shop_id");
            this.shopObj = JSON.parse(localStorage.getItem("shop_obj"));
            //进行网络请求
            this.axios.get("/elm/shopping/v2/menu?restaurant_id=" + id).then(res=>{
                this.big_obj = res.data;
                //先取出本地的数据
                this.cart_obj = JSON.parse(localStorage.getItem("cart_obj"));
                //取出商铺id
                this.shop_id = localStorage.getItem("shop_id");

                //

                if (this.cart_obj){
                    for(let key in this.big_obj){
                        let arr = this.big_obj[key];
                        for(let i in arr.foods){
                            let obj = arr.foods[i];
                            let cartArray = this.cart_obj[this.shop_id] ? this.cart_obj[this.shop_id][arr.id] : null;
                            if (cartArray){
                                for(let j in cartArray){
                                    let cartObj = cartArray[j];
                                    if (obj._id === cartObj._id){
                                        obj.is_featured = cartObj.is_featured;
                                    }
                                }
                            }
                        }

                    }

                }


            })



        },
        components:{
            CommentDetail
        }
    }
</script>

<style scoped>
.detail{
    background-color: #f2f2f2;
    height: 100vh;
    width: 100vw;
    padding-top: 170px;
    box-sizing: border-box;
}
    .nav{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 170px;
        background-repeat: no-repeat;
        background-size: 100%;
        z-index: 2;
    }
    .nav .icon{
        position: absolute;
        left: 10px;
        top: 10px;
    }
    .header{
        width: 100%;
        height: 120px;
        background-color: rgba(0,0,0,0.5);
        padding: 40px 10px 10px;
        box-sizing: border-box;
    }
    .header img{
        width: 70px;
        border-radius: 5px;
        float: left;
    }
    .header .center{
        color: white;
        float: left;
        margin-left: 10px;
        line-height: 23px;
    }
    .center p{
        font-size: 12px;
    }

    .change-model{
        width: 100%;
        background-color: white;
        height: 27px;
        display: flex;
        justify-content: space-around;
        padding: 11px 0;
        border-bottom: 1px solid #999;



    }

    .change-model li{
        padding-bottom: 3px !important;
    }

    .active{
        color: #3190E8;
        border-bottom: 2px solid #3190E8;
    }

    .content{
        height: 447px;

    }
/*    -------------*/
.goods-detail{
    background-color: #f2f2f2;
    padding-bottom: 50px;
    height: 447px;
}
.left{
    height: 447px;
    overflow-y: scroll;
    width: 80px !important;
    float: left;
}
.right{
    height: 447px;
    overflow-y: scroll;
    background-color: white;



}
.right ul .title{
    font-size: 17px;
    padding-left: 10px;
    background-color: #f2f2f2;
    color: #666666;
    height: 40px;
    line-height: 40px;
}
.right .title span{
    font-size: 13px;
    color: #999999;
    margin-left: 13px;
}

.right li{
    background-color: white;
    padding:15px 10px;
    border-bottom: 1px solid #f2f2f2;
    position: relative;
}
.right li img{
    width: 60px;
    float: left;
}
.right li .text{
    margin-left: 70px;
    line-height: 22px;
}
.right .text .desc{
    color: #999999;
    font-size: 14px;
}
.right .text .num{
    font-size: 13px;
}
.right .text .money{
    color: #ff6600;
    font-size: 13px;
}
.right .text .money strong{
    font-size: 16px;
}

.right .activity{
    font-size: 12px;
    border: 1px solid #ff6600;
    color: #ff6600;
    display: inline-block;
    border-radius: 7px;
    line-height: 15px;
    padding:2px;
}

.right .step{
    position: absolute;
    right: 10px;
    bottom: 15px;
}
/*-------------*/
.cart-bottom{
    width: 100vw;
    height: 50px;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #333;
    z-index: 100;

}
.over{
    width: 100vw;
    height: 100vh;
    position: fixed;
    bottom: 50px;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    box-sizing: border-box;
    padding-top: 200px;
    z-index: 10;
}
.hidden{
    visibility: hidden;
}
.show{
    visibility: visible;
}

.over ul{
    background-color: #fff;
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100vw;
    height: 400px;
    overflow-y: scroll;

}
.over ul .title{
    height: 45px;
    background-color: #ECEFF1;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
}

.over ul li div{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #f2f2f2;
}
.over ul li div h4{
    width: 30%;
}
.over ul li div h4:last-of-type{
    text-align: right;
    color: #ff6600;
}
.bottom{
    color: white;
    z-index: 200;
    display: flex;
    justify-content: space-between;

}
.commit-btn{
    width: 130px;
    height: 100%;
    background-color: #4cd964;
    font-weight: bold;
    line-height: 50px;
    text-align: center;
}

.child{
    width: 100px;
    background-color: #3190E8;
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: relative;
}
.bottom .num{
    position: absolute;
    right: 1px;
    top: 1px;
    display: inline-block;
    padding: 3px;
    border-radius: 50%;
    background-color: #ff6600;
    line-height: 12px;
    font-size: 12px;
}
.price{
    padding-top: 10px;

}
.price p{
    font-size: 12px;
    width: 100px;
}
</style>