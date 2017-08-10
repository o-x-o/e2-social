<template>
    <div class="body" @click.stop="clickBody">
        <header-box @handleLogin="handleLogin" @selUserTpl="selUserTpl" ref="headFn"></header-box>
        <div class="box editBoxBody">
            <div class="list col-lg-4 col-md-4 col-sm-4 editBoxBody">
                <list @getTemplates="getTemplates" @catTpl="catTpl"  ref="listFn"></list>
            </div>
            <div class="edit col-lg-8 col-md-8 col-sm-8 editBoxBody">
                <edit ref="editFn" @getList="getList"></edit>
            </div>
        </div>
        <footer-box></footer-box>
      <loginBox :isLogin="isLogin" @handleLogin="handleLogin"></loginBox>
    </div>
</template>
<script>
    import headerBox from './../../components/header/Header';
    import list from './../../components/index/List';
    import edit from './../../components/index/Edit';
    import footerBox from './../../components/footer/Footer';
    import loginBox from './../../components/login/login.vue';
    import './scss/index.scss';
    export default {
        name: 'index',
        components: {
            headerBox,
            list,
            edit,
            footerBox,
          loginBox
        },
        data() {
            return {
              tplCode:'',
              isLogin:false
            }
        },
        mounted() {

        },
        methods: {
          getTemplates(tplCode){
              alert(tplCode);
              console.log("this tplcode is "+tplCode);
          	this.$refs.editFn.getTemplates(tplCode);
          },
          getList(){
            this.$refs.listFn.getTime();
          },
          catTpl(code,id){
          	this.$refs.editFn.catTpl(code,id);
          },
          handleLogin(bool){
          	this.isLogin=bool;
          },
          selUserTpl(){
            this.$refs.listFn.selectTpl();
          },
          clickBody(ev){
          	this.$refs.headFn.hiddTask();
          }
        }
    }
</script>
