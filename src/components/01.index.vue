<template>
<!-- 商品列表 -->
<div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="itemson in item.subcates" :key="itemson.id">
                                                {{itemson.title}}
                                            </span>
                                            
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="itemson in item.subcates" :key="itemson.id" href="/goods/43.html">{{item.title}}</a>
                                              
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                                
                               
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                             <el-carousel height="341px" indicator-position="outside">
                                <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                    <!-- <h3>{{ index+1 }}</h3> -->
                                    <img :src="item.img_url" alt="">
                                       </el-carousel-item>
                                         </el-carousel>
                                           <!-- <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                               <ul class="slides">
                                    <li class="" style="width: 100%;height:100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;">
                                        <a href="/goods.html">
                                            <img style="width: 100%;height:100%;" src="http://39.108.135.214:8899/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg" draggable="false">
                                        </a>
                                    </li>
                                    <li style="width: 100%;height:100%; float: left; margin-right: -100%; position: relative; opacity: 1; display: block; z-index: 2;" class="flex-active-slide">
                                        <a href="/goods.html">
                                            <img style="width: 100%;height:100%;" src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200314272543.jpg" draggable="false">
                                        </a>
                                    </li>
                                </ul> -->
                                <!-- <ol class="flex-control-nav flex-control-paging">
                                    <li>
                                        <a class="">1</a>
                                    </li>
                                    <li>
                                        <a class="flex-active">2</a>
                                    </li>
                                </ol> 
                            </div>

                        </div>-->

                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time|filtersDate}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="item in goodlist" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a v-for="itemson in item.level2catelist"   :key="itemson.subcateid" href="/goods/43.html">{{itemson.subcatetitle}}</a>
                            <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="itemson in item.datas" :key="itemson.artID">
                        <router-link :to="'/detail/'+itemson.artID">
                            <!-- <a href="#/site/goodsinfo/87" class=""> -->
                                <div class="img-box">
                                    <!-- <img :src="itemson.img_url"> -->
                                      <img  v-lazy="itemson.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{itemson.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{itemson.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{itemson.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{itemson.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            <!-- </a> -->
                            </router-link>
                        </li>
                       
                    </ul>
                </div>
            </div>
        </div>    
    </div>
    </template>
<script>
//导入axios
import axios from "axios";
//导入moment.js
//import moment from "moment";

export default {
  //设置名字
  name: "index",
  data: function() {
    return {
      catelist: [],
      sliderlist: [],
      toplist: [],
      goodlist: []
    };
  },
  //创建完毕之后
  created() {
    //获取网络数据请求
    axios.get("http://47.106.148.205:8899/site/goods/gettopdata/goods")
      .then(response => {
        //  console.log(response);
        this.catelist = response.data.message.catelist;
        this.sliderlist = response.data.message.sliderlist;
        this.toplist = response.data.message.toplist;
      });
    //获取商品分类分组数据
    axios.get("http://47.106.148.205:8899/site/goods/getgoodsgroup")
      .then(response => {
        //console.log(response);
        this.goodlist = response.data.message;
      });
  },
//   //过滤器 将路由抽取
//   filters: {
//     filtersDate(val) {
//       return moment(val).format("YYYY年MM月DD日");
//     }
//   }
};
</script>
<style>
.el-carousel img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>