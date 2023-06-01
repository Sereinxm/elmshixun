<template>
    <div class="comment-detail">
        <div class="score">
            <div class="left">
                <p class="food_score">{{scoreObj['food_score'].toFixed(1)}}</p>
                 <p>综合评价</p>
                <p>高于周边商家{{(scoreObj.compare_rating * 100).toFixed(1)}}%</p>
            </div>
            <ul class="right">
                <li>
                服务态度&nbsp;&nbsp;<van-rate v-model="scoreObj.service_score" readonly allow-half :size="10"
                              color="#ffd21e"/>
                <span>{{scoreObj.service_score.toFixed(1)}}</span>
                </li>
                <li>
                    菜品评价&nbsp;&nbsp;<van-rate v-model="scoreObj.overall_score" readonly allow-half  :size="10"
                                  color="#ffd21e"/>
                    <span>{{scoreObj.overall_score.toFixed(1)}}</span>
                </li>
                <li>
                    送达时间&nbsp;&nbsp;{{scoreObj.deliver_time}} <span class="time">分钟</span>
                </li>
            </ul>
        </div>

<!--        标签分类-->
        <div class="content">
            <ul class="tag">
                <li v-for="(obj, i) in tag" @click="tagIndex = i" :class="{active: i == tagIndex}">
                  {{obj.name}}({{obj.count}})
                </li>
            </ul>
            <ul class="comment">
                <li v-for="(obj, i) in commentArray">
                    <img src="https://elm.cangdu.org/img/default.jpg" />
                    <div class="text">
                        <p>{{obj.username}}</p>
                        <van-rate v-model="obj.rating_star" readonly allow-half :size="10"
                                  color="#ffd21e"/>
                        <span>{{obj.time_spent_desc}}</span>
                        <br/> <br/>
                        <div class="comment-content" v-for="(v, i) in obj.item_ratings">
                            {{v.food_name}}
                        </div>

                    </div>
                    <p class="time">{{obj.rated_at}}</p>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    export default {
        name: "CommentDetail",
        data(){
            return{
               scoreObj:{},
                tag:[],
                commentArray:[],
                tagIndex:0
            }
        },
        created() {
            let shop_id = localStorage.getItem("shop_id");
            this.axios.get("/elm/ugc/v2/restaurants/" + shop_id + "/ratings/scores").then(res=>{
                this.scoreObj = res.data;
            })

            this.axios.get("/elm/ugc/v2/restaurants/" + shop_id + "/ratings/tags").then(res=>{
                this.tag = res.data;
            })

            this.axios.get("/elm/ugc/v2/restaurants/" + shop_id + "/ratings?has_content=true&offset=0&limit=20&tag_name=%E6%BB%A1%E6%84%8F").then(res=>{
                this.commentArray = res.data;
            })

        }
    }
</script>

<style scoped>
.comment-detail{
    background-color: #f2f2f2;
    height: 100vh;
}
    .score{
        background-color: white;
        padding: 20px 0;
        height: 80px;
        color: #666666;
        line-height: 25px;
    }
    .score .left{
        float: left;
        width: 35%;
        padding-left: 10%;
        text-align: center;

    }
    .score .left p:first-of-type{
        color: #ff6600;
        font-size: 22px;
    }
.score .left p:nth-of-type(3){
   color: #999999;
    font-size: 13px;
}
    .score .right{
        float: left;
        padding-left: 5%;
        width: 45%;
        font-size: 14px;
    }
    .score .right span{
        margin-left: 10px;
        color: #ff6600;
        font-size: 14px;
    }
.score .right li:last-of-type span{
    margin-left: 0;
    color: #999999;
}
/*    --------------------------*/
.content{
    margin-top: 7px;
}
    .tag{
        background-color: white;
        color: #6D7885;
        width: 96vw;
        padding-top: 13px;
        overflow: hidden;
        padding-left: 4vw;
        padding-bottom: 6px;
        border-bottom: 1px solid #f2f2f2;
    }
    .tag li{
        background-color: #EBF5FF;
        padding: 8px 5px;
        float: left;
        margin-right: 10px;
        font-size: 14px;
        border-radius: 5px;
        margin-bottom: 6px;

    }
    .active{
        color: #fff;
        background-color: #3190E8 !important;
    }

    .comment {
        background-color: #fff;
    }
    .comment li{
        padding: 15px 10px;
        border-top: 1px solid #999999;
        color: #666666;
        position: relative;
    }
    .comment li img{
        width: 40px;
        border-radius: 50%;
        float: left;
    }
    .text{
        margin-left: 60px;
        font-size: 14px;
    }
    .text span:first-of-type{
        margin-left: 10px;
        font-size: 13px;
    }
    .text .comment-content{
        padding: 5px;
        border: 1px solid #f2f2f2;
        margin-bottom: 4px;
        border-radius: 5px;
        display: inline-block;

    }
    .time{
        position: absolute;
        right: 17px;
        top: 20px;
        font-size: 13px;
    }

</style>