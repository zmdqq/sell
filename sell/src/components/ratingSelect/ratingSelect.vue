<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span @click="select(2,$event)" class="block positive" :class="{'active':selectType==2}">{{desc.all}}<em class="ratCount">{{ratings.length}}</em></span>
            <span @click="select(0,$event)" class="block positive" :class="{'active':selectType==0}">{{desc.positive}}<em class="ratCount">{{positives.length}}</em></span>
            <span @click="select(1,$event)" class="block negative" :class="{'active':selectType==1}">{{desc.negative}}<em class="ratCount">{{negatives.length}}</em></span>
        </div>
        <div class="rating-switch" @click="toggleContent($event)" :class="{'on':onlyContent}">
            <i class="iconfont icon-iconfontxuanzhong"></i>
            <span class="rating-title">只看内容和评价</span>
        </div>
    </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
    props:{
        ratings:{
            type:Array,
            default(){
                return []
            }
        },
        selectType:{
            type:Number,
            default:ALL
        },
        onlyContent:{
            type:Boolean,
            default:false
        },
        desc:{
            type:Object,
            default(){
                return {
                    all:"全部",
                    positive:"满意",
                    negative:"不满意"
                }
            }
        }
    },
    computed:{
        positives(){
            return this.ratings.filter((rating)=>{
                return rating.rateType === POSITIVE
            })
        },
        negatives(){
            return this.ratings.filter((rating)=>{
                return rating.rateType === NEGATIVE
            })
        }
    },
    methods:{
        select(type,event){
            if(!event._constructed){
                return;
            }
            // this.selectType = type;
            // 子父通信
            this.$emit("ratingtype:select",type)
        },
        toggleContent(event){
           if(!event._constructed){
                return;
            }
            // this.onlyContent = !this.onlyContent;
            // 子父通信
            this.$emit("content:toggle",this.onlyContent)
        }
    }
}
</script>

<style>
.rating-type{
    display: flex;
    padding: 18px 0;
    margin: 0 18px;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
}
.block{
    padding: 8px 10px;
    margin-right: 8px;
    border-radius: 1px;
    color:rgb(77, 85, 93);
    line-height: 16px;
    font-size: 12px;
}
.block em{
    font-size: 8px;
    margin-left: 2px;
    line-height: 16px;
    font-style: normal;
}
.positive{
    /* color: #fff; */
    background: rgba(0, 160, 220, .2);
    }
.negative{
    background: rgba(77, 85, 93, .2);
}
.positive.active{
    color: #fff;
    background: rgb(0, 160, 220);
}
.negative.active{
    color: #fff;
    background: rgb(77, 85, 93);
}
.rating-switch{
    padding: 12px 18px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
    color: rgb(147, 153, 159);
    font-size: 24px;
}
.rating-switch>i{
    margin-right: 4px;
}
.rating-switch.on>i{
    color: #00c850;
}
.rating-title{
    font-size: 12px;
    vertical-align: middle;
}
</style>
