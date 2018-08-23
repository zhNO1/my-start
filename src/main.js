import Vue from 'vue'
import App from './App.vue'
//导入路由
import VueRouter from 'vue-router';
import Index from './components/01.index.vue';

Vue.use(VueRouter);
//定义路由规则
let routes = [
  {
    path: '/',
    //重定向
    redirect: '/index',
  },
  
  {
    path: '/index',
    component: Index,
  }
]
//实例化路由对象
let router=new VueRouter({
   routes
})
Vue.config.productionTip = false
//挂载到路由实例上
new Vue({
  render: h => h(App),
  //路由对象
  router
}).$mount('#app')
