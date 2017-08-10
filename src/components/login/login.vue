<template>
  <div class="alertBox" v-if="isLogin">
    <div class="loginBox">
      <div class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">密码</label>
          <div class="col-sm-9">
            <input type="password" class="form-control" v-model="pwd1">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">确认密码</label>
          <div class="col-sm-9">
            <input type="password" class="form-control" v-model="pwd2">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label"></label>
          <div class="col-sm-9 text-center">
            <button type="button" class="btn btn-info" @click="subBtn">确认</button>
          </div>
        </div>
      </div>
      <a href="javascript:;" class="close" @click="closeBtn"></a>
    </div>
  </div>
</template>
<script>
  import './login.scss';
  import util from './../../assets/js/util';
  export default{
  	props:{
  		isLogin:{
  			type:Boolean,
        default:false
      }
    },
    data(){
    	return{
    		pwd1:'',
        pwd2:''
      }
    },
    methods:{
      subBtn(){
      	if(this.pwd1!=''&&this.pwd2!=''){
          util.request({
            method: 'post',
            interface: 'changePassword',
            data: {
              password:this.pwd2
            }
          }).then((res) => {
            this.$emit('handleLogin',false);
          	alert('密码修改成功');
            console.log(res);
          });
        }else{
      		alert('请正确输入密码');
        }
      },
      closeBtn(){
      	//

      	this.$emit('handleLogin',false);
      }
    }
  }
</script>
