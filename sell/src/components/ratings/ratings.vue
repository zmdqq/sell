<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <!-- 评分 -->
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="ov-title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="serve serves">服务态度</span>
                        <star :size="36" :score="seller.serviceScore"></star>
                        <span class="score serves">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="serve serves">商品信息</span>
                        <star :size="36" :score="seller.foodScore"></star>
                        <span class="score serves">{{seller.foodScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="serve serves">送达时间</span>
                        <span class="min serves">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <!-- 分割线 -->
            <split></split>
            <!-- 评价 -->
            <ratingselect 
                :ratings="ratings" 
                :selectType="selectType" 
                :desc="desc" 
                :onlyContent="onlyContent"
                @ratingtype:select = "typeSelect"
                @content:toggle="togglesContent"
            ></ratingselect>
            <!-- <ratingselect
            :ratings = "ratings"
            :selectType = "selectType"
            :desc = "desc"
            :onlyContent = "onlyContent"
            @ratingtype:select = "typeSelect"
            @content:toggle = "togglesContent"
            ></ratingselect> -->
            <div class="ratings-wrapper">
                <ul>
                    <li v-show="needShow(rating.rateType,rating.text)" class="rating-item" :key="index" v-for="(rating,index) in ratings">
                        <div class="avatar"><img width="28" height="28" :src="rating.avatar" alt=""></div>
                        <div class="content">
                            <h1 class="con-name">{{rating.username}}</h1>
                            <div class="stars-wrapper">
                                <star :size="24" :score="rating.score"></star>
                                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                            </div>
                            <p class="rating-txt">{{rating.text}}</p>
                            <div class="recommend">
                                <i class="iconfont" :class="{'icon-zan':rating.rateType==0,'icon-cai':rating.rateType==1}"></i>
                                <span class="rec-con" v-for="(item,index) in rating.recommend" :key="index">
                                    {{item}}
                                </span>
                            </div>
                            <div class="times">
                                {{rating.rateTime | formateDates}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll  from "better-scroll";
import star from "../star/star";
import {formatDate} from "../../date.js"
import split from "../split/split.vue"
import ratingselect from "../ratingSelect/ratingSelect.vue"
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
    props:{
        seller:{
            type:Object
        }
    },
    data(){
        return{
            showFlag:false,
            selectType:ALL,
            ratings:[],
            onlyContent:true,
            desc:{
                all:"全部",
                positive:"满意",
                negative:"不满意"
            }
        }
    },
    components:{
        star,split,ratingselect
    },
    filters:{
        formateDates(time){
            let date = new Date(time);
            return formatDate(date,'yyyy-MM-dd hh:mm')
        }
    },
    methods:{
        typeSelect(data){ 
           if(data==0){
               this.selectType = POSITIVE;
           }else if(data ==1){
               this.selectType = NEGATIVE;
           }else if(data == 2){
               this.selectType = ALL;
           }
           this.selectType = data;
           this.$nextTick(()=>{
                this.scroll.refresh()
           })
       },
       togglesContent(data){
           this.onlyContent = !data;
           this.$nextTick(()=>{
                this.scroll.refresh()
           })
       },
       needShow(type,txt){
           if(this.onlyContent && !txt){
               return false;
           }
           if(this.selectType == ALL){
               return true;
           }else{
               return type == this.selectType;
           }
       }
    },
    created(){
        this.$http.get("http://localhost:3000/api/ratings").then((data)=>{
           this.ratings = data.body.ratings
           this.$nextTick(()=>{
                this.scroll = new BScroll(this.$refs.ratings,{
                    click:true
                })
           })
        })
       
    }
}
</script>

<style>
.ratings{
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
}
.overview{
    display: flex;
    padding: 18px 0;
}
.overview-left{
    flex: 0 0 137px;
    border-right: 1px solid rgba(7, 17, 27, .1);
    text-align: center;
    padding: 6px 0;
}
.overview-right{
    flex: 1;
    padding-left: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.score{
    font-size: 24px;
    color: rgb(255, 153, 0);
    line-height: 28px;
    /* margin-bottom: 6px; */
}
.ov-title{
    font-size: 12px;
    color: rgb(7, 17, 27);
    line-height: 18px;
    margin:6px 0 8px;
}
.rank{
    font-size: 10px;
    color: rgb(147, 153, 159);
    line-height: 10px;
}
.score-wrapper{
    display: flex;
}
.score-wrapper .serve{
    color: rgb(7, 17, 27);
}
.score-wrapper .serves{
    font-size: 12px;
    line-height: 18px;
    margin-right: 12px;
}
.score-wrapper .score{
    color: rgb(255, 153, 0);
    margin-left: 12px;
}
.score-wrapper .min{
    margin-left: 12px;
    color: rgb(147, 153, 159);
}
.ratings-wrapper{
    margin: 0 18px;
}
.rating-item{
    display: flex;
    padding: 18px 0;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
}
.rating-item .avatar img{
    border-radius: 50%;
}
.rating-item .content{
    position: relative;
}
.con-name{
    font-size: 10px;
    color: rgb(7, 17, 27);
    line-height: 12px;   
}
.stars-wrapper{
    display: flex;
    margin:4px 0 6px;
}
.delivery{
    font-size: 10px;
    font-weight: 200;
    color: rgb(147, 153, 159);
    line-height: 12px;
    margin-left: 6px;
}
.rating-txt{
    font-size: 12px;
    color: rgb(7, 17, 27);
    line-height: 18px;
}
.recommend{
    display: flex;
    margin-top: 8px;
    flex-wrap: wrap;
}
.recommend>i.icon-zan{
   font-size: 12px;
   color: rgb(0, 160, 220);
   line-height: 16px;
}
.rec-con{
    font-size: 9px ;
    color: rgb(147, 153, 159);
    line-height: 16px;
    border:1px solid rgba(7, 17, 27, .1);
    border-radius: 2px; 
    margin-left: 8px;
    margin-bottom: 4px;
    padding:0 6px ;
}
.times{
    position: absolute;
    right: 0;
    top: 0;
    font-size: 10px;
    font-weight: 200;
    color: rgb(147, 153, 159);
    line-height: 12px;
}
</style>
