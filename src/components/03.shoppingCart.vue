<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-if="message.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <router-link to="/index">马上去购物</router-link>吧！
                                                    <!-- <a href="/index.html">马上去购物</a>吧！ -->
                                                    </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <!-- 商品列表 -->
                                <tr v-for="item in message" :key="item.id">
                                    <td>
                                        <!-- 开关 -->
                                        <el-switch v-model="item.selected" active-color="#13ce66" inactive-color="#ff4949">
                                        </el-switch>
                                    </td>
                                    <td>
                                        <img style="width:65px" :src="item.img_url" alt="">
                                    </td>
                                    <td> {{item.title}}</td>
                                    <td>{{item.sell_price}}</td>
                                    <td>
                                        <!-- 数量 -->
                                        <!-- 直接min='0' 解析的是 字符串 -->
                                        <!-- 如果 要保留 原始的形参 ,额外的增加一个自定义的实参
                                            $event 保留事件参数
                                                传送门
                                            在后面增加自定义的参数
                                         -->
                                        <el-input-number size="mini" :min='0' v-model="item.buycount" @change="changeNum($event,item.id)"></el-input-number>
                                    </td>
                                    <td>{{item.buycount*item.sell_price}}</td>
                                    <td>
                                        <!-- 按钮 -->
                                        <el-button type="danger"  @click="delone(item.id)" icon="el-icon-delete" circle></el-button>

                                    </td>
                                </tr>

                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{totalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
  name: "shoppingCart",
  data: function() {
    return {
      message: []
    };
  },
  created() {
    //准备数据 id1,id2,id3
    // console.log(this.$store.state.cartDate);
    let cartDate = this.$store.state.cartDate;
    //定义一个变量拼接数据
    let ids = "";
    for (const key in cartDate) {
      ids += key;
      ids += ",";
    }
    //截取最后一个逗号
    ids = ids.slice(0, -1);
   // console.log(ids);
    //用axios 获取接口
    this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(response => {
     // console.log(response);
      //我们自行拼接个数
      response.data.message.forEach(v => {
        // 获取 Vuex中的 id对应的值
        v.buycount = cartDate[v.id];
        v.selected = true;
      });
      this.message = response.data.message;
    });
  },
  //计算属性
  computed:{
       // 总金额
totalPrice(){
  let totalPrice=0;
   //被选中的价格累加
   this.message.forEach(v=>{
       if(v.selected){
           //累加
           totalPrice+=v.sell_price*v.buycount;
       }
   })
   return totalPrice;
},
 //总个数
 totalCount(){
  let totalCount=0;
   //被选中的价格累加
   this.message.forEach(v=>{
       if(v.selected){
           //累加
           totalCount+=parseInt(v.buycount);
       }
   })
   return totalCount;
 }
  },
  //方法
  methods: {
    changeNum(num, id) {
     // console.log(num, id);
      //调用仓库的方法 (提交载荷)
      this.$store.commit("updateGoodsNum", {
        goodId: id,
        goodNum: num
      });
    },
    //删除数据
    delone(id){
       //     console.log(id);
      // 提交载荷 这里是删除 Vuex中的
      this.$store.commit("deleteGoods",id)
      this.message.forEach((v,index)=>{
          if(v.id==id){
              this.message.splice(index,1);
          }
      })
    }
  }
};
</script>
<style>
</style>
