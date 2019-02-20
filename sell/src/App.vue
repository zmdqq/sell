<template>
  <div id="app">
      <div class="header">
        <!-- 父子通信  -->
        <v-header :seller="seller"></v-header>
      </div>
      <div class="tab">
          <div class="tab-item">
            <router-link to="/goods">商品</router-link>            
          </div>
          <div class="tab-item">
            <router-link to="/ratings">评论</router-link>            
          </div>
          <div class="tab-item">
            <router-link to="/seller">商家</router-link>            
          </div>
      </div>
        <keep-alive>
          <router-view :seller="seller"></router-view>
        </keep-alive>
  </div>
</template>

<script>
import header from "./components/header/header"
export default {
  data() {
    return{
      seller:{
        // id:(()=>{
        //   let queryParam =urlParse();
        //   return queryParam.id;
        // })()
      }
    }
  },
  components: {
    "v-header":header
  },
  created(){
    this.$http.get("http://localhost:3000/api/seller").then(res=>{ 
      this.seller=res.data.seller 
    })
  }
}
</script>

<style>
.tab{
  display:flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  height: 40px;
  line-height: 40px;
  position: relative;
}
.tab:after{
  content:"";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.tab .tab-item{
  flex:1;
}
.tab-item a{
    display:block;
    text-decoration:none;
    font-size: 14px;
    color: rgb(77,85,93);
  }
.tab-item .active{
  color: #f01414;
}
</style>
