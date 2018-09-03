import Vue from 'vue'
import App from './App.vue'
// 导入 自己封装的 路由
import router from '../tools/myrouter';
// 导入 第三方插件 因为没有暴露
// 直接引入 不是用变量接收 等同于 吧那份代码 拷贝 复制 到这个位置
import '../tools/libs';
// 导入 仓库
import store from '../tools/myvuex';



//写全局过滤器
//导入moment.js
import moment from 'moment';
Vue.filter('filtersDate', function (val,formatstr) {
  //有值
  if(formatstr!=undefined){
    return moment(val).format(formatstr);
  }else{
    return moment(val).format("YYYY年MM月DD日");
  }
})


Vue.config.productionTip = false
  //挂载到路由实例上
  new Vue({
    render: h => h(App),
    //路由对象
    router,
    //store仓库对象
    store,
      // 最高级别的Vue组件(最外层的那个盒子(祖爷爷))
     beforeCreate(){
      this.$axios.get("/site/account/islogin").then(response=>{
         //       console.log(response);
         if(response.data.code=="logined"){
          // 登陆成功了
           store.state.isLogin=true;         
         }
       })
     }
  }).$mount('#app')