<template>
    <div role="dialog"
         v-bind:class="{
    'modal':true,
    'fade':effect === 'fade',
    'zoom':effect === 'zoom'
    }"
    >
      <div class="modalBox">
        <div v-bind:class="{'modal-dialog':true,'modal-lg':large,'modal-sm':small}" role="document"
             v-bind:style="{width: optionalWidth}">
            <div class="modal-content">
                <slot name="modal-header">
                    <div class="modal-header">
                        <button type="button" class="close" @click="close"><span>&times;</span></button>
                        <h4 class="modal-title">
                            <slot name="title">
                                {{title}}
                            </slot>
                        </h4>
                    </div>
                </slot>
                <slot name="modal-body">
                    <div class="modal-body" v-if="alertBody.type=='html'" v-html="alertBody.html"></div>
                    <div class="modal-body" v-if="alertBody.type=='list'">
                        <piclist @close="close" @upImg="upImg" :alertBody="alertBody" @tplNextPage="tplNextPage"></piclist>
                    </div>
                    <div class="modal-body" v-if="alertBody.type=='vue-html5-editor'">
                        <vue-html5-editor :content="alertBody.html" :height="100"
                                          :show-module-name="false" @change="updateData"
                                          ref="editor"></vue-html5-editor>
                    </div>
                    <div class="modal-body" v-if="alertBody.type=='tplList'">
                        <tpllist @close="close" @getTpl="getTpl"></tpllist>
                    </div>
                    <div class="modal-body" v-if="alertBody.type=='upload'">
                      <up-load :btnTxt="alertBody.btnTxt" @inserImg="inserImg" @showImgList="showImgList"></up-load>
                    </div>
                  <div class="modal-body" v-if="alertBody.type=='preview'">
                    <preview :listData="alertBody.data" :title="alertBody.title" ref="previewModal"></preview>
                  </div>
                </slot>
                <slot name="modal-footer" v-if="!alertBody.isShowBtn">
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="close">{{ cancelText }}</button>
                        <button type="button" class="btn btn-primary" @click="confirm">{{ okText }}</button>
                    </div>
                </slot>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
    import './modal.scss';
    import util from './../../assets/js/util';
    import {coerce, getScrollBarWidth} from './utils/utils.js';
    import $ from './utils/NodeList.js';
    import piclist from './../picList/PicList';
    import tpllist from './../index/TplList.vue';
    import upLoad from './../index/Upload.vue';
    import preview from './../index/Preview.vue';
    export default {
        props: {
        	  isInputChange:{
        	  	type:Boolean,
              default:false
            },
            okText: {
                type: String,
                default: '确定'
            },
            cancelText: {
                type: String,
                default: '取消'
            },
            title: {
                type: String,
                default: ''
            },
            alertBody: {
                type: Object,
                default: ''
            },
            show: {
                required: true,
                type: Boolean,
                coerce: coerce.boolean,
                twoWay: true
            },
            width: {
                default: null
            },
            callback: {
                type: Function,
                default () {
                }
            },
            effect: {
                type: String,
                default: null
            },
            backdrop: {
                type: Boolean,
                coerce: coerce.boolean,
                default: true
            },
            large: {
                type: Boolean,
                coerce: coerce.boolean,
                default: false
            },
            small: {
                type: Boolean,
                coerce: coerce.boolean,
                default: false
            },
          curIndexEdit:{
            	type:Number,
              default:0
          }
        },
        data(){
            return{
                "editorData":''
            }
        },
        components: {
            piclist,
            tpllist,
            upLoad,
          preview
        },
        computed: {
            optionalWidth () {
                if (this.width === null) {
                    return null
                } else if (Number.isInteger(this.width)) {
                    return this.width + 'px'
                }
                return this.width
            }

        },
        mounted() {
            var _self = this;
            this.editorData=this.alertBody.html;
        },

        watch: {
            show (val) {
                const el = this.$el
                const body = document.body
                const scrollBarWidth = getScrollBarWidth()
                if (val) {
                    $(el).find('.modal-content').focus()
                    el.style.display = 'block'
                    setTimeout(() => $(el).addClass('in'), 0)
                    $(body).addClass('modal-open')
                    if (scrollBarWidth !== 0) {
                        body.style.paddingRight = scrollBarWidth + 'px'
                    }
                    if (this.backdrop) {
                        $(el).on('click', e => {
                            if (e.target === el) this.$emit('closAlert', 'isShow');
                        })
                    }
                } else {
                    body.style.paddingRight = null
                    $(body).removeClass('modal-open')
                    $(el).removeClass('in').on('transitionend', () => {
                        $(el).off('click transitionend')
                        el.style.display = 'none'
                    })
                }
            }
        },
        methods: {
            close () {
                this.$emit('closAlert', 'isShow');
            },
            inserImg(e, source){
            	  var _self=this;
                this.$emit('closAlert', 'isShow');
                let img = null;
                let file = e.target.files[0];
                let src = '';
                if (source) {
                    src = source;
                } else {
                    img = document.createElement('img');
                    img.file = file;
                    var reader = new FileReader();
                    reader.onload = (function (aImg) {
                        return function (e) {
                            src = e.target.result;
                        }
                    })(img);
                    reader.readAsDataURL(file);
                }
                //this.$emit('upImg', src);
                util.upFile(e).then(res=>{
                	_self.$emit('upImg',_self.curIndexEdit,res.result.result[0]);
                });
                //_self.upload(fd,oParent);
            },
            upImg(id, src){
                this.confirm({"src":src,"id":id});
            },
            tplNextPage(){
            	  this.$emit('tplNextPage');
            },
            showImgList(){
                this.$emit('showImgList');
            },
            //获取模版数据
            getTpl(tplCode){
              this.$emit('getTemplates',tplCode);
            },
            //确认
            confirm(data){
                switch (this.alertBody.type){
                    case 'vue-html5-editor':
                        this.$emit('upEdit',this.alertBody.type,this.editorData);
                        break;
                    case 'list':
                        this.$emit('upEdit',this.alertBody.type,data);
                        break;
                    case 'html':
                        this.$emit('closAlert', 'isShow');
                  	    this.$emit('confirm');
                  	    break;
                  default :
                        this.$emit('closAlert', 'isShow');
                }
            },
            //更新编辑器数据
            updateData(data){
                this.editorData=data;
            },
            previewModalFn(){
              this.$refs.previewModal.loadData();
            }
        }
    }
</script>
