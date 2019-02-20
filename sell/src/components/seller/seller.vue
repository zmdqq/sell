<template>
    <div class="sellers" ref="sellers">
        <div class="sellers-content">
            <!-- 基本商家信息 -->
            <div class="sel-overview sel">
                <h1 class="sellers-title">{{seller.name}}</h1>
                <div class="sel-desc">
                    <star :size="36" :score="seller.score"></star>
                    <span class="sel-text sel-txt">({{seller.ratingCount}})</span>
                    <span class="sel-text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="sel-block">
                        <h2>商家配送</h2>
                        <div class="cont">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="sel-block sel-time">
                        <h2>平均配送时间</h2>
                        <div class="cont">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                    <li class="sel-block">
                        <h2>起送价</h2>
                        <div class="cont">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                </ul>
                <div class="heart" @click="isCollect">
                    <i class="iconfont icon-heart" :class="{active:flag}"></i>
                    <span class="heart-text">{{collectTxt}}</span>
                </div>
            </div>
            <!-- 分割线 -->
            <split></split>
            <!-- 公告 -->
            <div class="sellers-activty sel">
                <h1 class="sellers-title">公告与活动</h1>
                <p class="sel-con">
                    {{seller.bulletin}}
                </p>
                <div class="active-wrapper">
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
                </div>
            </div>
            <!-- 分割线 -->
            <split></split>
            <!-- 商家实景 -->
            <div class="sellers-view sel">
                <h1 class="sellers-title">商家实景</h1>
                <div class="sel-wrapper" ref="selWrapper">
                    <ul class="pics-list" ref="pics">
                        <li v-for="(item,index) in seller.pics" :key="index">
                            <img width="120" height="90" :src="item" alt="">
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 分割线 -->
            <split></split>
            <!-- 商家信息 -->
            <div class="sellers-info sel" v-if="seller.infos">
                <h1 class="sellers-title">商家信息</h1>
                <ul class="sel-list" v-show="seller.infos.length">
                    <li class="sel-item" :key="index" v-for="(item,index) in seller.infos">
                        {{item}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll  from "better-scroll";
import star from "../star/star";
import split from "../split/split.vue"
// import {saveToLocal,loadFromLocal} from "../../storage.js";

export default {
    props:{
        seller:{
            type:Object
        }
    },
    data(){
        return{
            // flag:(()=>{
            //     return loadFromLocal(this.seller.id)
            // })()
            flag:false
        }
    },
    components:{
        star,split
    },
    computed:{
         collectTxt(){
            return this.flag? "已收藏":"未收藏";
        }
    },
    methods:{
        _initPics(){
            if(this.seller.pics){
            let picWidth = 120;
            let margin = 6;
            let width = (picWidth+margin)*this.seller.pics.length;
            this.$refs.pics.style.width = width+"px";
            console.log(this.$refs.pics)
            this.$nextTick(()=>{
                if(!this.picScroll){
                    this.picScroll = new BScroll(this.$refs.selWrapper,{
                        scrollX:true,
                        eventPassthrough:"vertical"
                    })
                }else{
                    this.picScroll.refresh()
                }
            })
        }},
        isCollect(){
            this.flag = !this.flag;
        }
        
    },
   watch:{
       "seller"(){
           this._initPics()
       }
   },
    created(){
        this.$nextTick(()=>{
            this.scroll = new BScroll(this.$refs.sellers,{
                click:true
            })
        })
        this.classMap = ["decrease","discount","special","invoice","guarantee"];
       
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
.sellers{
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
}
.sel-desc{
    display: flex;
    margin: 8px 0 18px 0;
}
.sel-text{
    font-size: 10px;
    color: rgb(77, 85, 93);
    line-height: 18px;
}
.sel-txt{
    margin: 0 12px 0 8px;
}
.remark{
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid rgba(7, 17, 27, .1);
    padding: 18px 0;
}
.sel-block{
    width: 33.3%;
    text-align: center;
}
.sel-time{
    border-left: 1px solid rgba(7, 17, 27, .1);
    border-right: 1px solid rgba(7, 17, 27, .1);
}
.cont{
    font-size: 10px;
    line-height: 20px;
    font-weight: 200;
    color: rgb(7, 17, 27);
}
.sel-block>h2{
    font-size: 10px;
    color: rgb(147, 153, 159);
    line-height: 10px;
    margin-bottom: 4px;
}
.stress{
    font-size: 20px;
}
.heart{
    position: absolute;
    right: 18px;
    top: 18px;
    display: flex;
    flex-direction: column;
    color: rgb(77, 85, 93);
}
.heart .iconfont{
    font-size: 24px;
    line-height: 24px;
}
.heart .active{
    color:#f00;
}
.heart-text{
    margin-top: 4px;
    line-height: 10px;
    font-size: 10px;
}
.active-wrapper .supports-list{
    margin: 0;
    width: 100%;
}
.active-wrapper .list-item{
    margin-bottom: 0;
    padding: 16px 12px;
    border-top: 1px solid rgba(7, 17, 27, .1);
}
.active-wrapper .support-con{
    line-height: 16px;
}
.sel-con{
    font-size: 12px;
    font-weight: 200;
    color: rgb(240, 20, 20);
    line-height: 24px;
    padding: 0 12px;
    margin-bottom: 16px;
}
.sel-wrapper{
    width:100%;
    overflow: hidden;
    white-space: nowrap;
}
.pics-list{
    display: flex;  
}
.pics-list li{
    margin-right: 6px;
}

.sel{
    padding: 18px;
}
.sel>h1{
    margin-bottom: 12px;
    font-size: 14px;
    color: rgb(7, 17, 27);
    line-height: 14px;
}
.sel-item{
    padding: 16px 12px;
    color: rgb(7, 17, 27);
    font-weight: 200;
    line-height: 16px;
    font-size: 12px;
    border-top: 1px solid rgba(7, 17, 27, .1);
}
</style>
