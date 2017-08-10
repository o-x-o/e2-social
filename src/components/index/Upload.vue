<template>
  <div class="ctrl_box clearfix uploader_confirm">
      <div class="uploader_btn conf" data-type="1">
        {{btnTxt}}<input type="file" class="uploadFile" @change="inserImg">
      </div>
      <div class="choose_btn conf" data-type="2" @click="showImgList">从素材库选取</div>
  </div>
</template>
<script>
  export default{
    props: {
      btnTxt: {
        type: String,
        default: ''
      }
    },
    methods:{
    	inserImg(ev){
    		this.$emit('inserImg',ev);
      },
      showImgList(){
    		this.$emit('showImgList');
      }
    }
  }
</script>
