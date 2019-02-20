<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" @click.stop.prevent="decCart($event)" v-show="food.count>0">
                <span class="inner">
                    <i class="iconfont icon-wuuiconsuoxiao"></i>
                </span>
            </div>
        </transition>
            <div class="cart-count"  v-show="food.count>0">{{food.count}}</div>
            <div class="cart-add" @click.stop.prevent="addCart($event)">
                <i class="iconfont icon-wuuiconxiangjifangda"></i>
            </div>
    </div>
</template>

<script>
import Vue from "vue";
export default {
    props:{
        food:{
            type:Object
        }
    },
    methods:{
        addCart(event){
            if(!event._constructed){
                return;
            }
            if(!this.food.count){
                Vue.set(this.food,"count",1);
            }else{
                this.food.count++;
            }
            // this.$dispatch("cart.add",event.target);
        },
        decCart(event){
            if(!event._constructed){
                return;
            }
            if(this.food.count){
                this.food.count--;
            }else{
                Vue.set(this.food,"count",1);
            }
        }
    },
    created(){ }
}
</script>

<style>
.cartcontrol{
    display: flex;
}
.cart-decrease,.cart-add{
    padding: 6px;
    font-size: 24px;
    line-height: 24px;
    color: rgb(0, 160, 220);
    border-radius: 50%;
    transition: all .4s linear;
}
.inner{
    line-height: 24px;
    border-radius: 50%;
    transform: rotate(180deg);
    
}
.cart-add{
}
.cart-count{
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
}
.move-enter-active, .move-leave-active {
   transform: translate3d(0 ,0 ,0);
  opacity: 1;
}
.move-enter, .move-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translate3d(24px,0,0) rotate(180deg);
}
</style>
