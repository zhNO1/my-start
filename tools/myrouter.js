// 导入Vue
import Vue from 'vue';
//导入路由
import VueRouter from 'vue-router';
//导入index.vue
import Index from '../src/components/01.index.vue';
//导入 productdetail.vue
import Detail from '../src/components/02.productdetail.vue';
//导入 shoppingCart.vue
import ShoppingCart from '../src/components/03.shoppingCart.vue';
//导入login
import Login from '../src/components/04.login.vue';
//导入 order
import fillOrder from '../src/components/05.fillOrder.vue';
//导入 payOrder
import payOrder from '../src/components/06.payOrder.vue';
// 导入支付订单组件
import PaySuccess from '../src/components/07.paySuccess.vue';
//导入会员中心
import vipCenter from '../src/components/08.vipCenter.vue';
//导入订单列表
import orderList from '../src/components/09.orderList.vue';
//导入支付订单详情
import orderDetail from '../src/components/10.orderDetail.vue'
//全局导入axiso
import axios from "axios";
//配置全局基地址
axios.defaults.baseURL = 'http://47.106.148.205:8899';
// 跨域请求时 是否会携带 凭证(cookie)
axios.defaults.withCredentials=true;
// 增加到Vue的原型中
Vue.prototype.$axios = axios;
Vue.use(VueRouter);

let routes = [
    {
      path: '/',
      //重定向
      redirect: '/index',
    },
    //定义index
    {
      path: '/index',
      component: Index,
    },
    //定义detail
    {
      path: '/detail/:id',
      component: Detail,
    },
    //定义cart
    {
      path: '/cart',
      component: ShoppingCart,
    },
     //定义login
     {
      path: '/login',
      component: Login,
    },
    //fillOrder
    {
      path: '/order/:ids',
      component: fillOrder,
      // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
      meta: {
        checkLogin: true
      }
    },
    //payOrder
    {
      path: '/payOrder/:orderid',
      component: payOrder,
       // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
       meta: {
        checkLogin: true
      }
    },
     // 订单支付
     {
      path: '/paySuccess/:id',
      component: PaySuccess,
      // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
      meta: {
        checkLogin: true
      }
    },
    //会员中心
    {
      path: '/vipCenter',
      component: vipCenter,
      // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
      meta: {
        checkLogin: true
      }
    },
    //orderList 订单列表
    {
      path: '/orderList',
      component: orderList,
      // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
      meta: {
        checkLogin: true
      }
    },
    //orderDetail 订单支付详情
    {
      path: '/orderDetail/:id',
      component: orderDetail,
      // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
      meta: {
        checkLogin: true
      }
    },
  ]
  //实例化路由对象
  let router = new VueRouter({
    routes
  })
  //增加 导航守卫(路由守卫)
  router.beforeEach((to, from, next) => {
    //console.log('to',to);
    // console.log('from',from);
    // 必须要执行 否则 不会跳转
     // 每次过来都保存一下来时的地址
    // 提交载荷 保存数据
    // store.commit("saveFromPath",from.path)
    //判断是否登录
    //if(to.path.indexOf('/order/')!=-1){
      if(to.meta.checkLogin == true){
      //表示有order/
      //调用接口
      axios.get("site/account/islogin").then(response=>{
        //登录了就继续访问
        if(response.data.code!="nologin"){
          next();
        }else{
          //没有登录打回去登录页
          next('/login');
        }
      })
    }else{
      //不访问订单页直接访问
      next()
    }
  })

  // 暴露出去 把 router暴露出去了
export default router;