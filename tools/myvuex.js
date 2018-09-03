// 导入Vue
import  Vue from 'vue';
//导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//创建一个store仓库
const store = new Vuex.Store({
  state: {
    // count: 998
    cartDate:JSON.parse(window.localStorage.getItem('goodkey'))|| {},
     isLogin:false,
     //来时的地址
     fromPath:''
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
        },
        //增加一个改变更累状态的方法
        changeLoginStatus(state,isLogin){
           state.isLogin=isLogin
        },
        //增加一个保存来时地址的方法
        saveFromPath(state,fromPath){
           state.fromPath=fromPath;
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

// 暴露store出去
export default store;