<template>
  <div class="template-container formInput">
    <div class="form-group">
      <label>劵类型</label>
      <div class="iBox">
        {{discounts.name}}
      </div>
    </div>
    <div class="form-group" v-for="(item,idx) in discounts.inputs" v-if="item.value">
      <label>{{item.label}}</label>
      <div class="iBox" v-if="item.type=='inputText'">
        {{item.value}}
      </div>
    </div>
  </div>
</template>
<script>
  export default{
  	props:{
      discounts:{
      	type:Object,
        default:{}
      }
    },
    mounted(){

    }
  }
</script>
