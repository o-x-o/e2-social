<template>
  <div class="list-group edit-group editBox previewBox">
    <div class="editTitle">{{title}}</div>
    <ul id="preview">
      <li v-for="(item,index) in listData" :data-idx="index">
        <div class="list-group-item" v-if="item.type=='discount'">
          <form-preview :discounts="item.discounts"></form-preview>
        </div>
        <div class="list-group-item" v-else v-html="item.editHtml"></div>
      </li>
    </ul>
  </div>
</template>
<script>
  import formPreview from './formPreview.vue';
  import './scss/preview.scss';
  import jquery from 'jquery';
  export default{
  	props:{
  		title:{
  			type:String,
        default:''
      },
  		listData:{
        type:Array,
        default:[]
      }
    },
    components:{
      formPreview
    },
    mounted(){
    },
    methods:{
      loadData(){
        this.$nextTick(function () {
          jquery('#preview>li').each(function (ev) {
            jquery(this).find('input').each(function (e) {
              var val=jquery(this).attr('data-val');
              jquery(this).replaceWith('<span>'+val+'</span>');
            });
            jquery(this).find('textarea').each(function (e) {
              var val=jquery(this).attr('data-val');
              jquery(this).replaceWith('<p>'+val+'</p>');
            })
          })
        })
      }
    }
  }
</script>
