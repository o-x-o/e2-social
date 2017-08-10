<template>
  <div class="topbar clearfix">
    <div class="fl userInfo">
      <img :src="iconUrl" class="s_avator" alt="">
      <span class="username">欢迎{{userCnName}}</span>
      <a href="javascript:;" class="mess" @click.stop="selUserTpl"><span class="count">{{taskList.length}}</span></a>
    </div>
    <div class="contrl_container fr"><a href="javascript:;" class="changePwd" @click="showLogin">{{isUserBtnMess?'修改密码':''}}</a><a href="/login.html" class="outIn">{{isLogin?'退出':'登录'}}</a></div>
    <div class="alertBox"  v-if="isTask"  :style="{'height':screenHeight+'px'}">
    <div class="task" :style="{'left':taskScreenX+'px','top':(taskScreenY+10)+'px',width:(screenWidth-taskScreenX)+'px',height:(screenHeight-taskScreenY-45)+'px'}" @click.stop="taskBoxFn">

        <div class="taskBox">
          <div class="lTask">
            <div class="taskBtns"></div>
            <div :class="['item',item.isCheck?'on':'']" v-for="(item,idx) in taskList" @click.stop="catTask(item,idx,$event)">
              <div class="lBox"><img :src="item.taskIcon" alt=""></div>
              <div class="rBox">
                <div class="t">{{item.taskTitle}}</div>
                <div class="timer">{{item.taskBeginTime}}</div>
              </div>
            </div>
          </div>
          <div class="rTask">
            <div class="taskBtns">
              <a href="javascript:;" class="editTaskBtn" @click.stop="closeTpl">关闭</a>
              <a href="javascript:;" :class="['editTaskBtn',taskDetailUrl?'on':'']" @click.stop="openTpl">处理任务</a>
            </div>
            <iframe :src="taskDetailUrl" style="width: 375px; border: 0; height: 100%;"></iframe>
          </div>
        </div>
      </div>



    </div>
  </div>
</template>
<script>
  import './header.scss';
  import util from './../../assets/js/util';
  import interfaces from './../../assets/js/interfaces';
  import modal from './../../components/assembly/Modal';
  export default{
    data(){
    	return{
        userCnName:'',
        iconUrl:'',
        isUserBtnMess:false,
        isLogin:false,
        taskList:[],
        isTask:false,
        taskScreenX:0,
        taskScreenY:0,
        taskDetailUrl:'',
        screenWidth:0,
        oldIndex:0
      }
    },
    mounted(){
      this.loadUserInfo();
      this.loadMess();
      this.screenWidth=document.body.clientWidth;
      this.screenHeight=document.body.clientHeight;

    },
    methods:{
      loadUserInfo(){
        util.request({
          method:'get',
          interface:'getUserInfo',
          data:{}
        }).then(res=>{
          this.userCnName=res.result.result.userCnName;
          this.iconUrl=res.result.result.iconUrl;
          this.isLogin=true;
          this.isUserBtnMess=true;
        });
      },
      loadMess(){
        util.request({
          method:'get',
          interface:'taskList',
          data:{}
        }).then(res=>{
          console.log(res);
          var list=res.result.result;
          this.taskList=list;
          this.taskDetailUrl=list[0].taskDetailUrl;
          this.taskList[this.oldIndex].isCheck=true;
        });
      },
      showLogin(){
      	this.$emit('handleLogin',true);
      },
      selUserTpl(ev){
        this.screenWidth=document.body.clientWidth;
        this.screenHeight=document.body.clientHeight;
        this.taskScreenX=ev.clientX;
        this.taskScreenY=ev.clientY;
        this.isTask=true
        this.loadMess();
      },
      openTpl(){
      	if(this.taskDetailUrl!=''){
          this.taskDetailUrl='';
          this.isTask=false;
          this.$emit('selUserTpl');
        }

      },
      closeTpl(){
        this.isTask=false;
      },
      catTask(item,idx,ev){
      	if(idx!=this.oldIndex){
          this.taskList[this.oldIndex].isCheck=false;
          this.$set(this.taskList,this.oldIndex,this.taskList[this.oldIndex]);
          this.taskDetailUrl=item.taskDetailUrl;
          this.taskList[idx].isCheck=true;
          this.$set(this.taskList,idx,this.taskList[idx]);
          this.oldIndex=idx;
        }
      },
      taskBoxFn(){

      },
      hiddTask(){
        this.isTask=false;
      }
    }
  }
</script>
