<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <ProductZoomer v-if="images.normal_size.length!=0" :base-images="images" :base-zoomer-options="zoomerOptions">
                                </ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <!-- 计数器 -->
                                                <el-input-number v-model="buyCount" @change="buyCountChange" :min="0" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                                <!-- <div class="el-input-number el-input-number--small">
                                                    <span role="button" class="el-input-number__decrease is-disabled">
                                                        <i class="el-icon-minus"></i>
                                                    </span>
                                                    <span role="button" class="el-input-number__increase">
                                                        <i class="el-icon-plus"></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                        
                                                        <input autocomplete="off" size="small" type="text" rows="2" max="60" min="1" validateevent="true" class="el-input__inner" role="spinbutton" aria-valuemax="60" aria-valuemin="1" aria-valuenow="1" aria-disabled="false">
                                                        
                                                    </div>
                                                </div> -->
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" @click="showDiscuss=false" :class="{selected:showDiscuss==false}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" @click="showDiscuss=true" :class="{selected:showDiscuss==true}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>

                            <div class="tab-content entry" v-show="showDiscuss==false" v-html="goodsinfo.content">

                            </div>
                            <div class="tab-content" v-show="showDiscuss==true">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" v-model.trim="commentContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" @click="submitComment" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="messageList.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in messageList" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time |filtersDate}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>

                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <Page :total="totalCount" show-elevator show-sizer placement="top" :page-size-opts="[5, 6,10, 13, 26]" @on-change="pageChange" @on-page-size-change="pageSizeChange" />

                                            <!-- <span class="disabled">« 上一页</span>
                                            <span class="current">1</span>
                                            <span class="disabled">下一页 »</span> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                            <!-- </a> -->
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/90" class="">{{item.title}}</a>
                                            <span>{{item.add_time | filtersDate}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 返回顶部 -->
        <BackTop :height="100" :bottom="200">
            <div class="top">返回顶端</div>
        </BackTop>
        <!-- 移动的小图片 -->
        <img v-if="imglist.length!=0" class="moveImg" :src="imglist[0].original_path" alt="">
    </div>
</template>
<script>
//导入jq
import $ from "jquery";
export default {
  name: "detail",
  data: function() {
    return {
      productId: undefined,
      goodsinfo: {}, //商品
      hotgoodslist: [], //商品列表
      imglist: [], //图片信息
      buyCount: 0, //购买数量
      showDiscuss: false, // 是否显示评论 默认为false  默认显示 商品内容,
      messageList: [],
      pageIndex: 1, //评论页数
      pageSize: 10, //一页显示五条
      totalCount: 0, //总条数
      commentContent: "", //发表评论内容
      // 放大镜设置
      zoomerOptions: {
        zoomFactor: 5, // 放大倍数
        pane: "container-round", // container-round 小放大镜
        hoverDelay: 300,
        namespace: "zoomer",
        move_by_click: true, // true 点击切换
        scroll_items: 7,
        choosed_thumb_border_color: "yellowgreen" // 框的颜色
      },
      // 这里的数据 需要在接口调用完毕之后 才能够获取
      images: {
        normal_size: []
      }
    };
  },
  methods: {
    buyCountChange() {
      console.log("变啦");
    },
    //获取商品详情的方法
    getProductDetail() {
      //保存id;
      this.productId = parseInt(this.$route.params.id);
      //获取数据
      this.$axios
        .get(`site/goods/getgoodsinfo/${this.productId}`)
        .then(response => {
          // console.log(response);
          // 保存起来
          this.goodsinfo = response.data.message.goodsinfo;
          this.hotgoodslist = response.data.message.hotgoodslist;
          this.imglist = response.data.message.imglist;

          // 处理 放大镜数据
          let temArr = [];
          // 循环处理数据
          this.imglist.forEach((v, i) => {
            temArr.push({
              id: v.id,
              url: v.original_path
            });
          });
          // 临时数组
          this.images.normal_size = temArr;
        });
    },
    //评论的方法
    getComments() {
      this.$axios
        .get(
          `site/comment/getbypage/goods/${this.productId}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(response => {
          //  console.log(response);
          this.messageList = response.data.message;
          this.totalCount = response.data.totalcount;
        });
    },
    //提交评论
    submitComment() {
      // 判断是否为空
      if (this.commentContent == "") {
        // this.$Message.error('对方不想跟你说话,并且想你抛出一顿BUG');
        this.$Message.error({
          content: "对方不想理你,并且想你抛出了世界上最好的语言",
          closable: true
        });
        return;
      }
      // 发表评论
      this.$axios
        .post(`site/validate/comment/post/goods/${this.productId}`, {
          commenttxt: this.commentContent
        })
        .then(response => {
          //   // console.log(response)
          // 成功了
          // 提示用户
          this.$Message.success("评论发表成功!!");
          // 重新获取数据 看到了第三页
          //清空评论内容
          this.commentContent = "";
          // 去第一页
          this.pageIndex = 1;
          this.getComments();
        });
    },
    // 页码改变 会给我页码
    pageChange(page) {
      this.pageIndex = page;
      // 页码改变时 重新获取数据即可
      this.getComments();
    },
    // 会给我页容量
    pageSizeChange(size) {
      this.pageSize = size;
      // 如果就是第一页 重新获取数据
      if (this.pageIndex == 1) {
        this.getComments();
      }
    },
    //使用jq加入购物车
    cartAdd() {
      //获取购物车位置
      let cartOffset = $(".add").offset();
      //console.log(cartOffset);
      //获取购物车的位置
      let targetOffset = $(".icon-cart").offset();
      //console.log(targetOffset);
      //移动到指定位置并且显示
      $(".moveImg")
        .show()
        .addClass("move")
        .css(cartOffset)
        .animate(targetOffset,1000, () => {
          $(".moveImg")
            .removeClass("move")
            .hide();
        });
    }
  },

  //创建之后
  created() {
    //获取详情数据
    this.getProductDetail();
    //重新获取评论数据
    this.getComments();
  },
  //监听
  watch: {
    $route(val, oldVal) {
      // 数组长度为0 直接销毁
      this.images.normal_size = [];
      //重新调用接口 获取数据 渲染页面
      this.getProductDetail();
      //   重新获取评论数据
    }
  }
};
</script>
<style lang="less">
/* iview的回到顶部 */
.top {
  padding: 10px;
  background: rgba(147, 211, 243, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
/* 设置 内容区域 图片样式 */
.tab-content img {
  width: 100%;
  /* 去除图片底部的 间隙 */
  display: block;
}
/* 放大镜 */
.pic-box {
  width: 395px;
  .control-box .thumb-list {
    display: flex;
    justify-content: center;
    img {
      width: 80px;
      height: 80px;
      margin: 2px;
    }
  }
  .control {
    //   text-align:center;
    display: flex;
    // 主轴
    justify-content: center;
    // 纵轴 副轴 侧轴
    align-items: center;
  }
}
// 移动图片的样式
.moveImg {
  position: absolute;
  width: 50px;
  display: none;
  //  top:0;
  // left:0;
}
.moveImg.move {
     transform: scale(.5,.5) rotateZ(3600deg);
    opacity: .4;
    transition: transform 1s,opacity  1s;
}
</style>

