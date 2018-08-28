import Vue from 'vue'
import App from './App.vue'
//导入路由
import VueRouter from 'vue-router';
//导入index.vue
import Index from './components/01.index.vue';
//导入 productdetail.vue
import Detail from './components/02.productdetail.vue';
//导入 shoppingCart.vue
import ShoppingCart from './components/03.shoppingCart.vue';
//全局导入axiso
import axios from "axios";
//配置全局基地址
axios.defaults.baseURL = 'http://47.106.148.205:8899';
// 增加到Vue的原型中
Vue.prototype.$axios = axios;
// 引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';
//导入放大镜
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer);
//导入lazy
import VueLazyload from 'vue-lazyload';
//注册到vue上
Vue.use(VueLazyload, {
  preLoad: 1.3,
  //error: 'dist/error.png',
  //loading: './assets/img/img-174f5006c5197dc2d08dcb8469c9467d.jpg',
  loading: require('./assets/img/img-174f5006c5197dc2d08dcb8469c9467d.jpg'),
  attempt: 1
})
//使用中间件
Vue.use(iView);
Vue.use(ElementUI);
Vue.use(VueRouter);
//导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//创建一个store仓库
const store = new Vuex.Store({
  state: {
    // count: 998
    cartDate:JSON.parse(window.localStorage.getItem('goodkey'))|| {}
  },
  mutations: {

    // increment (state,n) {
    //   state.count+=n
    // }
    // 增加购物车数据获取到 id 以及数量
    // 传入的数据是一个对象 格式{goodId:商品id,goodNum:数量}
    addGoods(state, goodInfo) {
      // 保存数据[]只有用中括号对象取值 才可以 传入变量 用.语法是固定的属性名
      if (state.cartDate[goodInfo.goodId] == undefined) {
        //传过来的id 不存在 新增这个id作为属性
        //直接增加这个属性即可
        // state.cartDate[goodInfo.goodId] =goodInfo.goodNum;
        // 为了要让Vue检测到数据的改变同步修改页面显示 需要调用Vue.set方法
        Vue.set(state.cartDate, goodInfo.goodId, goodInfo.goodNum);
      } else {
        // 传过来的id 已经存在 累加
        state.cartDate[goodInfo.goodId] += goodInfo.goodNum;
      }
    },
    //额外的增加一个修改的方法
    // 逻辑是 直接把传入的 数量 替换掉 默认的数量
    // 格式约定 格式{goodId:商品id,goodNum:数量}
    updateGoodsNum(state,goodInfo) {
      //直接替换即可
      state.cartDate[goodInfo.goodId]=goodInfo.goodNum;
    },
    deleteGoods(state,goodId){
       // delete 删除对象中的属性
      // delete state.cartDate[goodId];
      // delete 删除的属性不会触发视图更新
      // 需要调用Vue.delete方法才可以
      Vue.delete(state.cartDate,goodId);
        }
  },
  // getters vuex的计算属性
  getters: {
    goodsCount: state => {
      // 临时num
      let num = 0;
      for (const key in state.cartDate) {
        // console.log(key);
        num += state.cartDate[key];
      }
      // 累加总数
      // 返回总数
      return num;
    }
  }
})
//关闭浏览器或刷新是保存到本地存储
window.onbeforeunload=function(){
  window.localStorage.setItem('goodkey',JSON.stringify(store.state.cartDate));
}
//定义路由规则
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
]
//实例化路由对象
let router = new VueRouter({
  routes
})

//写全局过滤器
//导入moment.js
import moment from 'moment';
Vue.filter('filtersDate', function (val) {
  return moment(val).format("YYYY年MM月DD日");
})


Vue.config.productionTip = false
//挂载到路由实例上
new Vue({
  render: h => h(App),
  //路由对象
  router,
  //store仓库对象
  store
}).$mount('#app')
