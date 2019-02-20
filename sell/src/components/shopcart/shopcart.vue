<template>
<div>
    <div class="shopcart">
        <div class="shop-content" @click="toggleList">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight':totalCount>0}">
                        <i class="iconfont icon-shopping_cart icon-gouwuchekong"></i>
                    </div>
                    <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="shop-price" v-show="totalPrice>0">￥{{totalPrice}}</div>
                <div class="shop-desc">另需配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right" @click.stop.prevent="pay">
                <div class="pay" :class="payClass">
                    {{payDesc}}
                </div>
            </div>
        </div>
        <!-- 购物车中小球的飞入 -->
        <!-- <transition name="ball"> -->
            <div class="ball-container">          
                <div class="ball" v-for="(ball,index) in balls" :key="index" v-show="ball.show"></div>
                <div class="ball-inner inner-hook"></div>
            </div>
        <!-- </transition> -->
        <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
            <div class="list-header">
                <h1 class="list-title">购物车</h1>
                <span class="empty" @click="empty">清空</span>
            </div>
            <div class="list-content" ref="listContent">
                <ul v-if="selectFoods.length">
                    <li class="food" v-for="(food,index) in selectFoods" :key="index">
                        <span class="name">{{food.name}}</span>
                        <div class="list-price">
                            <span>￥{{food.price * food.count}}</span>
                        </div>
                        <div class="cartcontrol-wrapper">
                            <cartcontrol :food="food"></cartcontrol>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        </transition>
    </div>
    <transition name="mask">
        <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
</div>
</template>

<script>
import BScroll  from "better-scroll";
import cartcontrol from "../cartcontrol/cartcontrol.vue"
export default {
    data(){
        return{
            balls:[{
                    show:false
                },{
                    show:false
                },{
                    show:false
                },{
                    show:false
                },{
                    show:false
                }],
            dropBalls:[],
            fold:true
        }

    },
    components:{
        cartcontrol
    },
    props:{
        selectFoods:{
            type:Array,
            default(){
                return [
                    {
                        price:10,
                        count:2
                    }
                ]
            }
        },
        deliveryPrice:{
            type:Number,
            default:0
        },
        minPrice:{
            type:Number,
            default:0
        },

    },
    methods:{
        drop(el){
            console.log(el)
            for(let i = 0 ;i<this.balls.lenght;i++){
                let ball = this.balls[i];
                if(!ball.show){
                    ball.show = true;
                    ball.el = el;
                    this.dropBall.push(ball);
                    return ;
                }
            }
        },
        toggleList(){
            if(!this.totalCount){
                return;
            }
            this.fold = !this.fold;
        },
        empty(){
            this.selectFoods.forEach((food)=>{
                food.count=0;
            })
        },
        hideList(){
            this.fold = true;
        },
        pay(){
            if(this.totalPrice<this.minPrice){
                return;
            }
            window.alert(`支付￥ ${this.totalPrice}元`);
        }
    },
    transition:{
        ball:{
            beforeEnter(el){
                let count = this.balls.length;
                while(count--){
                    let ball = this.balls[count];
                    if(ball.show){
                        let rect = ball.el.getBoundingClientRect();
                        let x = rect.left -32;
                        let y = -(window.innerHeight - rect.top - 22);
                        el.style.display = '';
                        el.style.webkitTransform = `translate3d(0,${y}px ,0)`;
                        el.style.transform = `translate3d(0,${y}px ,0)`;
                        let inner = el.getElementsByClassName("inner-hook")[0];
                        inner.style.webkitTransform = `translate3d(${x}px ,0,0)`;
                        inner.style.transform = `translate3d(${x}px ,0,0)`;
                    }
                }
            },
            enter(el){
                // 主动触发一次浏览器重绘
                let rf = el.offsetHeight;
                this.$nextTick(()=>{
                    el.style.webkitTransform = 'translate3d(0,0 ,0)';
                        el.style.transform = `translate3d(0,0 ,0)`;
                        let inner = el.getElementsByClassName("inner-hook")[0];
                        inner.style.webkitTransform = `translate3d(0 ,0,0)`;
                        inner.style.transform = `translate3d(0 ,0,0)`;
                })
            },
            afterEnter(el){
                let ball = this.dropBalls.shift();
                if(ball){
                    ball.show=false;
                    el.style.display="none";
                }
            }
        }    
    },
    computed:{
        totalPrice(){
            let total = 0;
            this.selectFoods.forEach((food)=>{
                total += food.price*food.count;
            })
            return total;
        },
        totalCount(){
            let count = 0;
            this.selectFoods.forEach((counts)=>{
                count+=counts.count;
            })
            return count;
        },
        payDesc(){
            if(this.totalPrice === 0){
                return '￥'+this.minPrice+'元起送'
            }else if(this.totalPrice<this.minPrice){
                let diff = this.minPrice-this.totalPrice;
                return "还差￥"+diff+'元起送';
            }else{
                return "去结算"
            }
        },
        payClass(){
            if(this.totalPrice<this.minPrice){
                return 'not-enough'
            }else{
                return "enough"
            }
        },
        listShow(){
            if(!this.totalCount){
                this.fold = true;
                return false;
            }
                let show = !this.fold;
                if(show){
                    this.$nextTick(()=>{
                        if(!this.scroll){
                            this.scroll = new BScroll(this.$refs.listContent,{
                                click:true
                            })
                        }else{
                            this.scroll.refresh();
                        }
                    })
                }
             return show;  
        }
    }
}
</script>

<style>
.shopcart{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    height: 48px;
    width: 100%;
    background: #000;
}
.shop-content{
    display: flex;
    background: #141d27;
}
.content-left{
    flex: 1;
    display: flex;
}
.logo-wrapper{
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    vertical-align: top;
    border-radius: 50%;
    background: #141d27;

}
.logo{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #2b343c;
    text-align: center;
}
.icon-shopping_cart{
    line-height: 44px;
    font-size: 24px;
    color: #ccc;
}
.shop-price{
    vertical-align: top;
    margin: 12px 0;
    line-height: 24px;
    padding-right: 12px;
    box-sizing: border-box;
    border-right: 1px solid rgba(255, 255, 255, .1);
    font-size: 16px;
    color: rgba(255, 255, 255, .4);
    font-weight: 700;
}
.shop-desc{
    margin: 12px 0 0 12px;
    vertical-align: top;
    line-height: 24px;
    color: rgba(255, 255, 255, .4);
    font-size: 10px;
}
.content-right{
    flex: 0 0 105px;
    width: 105px;
}
.pay{
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    color: rgba(255, 255, 255, .4);
    font-weight: 700;
    background: #2b343c;
}
/* 购物车的数量 */
.num{
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    font-weight: 700;
    font-size: 9px;
    color: #fff;
    background: rgb(240, 20, 20);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
}
.highlight{
    background:skyblue;
}
.highlight i{
    color: #fff;
}
.enough{
    color: #fff;
    background: #00b43c;
    font-weight: bold;
}
.not-enough{
    background: #2b333b;
}
/* 小球飞入 */
.ball{
    position:fixed;
    left: 32px;
    bottom: 22px;
    z-index: 200;
}
.ball-wrapper{
    transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
}
.ball-enter-active, .ball-leave-active {
  opacity: 1;
  transform: translate3d(0,0,0);

}
.ball-enter, .ball-leave-to /* .fade-leave-active below version 2.1.8 */ {
 opacity: 0;
  transform: translate3d(24px,0,0);
}
.ball-inner{
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: rgb(0, 160, 220);
    transition: all .4s linear;
}
.shopcart-list{
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
}
.fold-enter-active, .fold-leave-active {
  /* opacity: 1; */
  transform: translate3d(0,-100%,0);
  transition: all .5s;
}
.fold-enter, .fold-leave-to /* .fade-leave-active below version 2.1.8 */ {
 /* opacity: 0; */
  transform: translate3d(0,0,0);
}
.list-header{
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    background: #f3f5f7;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.list-title{
    font-size: 14px;
    color: rgb(7, 17, 27);
}
.empty{
    font-size: 12px;
    color: rgb(0, 160, 220);
}
.list-content{
    padding: 0 18px;
    max-height: 217px;
    overflow: hidden;
    background: #fff;
}
.food{
    position: relative;
    padding: 12px 0;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
}
.list-price{
    position: absolute;
    right: 90px;
    bottom: 12px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(240, 20, 20);
}
.cartcontrol-wrapper{
    position: absolute;
    bottom: 6px;
    right: 0;

}
.list-mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    z-index: 40;
}
.mask-enter-active, .mask-leave-active {
    transition: all .5s;
    opacity: 1;
    background: rgba(7, 17, 27, .6);
}
.mask-enter, .mask-leave-to /* .fade-leave-active below version 2.1.8 */ {
 opacity: 0;
  background: rgba(7, 17, 27, .0);
}
</style>
