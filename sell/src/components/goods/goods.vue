<template>
    <div class="goods">
        <!-- 左边侧边栏 -->
        <div class="menu-wrapper" ref="menuWrapper">
            <ul v-if="goods.length">
                <li v-for="(good,index) in goods" 
                :key="index" 
                class="menu-item" 
                :class="{'current':currentIndex===index}" 
                @click="selectMenu(index,$event)">
                    <span class="text">
                        <i class="icon" :class="classMap[good.type]" v-show="good.type>0"></i>{{good.name}}
                    </span>
                </li>
            </ul>
        </div>
        
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul v-if="goods.length">
                <li v-for="(item,index) in goods" :key="index" class="foods-list foods-list-hook">
                    <h1 class="foods-title">{{item.name}}</h1>
                    <ul v-if="item.foods.length">
                        <li @click="selectFood(food,$event)" v-for="(food,index) in item.foods" :key="index" class="foods-item">
                            <div class="foods-icon">
                                <img :src="food.icon" alt="">
                            </div>
                            <div class="content">
                                <h2 class="foods-name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span>月售{{food.sellCount}}份</span><span class="foods-rating">好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="control-wrapper">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
        <food :food="selectedFood" ref="food"></food>
    </div>
</template>

<script>
import BScroll  from "better-scroll";
import shopcart from "../shopcart/shopcart.vue"
import cartcontrol from "../cartcontrol/cartcontrol.vue"
import food from "../food/food.vue"
export default {
    props:{
        seller:{
            type:Object
        }
    },
    components:{
        shopcart,cartcontrol,food
    },
    event:{
        // 子父通信
        'cart.add'(target){
            this._drop(target)
        }
    },
    data(){
        return{
            goods:[],
            listHeight:[],
            scrollY:0,
            selectedFood:{}
        }
    },
    computed:{
        currentIndex(){
            for(let i= 0;i<this.listHeight.length;i++){
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i+1];
                if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
                    return i;
                }

            }
            return 0;
        },
        selectFoods(){
            let foods = [];
            this.goods.forEach((good)=>{
                good.foods.forEach((food)=>{
                    if(food.count){
                        foods.push(food)
                    }
                })
            })
            return foods;
        }
    },
    created(){
        // 定义的icon图标的样子
        this.classMap = ["decrease","discount","special","invoice","guarantee"];

        // 请求的goods数据
        this.$http.get("http://localhost:3000/api/goods").then(res=>{
            this.goods = res.body.goods;
            this.$nextTick(()=>{
                this._initScroll()
                this._calculateHeight()
            })
        })
    },
    methods:{
        _initScroll(){
            this.menuScroll = new BScroll(this.$refs.menuWrapper,{
                click:true
            })
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
                click:true,
                probeType:3
            });
            this.foodsScroll.on("scroll",(pos)=>{
                this.scrollY = Math.abs(Math.round(pos.y))
            })
        },
        _calculateHeight(){
            let foodList = this.$refs.foodsWrapper.getElementsByClassName("foods-list-hook");
            let height = 0;
            this.listHeight.push(height)
            for(let i =0 ;i < foodList.length;i++){
                let item = foodList[i]
                height+=item.clientHeight;
                this.listHeight.push(height)
            }
        },
        selectMenu(index,event){
            if(!event._constructed){
                return ;
            }
            let foodList = this.$refs.foodsWrapper.getElementsByClassName("foods-list-hook");
            let el = foodList[index];
            this.foodsScroll.scrollToElement(el,300)
        },
        _drop(target){
            // 体验优化，异步执行下落动画
            this.$nextTick(()=>{
                this.$refs.shopcart.drop(target)
            })
        },
        selectFood(food,event){
            if(!event._constructed){
                return;
            }
            this.selectedFood = food;
            this.$refs.food.show()
        }
    }
}

</script>

<style>
@media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3) {
    .decrease{
        background: url(decrease_3@3x.png) no-repeat 0 0/100% 100%;
    }
    .discount{
        background: url(discount_3@2x.png) no-repeat 0 0/100% 100%;
    }
    .special{
        background: url(special_3@2x.png) no-repeat 0 0/100% 100%;
    }
    .invoice{
        background: url(invoice_3@2x.png) no-repeat 0 0/100% 100%;
    }
    .guarantee{
        background: url(guarantee_3@2x.png) no-repeat 0 0/100% 100%;
    }
}
.goods{
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width:100%;
    overflow: hidden;
}
.menu-wrapper{
    flex:0 0 80px;
    width: 80px;
    background: #f3f5f7;
}
.menu-item{
    display: table;
    height: 54px;
    width: 56px;
    line-height: 14px;
    padding:0 12px;
}
.icon{
    display:inline-block;
    vertical-align: top;
    width:12px;
    height: 12px;
    margin-right: 2px;
}
.decrease{
    background: url(decrease_3@2x.png) no-repeat 0 0/100% 100%;
}
.discount{
    background: url(discount_3@2x.png) no-repeat 0 0/100% 100%;
}
.special{
    background: url(special_3@2x.png) no-repeat 0 0/100% 100%;
}
.invoice{
    background: url(invoice_3@2x.png) no-repeat 0 0/100% 100%;
}
.guarantee{
    background: url(guarantee_3@2x.png) no-repeat 0 0/100% 100%;
}
.text{
    font-size: 12px;
    display:table-cell;
    width: 56px;
    vertical-align: middle;
    position: relative;
}
.text:after{
    content:"";
    position: absolute;
    left: 0;
    width: 100%;
    height: 1px;
    bottom: 0;
    background: rgba(7, 17, 27, .1);

}
.foods-wrapper{
    flex:1;
}
.foods-title{
    font-size: 12px;
    color: rgb(147, 153, 159);
    line-height: 26px;
    height: 26px;
    text-indent: 14px;
    border-left: 2px solid #d9dde1;
    background: #f3f5f7;
}
.foods-item{
    display: flex;
    margin:18px;
    position: relative;
    padding-bottom: 18px;
    
}
.foods-item:after{
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: rgba(7, 17, 27, .1);
}
.foods-item:after:last-child{
     content: "";
    height: 0px;
}
.foods-item:last-child{
    margin-bottom: 0;
}
.foods-icon{
    flex:0 0 57px;
    height: 57px;
    margin-right: 10px;
    /* height:  */
}
.foods-icon img{
    width: 100%;
    height: 100%;
}
.content{
    flex: 1;
}
.foods-name{
    margin: 2px 0 8px 0;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    color: rgb(7, 17, 27);
}
.desc{
    margin-bottom: 8px;
    line-height: 12px!important;
}
.desc,.extra{
    font-size: 10px;
    color: rgb(147, 153, 159);
    line-height: 10px;
}
.foods-rating{
    margin-left: 12px;
}
.price{
    font-weight: 700;
    line-height: 24px;
}
.now{
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240, 20, 20);
}
.old{
    font-size: 10px;
    text-decoration: line-through;
    color: #d9dde1;
}
.current{
    position: relative;
    z-index: 10;
    margin-top: -1px;
    background: #fff;
    font-weight: 400;
}
.current .text{
    color: #000;
}
.control-wrapper{
    position: absolute;
    right: 0;
    bottom: 12px;
}
</style>
