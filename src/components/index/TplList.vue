<template>
  <div class="tpls">
    <div class="tplBox" v-for="(item,idx) in tplList" :data-idx="idx">
      <div class="tplItem" @click="selTpl(item.tplCode,$event)">
        <div class="tplPic">
          <div class="box"><img :src="item.microimg"></div>
          <p>{{item.tplName}}</p></div>
        <p class="tplDesc">{{item.remark}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  import util from './../../assets/js/util';
  export default{
    data(){
      return {
        tplList: []
      }
    },
    mounted(){
      this.getTpl();
    },
    methods: {
      getTpl(){
        util.request({
          method: 'get',
          interface: 'templateList',
          data: {}
        }).then(res => {
          var data = res.result.result;
          this.tplList = data;
        });
      },


      selTpl(tplCode,ev){
        this.$emit('close');
        this.$emit('getTpl', tplCode);
      }
    }
  }
</script>
