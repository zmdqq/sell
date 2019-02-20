<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar" alt="">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="des">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div class="support" v-if="seller.supports">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="support-con">
                        {{seller.supports[0].description}}
                    </span>
                </div>
            </div>
            <div v-if="seller.supports" @click="detail_show()" class="support-count">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon_right">></i>
            </div>
        </div>
        <!-- 公告部分 -->
        <div class="bulletin-wrapper" @click="detail_show">
            <span class="bullentin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon_right">></i>
        </div>
        <!-- 背景设置 -->
        <div class="bg">
            <img :src="seller.avatar" width="100%" height="100%" alt="">
        </div>
        <!-- 浮层详情页 -->
         <transition name="fade">
            <div v-show="detailshow" class="detail">
                <div class="detail-wrapper">
                    <div class="detail-main">
                    <h1 class="name-title">{{seller.name}}</h1>
                    <div class="star-wrapper">
                        <star :size="48" :score="seller.score"></star> 
                    </div>
                    <!-- 带线标题 -->
                    <div class="line-title">
                        <div class="line"></div>
                        <div class="line-text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <!-- 优惠列表 -->
                    <ul v-if="seller.supports" class="supports-list">
                        <li v-for="(item,index) in seller.supports" :key="index" class="list-item">
                            <span class="icon" :class="classMap[item.type]">
                                <!-- {{classMap[item.type]}} -->
                            </span>
                                <span class="support-con">
                                    {{item.description}}
                                </span>
                        </li>
                    </ul>
                    <!-- 商家公告 -->
                    <div class="line-title line-ad">
                        <div class="line"></div>
                        <div class="line-text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <!-- 公告内容 -->
                    <div class="ad-content">
                        <p>
                            {{seller.bulletin}}
                        </p>
                    </div>
                    </div>
                </div>
                <div class="detail-close"  @click="detail_hide">
                    <i class="icon-close">x</i>
                </div>
            </div>
         </transition>
    </div>
</template>

<script>
import star from "../star/star.vue"
export default {
    props:{
        seller:{
            type:Object
        }
    },
    data(){
        return{
            detailshow:false
        }
    },
    methods:{
        detail_show(){
            this.detailshow=true;
        },
        detail_hide(){
            this.detailshow = false;
        }
    },
    created(){
        this.classMap = ["decrease","discount","special","invoice","guarantee"]
    },
    components:{
        star
    }
}
</script>

<style>

@media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3) {
    .brand{
         background: url(brand@3x.png) no-repeat 0 0/100% 100%; 
    }
    .decrease{
        background: url(decrease_1@3x.png) no-repeat 0 0/100% 100%;
    }
    .discount{
        background: url(discount_1@2x.png) no-repeat 0 0/100% 100%;
    }
    .special{
        background: url(special_1@2x.png) no-repeat 0 0/100% 100%;
    }
    .invoice{
        background: url(invoice_1@2x.png) no-repeat 0 0/100% 100%;
    }
    .guarantee{
        background: url(guarantee_1@2x.png) no-repeat 0 0/100% 100%;
    }
    .bullentin-title{
        background:url(bulletin@3x.png)no-repeat 0 0/100% 100%;
    }
}

.header{
    color: #fff;
    background: rgba(7,17,27,.3);
    position: relative;
}
.content-wrapper{
    padding:24px 12px 18px 24px;
    display: flex;
    position: relative;
}
.avatar img{
    border-radius:2px;
}
.content{
    margin-left: 16px;
    font-size: 14px;
}
.title{
    margin:2px 0 8px;
    display:flex;
}
.brand{
    width: 30px;
    height: 18px; 
    background: url(brand@2x.png) no-repeat 0 0/100% 100%; 
}
.name{
    font-size: 16px;
    font-weight: bold;
    line-height: 18px;
    margin-left: 6px;
}
.des{
    margin:8px 0 10px;
    font-size: 12px;
    font-weight: 200;
    line-height: 12px;
}
.support{
    display: flex;
    align-items: center;
}
.icon{
    width:12px;
    height: 12px;
    margin-right: 4px;
}
.decrease{
    background: url(decrease_1@2x.png) no-repeat 0 0/100% 100%;
}
.discount{
    background: url(discount_1@2x.png) no-repeat 0 0/100% 100%;
}
.special{
    background: url(special_1@2x.png) no-repeat 0 0/100% 100%;
}
.invoice{
    background: url(invoice_1@2x.png) no-repeat 0 0/100% 100%;
}
.guarantee{
    background: url(guarantee_1@2x.png) no-repeat 0 0/100% 100%;
}
.support-con{
    font-size: 10px;
    font-weight: 200;
    line-height: 12px;
}
.support-count{
    position: absolute;
    right: 12px;
    bottom: 18px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    background: rgba(0,0,0,0.2);
    text-align: center;
    font-size: 10px;
}
.icon_right{
    margin-left: 5px;
    color: #fff;
    font-style: normal;
}
.bulletin-wrapper{
    height: 28px;
    line-height: 28px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    background: rgba(7,17,27,.2);
    
}
.bullentin-title{
    width: 22px;
    height: 12px;
    flex:0 0 auto;
    margin-right: 4px;
    background:url(bulletin@2x.png) no-repeat 0 0/22px 12px;
}
.bulletin-text{
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.bg{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    left: 0;
    top: 0;
    filter: blur(10px);
}
.detail{
    position: fixed;
    left: 0;
    top: 0;
    z-index:100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7,17,27,.8);
    /* filter: blur(10px); */
    transition: all 0.5s;
}
.detail-wrapper{
    min-height: 100%;
    color: #fff;
}
.detail-main{
    margin-top: 64px;
    padding-bottom: 64px;
}
.detail-close{
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0;
    clear:both;
    font-size: 32px;
}
.name-title{
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    line-height: 16px;
}
.star-wrapper{
    padding: 2px 0;
    margin-top: 18px;
}
.line-title{
    display:flex;
    width: 80%;
    margin:28px auto 24px;
}
.line{
    flex: 1;
    position: relative;
    top:-8px;
    border-bottom: 1px solid rgba(255,255,255,.2);
}
.line-text{
    padding:0 12px;
    font-size: 14px;
    font-weight: 700;
}
.list-item{
    display: flex;
    margin-bottom: 12px;
    padding: 0 12px;
    align-items: center;
}
.list-item .icon{
    width: 16px;
    height: 16px;
    margin-right: 6px;
}
.list-item .support-con{
    font-size: 12px;
    font-weight: 200;
    line-height: 12px;
}
.supports-list{
    width: 80%;
    margin: 28px auto 24px;
}
.line-ad{
    margin:28px auto 24px;
}
.ad-content{
    width: 80%;
    margin: 0 auto;
    font-size: 12px;
    font-weight: 200;
    line-height: 24px;
}
.ad-content p{
    padding: 0 12px;
}
.fade-enter-active, .fade-leave-active {
  background: rgba(7, 17, 27, 0.8);
  opacity: 0;
  transition: .5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
  background: rgba(7, 17, 27, 0);
}
</style>
  