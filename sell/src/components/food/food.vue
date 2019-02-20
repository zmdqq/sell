<template>
    <transition name="food">
        <div class="foods" ref="food" v-show="showFlag">
            <div class="food-content">
                <div class="img-header">
                    <img :src="food.image" alt="" class="food-img">
                    <div class="back" @click="hide">
                        <i class="inconfont "> &lt; </i>
                    </div>
                </div>
                <div class="fd-content">
                    <h1 class="fd-title">{{food.name}}</h1>
                    <div class="fd-detail extra">
                        <span>月售{{food.sellCount}}份</span><span class="foods-rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cartcontrol :food="food"></cartcontrol>
                    </div>
                    <transition name="buy">
                        <div class="buy" @click.stop.prevent="addFirst(food,$event)" v-show="!food.count||food.count==0">加入购物车</div>
                    </transition>
                </div>
                <split></split>
                <div class="food-info" v-show="food.info">
                    <div class="food-title">商品信息</div>
                    <div class="food-text">{{food.info}}</div>
                </div>
                <split></split>    
                <div class="rating">
                    <h1 class="food-title">商品评价</h1>
                    <ratingselect 
                        :ratings="food.ratings" 
                        :selectType="selectType" 
                        :desc="desc" 
                        :onlyContent="onlyContent"
                        @ratingtype:select= "type"
                        @content:toggle="toggles"
                    ></ratingselect>
                    <div class="rating-wrapper" v-if="food.ratings">
                        <ul v-show="food.ratings && food.ratings.length">
                            <li v-show="needShow(rating.rateType,rating.text)" class="rating-item" :key="index" v-for="(rating,index) in food.ratings">
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img :src="rating.avatar" width="12" height="12" alt="" class="avatar">
                                </div>
                                <div class="time">
                                    {{rating.rateTime | formateDates}}
                                </div>
                                <p class="rating-text">
                                    <i class="iconfont" :class="{'icon-zan':rating.rateType==0,'icon-cai':rating.rateType==1}"></i>
                                    {{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.ratings && !food.ratings.length">
                            暂无评价
                        </div>
                    </div>
                </div>            
            </div>
        </div>
    </transition>
</template>

<script>
import BScroll  from "better-scroll";
import cartcontrol from "../cartcontrol/cartcontrol.vue"
import split from "../split/split.vue"
import Vue from "vue"
import ratingselect from "../ratingSelect/ratingSelect.vue"
import {formatDate} from "../../date.js"
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
    props:{
        food:{
            type:Object
        }
    },
    data(){
        return{
            showFlag:false,
            selectType:ALL,
            onlyContent:true,
            desc:{
                all:"全部",
                positive:"推荐",
                negative:"吐槽"
            }
        }
    },
    components:{
        cartcontrol,split,ratingselect
    },
    filters:{
        formateDates(time){
            let date = new Date(time);
            return formatDate(date,'yyyy-MM-dd hh:mm')
        }
    },
    methods:{
        show(){
            this.showFlag=true;
            this.selectType = 0;
            this.onlyContent = true;
            this.$nextTick(()=>{
                // console.log(this.$refs.food)
                if(!this.scroll){
                    this.scroll = new BScroll(this.$refs.food,{
                        click:true
                    })
                }else{
                    this.scroll.refresh()
                }
            })
        },
        hide(){
            this.showFlag=false;
        },
       addFirst(food,event){
           if(!event._constructed){
               return;
           }
        //    this.$dispatch("cart.add",event.target);
           Vue.set(this.food,"count",1);
       },
       type(data){ 
           if(data==0){
               this.selectType = POSITIVE;
           }else if(data ==1){
               this.selectType = NEGATIVE;
           }else if(data == 2){
               this.selectType = ALL;
           }
           this.selectType = data;
       },
       toggles(data){ 
           this.onlyContent = !data;
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
    }
}
</script>

<style>
.foods{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background: #fff;
}
.food-enter-active, .food-leave-active {
  /* opacity: 1; */
  transform: translate3d(0,0,0);
  transition: all .2s linear;

}
.food-enter, .food-leave-to /* .fade-leave-active below version 2.1.8 */ {
  /* opacity: 0; */
  transform: translate3d(100%,0,0);
}
.img-header{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    /* padding的100%是相对于宽度计算的 */
}
.food-img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.back{
    position: absolute;
    top: 10px;
    left: 0;

}
.back>i{
    display: inline-block;
    padding: 10px;
    font-size: 20px;
    color: #fff;
}
.fd-content{
    position: relative;
    padding: 18px;
}
.fd-title{
    line-height: 14px;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(7, 17, 27);
}
.fd-detail{
    margin-bottom: 18px;
    line-height: 10px;
    color: rgb(147, 153, 159);
}
.cartcontrol-wrapper{
    position: absolute;
    right: 12px;
    bottom: 12px;
}
.buy{
    position: absolute;
    right: 18px;
    bottom: 18px;
    z-index: 10;
    height: 24px;
    line-height: 24px;
    padding: 0 12px;
    box-sizing: border-box;
    font-size: 10px;
    border-radius: 12px;
    color: #fff;
    background: rgb(0, 160, 220);
}
.buy-enter-active, .buy-leave-active {
  opacity: 1;
  transition: all .2s linear;
}
.buy-enter, .buy-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.food-info{
    padding: 18px;
}
.food-title{
    line-height: 14px;
    margin-bottom: 6px;
    font-size: 14px;
    color: rgb(7, 17, 27);
}
.food-text{
    color: rgb(77, 85, 93);
    line-height: 24px;
    padding: 0 8px;
    font-size: 12px;
}
.rating .food-title{
    margin: 18px 0 0 18px;
}
.rating-wrapper{
    padding: 0 18px;
}
.rating-item{
    position: relative;
    padding: 16px 0;
}
.rating-item{
    border-bottom: 1px solid rgba(7, 17, 27,.1);
}
.user{
    position: absolute;
    right: 0;
    top: 16px;
    line-height: 12px;
}
.name{
    margin-right: 6px;
    vertical-align: top;
    font-size: 10px;
    color: rgb(147, 153, 159);
}
.avatar{
    border-radius: 50%;
}
.time{
    margin-bottom: 6px;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
}
.rating-text{
    line-height: 16px;
    font-size: 12px;
    color: rgb(7, 17, 27);
}
.rating-text i{
    margin-right: 4px;
    line-height: 16px;
}
.icon-zan{
    color: rgb(0, 160, 220);
}
.icon-cai{
    color: rgb(147, 153, 159);
}
.no-rating{
    padding:16px 0;
    font-size: 12px;
    color: rgb(147, 153, 159);
}
</style>
