<template>
    <div>
  <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input id="txtUserName" v-model.trim="username" name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                        </div>
                        <div class="input-box">
                            <input id="txtPassword" v-model="password" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input id="btnSubmit" name="btnSubmit" @click="login" type="submit" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>


</div>
</template>
<script>
export default {
    name:"login",
    data:function(){
        return{
        username:'',
        password:'',
        }
    },
    methods:{
      login(){
            // 设置进度条的颜色 尺寸
      this.$Loading.config({
        color: "yellow",
        failedColor: "hotpink",
        height: 10
      });
      // 显示进度条
      this.$Loading.start();
          //请求数据
          this.$axios.post("site/account/login",{
              user_name:this.username,
              password:this.password
          }).then(response=>{
              console.log(response);
              if(response.data.status==0){
                  //提交载荷
                  this.$store.commit("changeLoginStatus",true)
                // 跳转回你来时的页面
                this.$router.push(this.$store.state.fromPath)
              }
               //   关闭进度条
            this.$Loading.finish();
          }).catch(response=>{
              this.$Loading.error();
          })
      }

    }
}
</script>
<style>

</style>
