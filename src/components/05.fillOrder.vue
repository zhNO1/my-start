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
                                <li class="active">
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
                    <div class="cart-box">
                        <!-- status-icon显示状态图片 -->
                        <el-form status-icon :model="orderForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <h2 class="slide-tit">
                                <span>1、收货地址</span>
                            </h2>
                            <div id="orderForm" name="orderForm" url="">
                                <div class="form-box address-info">
                                    <el-form-item label="收货人名称" prop="accept_name">
                                        <el-input v-model="orderForm.accept_name" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属地区" prop="">
                                        <v-distpicker @selected="selected" :province="orderForm.area.province.value" :city="orderForm.area.city.value" :area="orderForm.area.area.value"></v-distpicker>
                                    </el-form-item>
                                    <el-form-item label="所属地区" prop="address">
                                        <el-input v-model="orderForm.address" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码" prop="mobile">
                                        <el-input v-model="orderForm.mobile" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电话号码" prop="phone">
                                        <el-input v-model="orderForm.phone" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱" prop="email">
                                        <el-input v-model="orderForm.email" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮编" prop="post_code">
                                        <el-input v-model="orderForm.post_code" style="width:500px"></el-input>
                                    </el-form-item>
                                </div>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <!-- 单选框 -->
                                        <el-radio v-model="orderForm.payment_id" label="6">在线支付</el-radio>
                                        <span style="color:#666">手续费:0.00元</span>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <!-- 单选框 -->
                                        <el-radio @change="expressChange(20)" v-model="orderForm.express_id" label="1">顺丰快递(20元)</el-radio>
                                        <el-radio @change="expressChange(10)" v-model="orderForm.express_id" label="2">圆通快递(10元)</el-radio>
                                        <el-radio @change="expressChange(8)" v-model="orderForm.express_id" label="3">韵达快递(8元)</el-radio>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="item in message" :key="item.id">
                                            <td width="68">
                                                <router-link to="'/detail/'+item.id">
                                                    <img :src="item.img_url" class="img">
                                                </router-link>
                                            </td>
                                            <td>
                                                <router-link :to="'/detail/'+item.id">{{item.title}} </router-link>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.totalamount}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <el-form-item label="订单备注(100字符以内)" prop="message">
                                                <el-input type="textarea" resize="none" :row="2" v-model="orderForm.message" style="width:500px"></el-input>
                                            </el-form-item>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{orderForm.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{orderForm.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{orderForm.goodsAmount+orderForm.expressMoment}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <router-link to="/cart">返回购物车</router-link>
                                            <!-- <a class="btn button" href="/cart.html">返回购物车</a> -->
                                            <a id="btnSubmit" class="btn submit" @click="sureOrder">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
//导入 省市联动
import VDistpicker from "v-distpicker";
export default {
  name: "order",
  //注册组件
  components: { VDistpicker },
  data: function() {
    //验证手机号
    var checkMoblie = (rule, value, callback) => {
      setTimeout(() => {
        //定义个验证手机的正则
        let exec = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (exec.test(value)) {
          //验证正确
          callback();
        } else {
          //验证错误
          callback(new Error("你的手机号不对"));
        }
      }, 1000);
    };
    //验证邮箱
    var checkEmail = (rule, value, callback) => {
      if (value.trim().length != 0) {
        setTimeout(() => {
          //定义个验证手机的正则
          let exec = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
          if (exec.test(value)) {
            //验证正确
            callback();
          } else {
            //验证错误
            callback(new Error("你的邮箱不对"));
          }
        }, 1000);
      } else {
        callback();
      }
    };
    //验证邮编
    var checkPostcode = (rule, value, callback) => {
      if (value.trim().length != 0) {
        setTimeout(() => {
          //定义个验证手机的正则
          let exec = /^[1-9]\d{5}(?!\d)$/;
          if (exec.test(value)) {
            //验证正确
            callback();
          } else {
            //验证错误
            callback(new Error("你的邮编不对"));
          }
        }, 1000);
      } else {
        callback();
      }
    };
    return {
      orderForm: {
        goodsAmount: 0, // 总金额
        expressMoment: 20, // 快递费
         address: "中粮商务公园18楼天台", // 详细地址
        mobile: "18888881234", // 手机号
        email: "tangSir@qq.com", // 邮箱
        post_code: "518300", // 邮编,
        accept_name: "小仙女", //收货人姓名
        phone: "1008611", //电话
        area: {
          province: { code: "320000", value: "江苏省" },
          city: { code: "321100", value: "镇江市" },
          area: { code: "321102", value: "京口区" }
        }, //省市区
        payment_id: "6", // 支付方式
        express_id: "1", // 快递
        message: "快点发货呀``````", //
        goodsids: "", //购买的商品id,
        cargoodsobj: {} // 购买的商品 id 跟件数的关系
      },
      // 服务器返回的商品数据
      message: [],
      rules: {
        accept_name: [
          { required: true, message: "请输入收货人名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 20个字符", trigger: "change" }
        ],
        address: [
          { required: true, message: "请输入收货地址", trigger: "blur" }
        ],
        mobile: [{ required: true, validator: checkMoblie, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }],
        post_code: [{ validator: checkPostcode, trigger: "blur" }]
      }
    };
  },
  methods: {
    selected(value) {
      //  console.log(value);
      this.orderForm.area = value;
    },
    //价格改变
    expressChange(price) {
      this.orderForm.expressMoment = price;
    },
    //提交订单
    sureOrder(){
        //调用接口
        this.$axios.post("site/validate/order/setorder",this.orderForm).then(response=>{
     console.log(response);
       //获取订单id
        let orderid=response.data.message.orderid;
                //带着订单id去支付页
        this.$router.push("/payOrder/"+orderid);
        //删除购物车中提交的数据
         this.message.forEach(v=>{
             this.$store.commit("deleteGoods",v.id)
         })
})
        
    }
  },
  //计算属性
  computed: {
    //总数量
    totalCount() {
      let totalCount = 0;
      this.message.forEach(v => {
        totalCount += v.buycount;
      });
      return totalCount;
    }
  },
  //一创建就去获取
  created() {
    //保存goodsids
    this.orderForm.goodsids = this.$route.params.ids;
    this.$axios
      .get(`site/validate/order/getgoodslist/${this.$route.params.ids}`)
      .then(response => {
        console.log(response);
        //准备个商品对象
        let cargoodsobj = {};
        //计算总数
        let total = 0;
        //拼接数据
        response.data.message.forEach(v => {
          //修改数量
          v.buycount = this.$store.state.cartDate[v.id];
          //修改总净额
          v.totalamount = v.buycount * v.sell_price;
          //累加总净额
          total += v.totalamount;
          //增加键值对
          cargoodsobj[v.id] = v.buycount;
        });
        // 赋值数据
        this.message = response.data.message;
        // 赋值到数据中
        this.orderForm.goodsAmount = total;
        //添加orderForm中即可
        this.orderForm.cargoodsobj = cargoodsobj;
      });
  },
  beforeCreate() {
    this.$axios.get("/site/account/islogin").then(response => {
      console.log(response);
      //   如果没有登陆 打回 登录页
      if (response.data.code == "nologin") {
        // 编程式导航
        this.$router.push("/login");
      }
    });
  }
};
</script>
<style>
</style>

