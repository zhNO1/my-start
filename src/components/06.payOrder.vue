<template>
    <div class="pay-order">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderInfo.area}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderInfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                            <dd>{{orderInfo.message}}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <div id="container2">
                                    <!-- <img src="../assets/img/img-174f5006c5197dc2d08dcb8469c9467d.jpg" alt=""> -->
                                    <qrcode :value="'http://47.106.148.205:8899/site/validate/pay/alipay/'+$route.params.orderid" :options="{ size: 200 }"></qrcode>

                                </div>
                            </div>
                                                        <input type="button" value="跳转到支付页" @click="goPayOrder">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//二维码
import VueQrcode from "@xkeshi/vue-qrcode";
export default {
  name: "payOrder",
  data: function() {
    return {
      orderInfo: {},
      interId:0
    };
  },
  created() {
    //调用接口
    this.$axios
      .get(`site/validate/order/getorder/${this.$route.params.orderid}`)
      .then(response => {
        console.log(response);
        this.orderInfo = response.data.message[0];
      });
    // 用定时器的方式 轮询 查询是否支付订单
     this.interId = setInterval(() => {
      //调用接口
      this.$axios
        .get(`site/validate/order/getorder/${this.$route.params.orderid}`)
        .then(response => {
          console.log(response);
         // this.orderInfo = response.data.message[0];
         if(response.data.message[0].status==2){
             //支付成功
             this.$message.success("付款成功,等待发货把");
             //提示用户
             setTimeout(()=>{
              this.$router.push("/paySuccess");
             },500)
              clearInterval(this.interId);
         }else{
             //支付失败
         }
        });
    },1000);
  },
  //注册组建
  components: {
    //   对象的属性名 默认不支持 使用 对象取值的方式来赋值
    // ES6中有这个语法
    [VueQrcode.name]: VueQrcode
  },
    // 方法
  methods: {
    goPayOrder() {
      //   直接跳转到这个页面 进行支付 不是用axios调用接口
      // 直接打开一个新的窗口 完成支付
      window.open(
        "http://47.106.148.205:8899/site/validate/pay/alipay/" +
          this.$route.params.orderid
      );
    }
  },
   // 生命周期函数 销毁
   destroyed() {
       clearInterval(this.interId)
   },
};
</script>
<style>
.pay-order {
  min-height: 750px;
}
#container2 img {
  width: 200px;
}
</style>
