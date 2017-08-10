<template>
  <div class="loginBox">
      <div class="l">
        <swiper :swiperData="swiperData"></swiper>
      </div>
      <div class="r">
        <div class="login-form">
          <div class="form-horizontal">

            <div class="form-group">
              <label class="col-sm-3 control-label">用户名</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="userLoginAccount">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">密码</label>
              <div class="col-sm-9">
                <input type="password" class="form-control" v-model="userPassword">
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-3 control-label"></label>
              <div class="col-sm-9">
                <input class="form-control" type="hidden" v-model="corpId">
                <img id="corpImg" src="http://img.esocial-cloud.com//d79506e9-5a41-41b2-b6d7-0f042db4884e.jpg" height="100px" width="200px">
                <input class="form-control" type="text" v-model="wechatName">
              </div>
            </div><br><br>
            <div class="form-group">
              <label class="col-sm-3 control-label"></label>
              <div class="col-sm-9 text-center">
                <button type="button" id="loginButton" class="btn btn-info" @click="subBtn">登录</button>
                <label class="forgetBtn"><a id="registeration">注册企业</a>&nbsp;&nbsp;&nbsp;&nbsp;<a>忘记密码</a></label>
              </div>
            </div>

          </div>
        </div>
      </div>
  </div>
</template>
<script>
  import Swiper from './../../components/swiper/Swiper.vue';
  import util from './../../assets/js/util';
  export default {
    name: 'index',
    components: {
      Swiper
    },
    data() {
      return {
        userLoginAccount: '13511024517',
        userPassword: '123456',
        corpId:'wxf46be8b189e7d78f',
        wechatName:'张力阳企业号',
        curNav: 1,
        swiperData: {
          imgs: [
            {picUrl:'./../../static/images/ip_big1.jpg'},
            {picUrl:'./../../static/images/ip_big2.jpg'},
            {picUrl:'./../../static/images/ip_big4.jpg'},
            {picUrl:'./../../static/images/ip_big3.jpg'},
          ]
        },
      }
    },
    mounted() {

    },
    methods: {
      subBtn() {

        var prompt = '';
        if(this.userLoginAccount==''){
        	prompt+='请输入用户名';
        }
        if(this.userPassword==''){
        	prompt+='请输入密码';
        }
        if (prompt != '') {
          alert(prompt);
        } else {
        	var data={
            userLoginAccount: this.userLoginAccount,
            userPassword: this.userPassword,
            corpId:this.corpId,
            wechatName:this.wechatName
          }
          console.log(data);

          util.request({
            method: 'post',
            interface: 'authentication',
            data: data
          }).then((res) => {
        	    console.log(res);
              window.location.href='/index.html';
          });
        }
      }
    }
  }
</script>
