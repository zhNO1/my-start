import Vue from 'vue'
import App from './App.vue'
//导入路由
import VueRouter from 'vue-router';
//导入index.vue
import Index from './components/01.index.vue';
//导入 productdetail.vue
import Detail from'./components/02.productdetail.vue';
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
    path:'/detail/:id',
    component: Detail,
  }
]
//实例化路由对象
let router=new VueRouter({
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
  router
}).$mount('#app')
