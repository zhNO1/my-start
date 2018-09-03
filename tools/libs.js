// 导入Vue
import Vue from 'vue';

// 导入 elementui 按需导入
// import ElementUI from 'element-ui';
import {
    Carousel,
    CarouselItem,
    InputNumber,
    Switch,
    Button,
    Form,
    FormItem,
    Input,
    Radio,
    Pagination,
    Loading 

  }from 'element-ui'
  import 'element-ui/lib/theme-chalk/index.css';
  Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(InputNumber)
Vue.use(Switch)
Vue.use(Button)
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Radio);
Vue.use(Pagination);
Vue.use(Loading);


// 导入iView
// import iView from 'iview';
// import Message from 'iview/src/components/message';
import {
    Affix,
    Page,
    BackTop,
    Message,
    Notice,
    Modal,
    Icon
  } from 'iview';
  
  import 'iview/dist/styles/iview.css';
  
Vue.component('Affix',Affix);
Vue.component('Page',Page);
Vue.component('BackTop',BackTop);
Vue.component('Modal',Modal);
Vue.component('Icon',Icon);

// 挂载到Vue的原型上
Vue.prototype.$Message = Message;
Vue.prototype.$Notice = Notice;

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
  loading: require('../src/assets/img/img-174f5006c5197dc2d08dcb8469c9467d.jpg'),
  attempt: 1
})