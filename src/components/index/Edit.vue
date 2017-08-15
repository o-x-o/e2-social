<template>
  <div class="box editBoxBody">
    <div class="box editBoxBody">
      <div class="box col-lg-6 col-md-6 col-sm-6 flexBox">
        <div class="header">
          <p class="name">文章编辑</p>
          <span class="icon icon5" @click="saveManuscript"></span>
          <span class="icon icon4" @click="release"></span>
          <span class="icon icon3" @click="preview"></span>
          <span :class="['icon','icon6',isDragging?'on':'']" @click="switchDragging"></span>
        </div>
        <div class="editTitle">

          <textarea rows="2" placeholder="请输入标题，最长标题不能超过26个字" v-model="html5PageTitle"></textarea>
          <input type="hidden" v-model="id" />
          <input type="hidden" v-model="html5PageCode" />

        </div>

        <div class="editTime"><input type="text" placeholder="请输入日期" @click="picker" v-model="html5PageTimer"></div>
        <datepicker ref="picker" @setPicker="setPicker" @getTime="getTime"></datepicker>


        <div class="flexItem">
          <div :class="['editBox','list-group','edit-group',isDragging?'dragging':''] ">
            <ul id="A" v-model="list2">
              <li v-for="(element,index) in list2" class="liIndex" :data-idx="index" @click="clickLi(index,$event)">
                <div class="myEdit">
                  <a href="javascript:;" v-if="isDragging" class="close" @click="delModl(index,$event)"></a></div>

                <div class="list-group-item" v-if="element.type=='editor'"
                     style="padding-bottom: 5px;">
                  <vue-html5-editor :content="element.editHtml" :height="100"
                                    :show-module-name="showModuleName"
                                    ref="editor" :data-idx="index" @change="updateData"></vue-html5-editor>
                </div>
                <div class="list-group-item" v-else-if="element.type=='discount'">
                  <form-discounts @upEdit="upEdit" ref="formDiscounts"></form-discounts>
                </div>
                <div class="list-group-item" v-else v-html="element.editHtml"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="box col-lg-6 col-md-6 col-sm-6 flexBox">
        <div class="header">
          <p class="name">文章模版</p>
          <!--<span class="icon icon7" @click="selectTpl"></span>-->
        </div>
        <div class="flexItem">
          <div class="list-group">
            <ul id="B">
              <li v-for="(element,index) in list" @click="clickLiTpl(index,$event)">
                <div class="list-group-item" v-html="element.html"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <modal :show="isShow" :width="alertBody.width?alertBody.width:'600px'" :title="alertTitle" :alertBody="alertBody"
           @closAlert="closAlert" @showImgList="showImgList" @upEdit="upEdit" @tplNextPage="tplNextPage"
           @getTemplates="getTemplates" @upImg="upImg" :curIndexEdit="curIndexEdit" :isInputChange="true" ref="modal"></modal>
  </div>
</template>
<script>
  import './scss/edit.scss';
  import './scss/template.scss';
  import util from './../../assets/js/util';
  import strap from 'vue-strap';
  import jquery from 'jquery';
  import formDiscounts from './../../components/index/FormDiscounts';
  import modal from './../../components/assembly/Modal';
  import datepicker from './../../components/assembly/Datepicker';


  export default{
    name: 'app',
    components: {
      datepicker,
      formDiscounts,
      modal
    },
    data (){
      return {
        id:'',
        html5PageCode: '',
        isPicker: false,
        html5PageTitle: '',
        html5PageTimer: '',
        list: [],
        list2: [],
        listData: [],
        editable: true,
        isDragging: false,
        delayedDragging: false,
        curIndexEdit: null,
        isShow: false,
        alertTitle: '选择上传图片',
        alertBody: {
          html: '',
          type: 'html'
        },
        content: "",
        showModuleName: false,
        tplSize: 12,
        tplNumber: 1,
        discount: {},
        tplCode: '',
        curEv: null
      }
    },
    mounted(){
      var _self = this;
      this.getTemplates('tpl_003');
      var A = document.getElementById('A');
      var B = document.getElementById('B');
      Sortable.create(A, {
        animation: 100,
        handle: '.myEdit',
        group: {name: "a", pull: false, put: ['b']},
        filter: '.filter',
        sort: true,
        onAdd: function (/**Event*/evt) {
          var itemEl = evt.item;
          A.removeChild(itemEl);
          _self.list2.splice(evt.newIndex, 0, {});
          var row = _self.list[evt.oldIndex];
          _self.$set(_self.list2, evt.newIndex, {
            "code": row.code,
            "name": row.name,
            "order": row.order,
            "html": row.html,
            "editHtml": row.editHtml,
            "fixed": row.fixed,
            "type": row.type,
            "areaType":row.areaType
          });

          for(var i=0,m=_self.list2.length;i<m;i++){
            var row2=_self.list2[i];
            if(row2.areaType=='head'){
              _self.list2.splice(i, 1);
              _self.list2.splice(0, 0, row2);
            }
          }
        }
      });
      Sortable.create(B, {
        group: {name: "b", pull: 'clone',},
        sort: false
      });
    },
    methods: {

      picker(ev){
        if (this.isPicker) {
          this.$refs.picker.cloasPick(ev);
        } else {
          this.$refs.picker.picker(ev);
        }
        this.isPicker = !this.isPicker;
      },
      //隐藏时间
      setPicker(){
        this.isPicker = false;
      },
      //获取时间
      getTime(data){
        this.html5PageTimer = data?data:'';
      },

      switchDragging(){
        this.isDragging = !this.isDragging;
      },
      clickLi(idx, ev){
        this.curIndexEdit = idx;
        this.curEv = ev;
        switch (ev.target.dataset.operation) {
          case 'uploader':
            this.isShow = true;
            this.alertBody = {
              html: '',
              btnTxt: '本地图片',
              type: 'upload'
            };
            break;
          case 'proLink':
            this.isShow = true;
            this.alertTitle = '输入外链地址';
            this.alertBody = {
              html: '<div class="box"><input type="text" class="form-control"></div>',
              type: 'html'
            };
            break;
          case 'uploader-video':
            this.isShow = true;
            this.alertBody = {
              html: '',
              btnTxt: '本地视频',
              type: 'upload'
            };
            break;
        }
      },
      //编辑确定后修改数据
      upEdit(type, data){
        var _self = this;
        this.closAlert('isShow');
        switch (type) {
          case 'list':
            if(_self.list2[_self.curIndexEdit].areaType=='head'){
              _self.thumbnail=data.src;
            }
            _self.list2[_self.curIndexEdit].editHtml = '<div class="uploader"><img src="' + data.src + '" data-operation="uploader"></div>';
            break;
          case 'discount':
            this.discount = data;
            break;
        }
      },
      //点击模版-》添加模版
      clickLiTpl(index, ev){
        switch (ev.target.dataset.operation) {
          case 'addTpl':
            this.list2.push(this.list[index]);
            break;
        }
      },
      tplNextPage(){
        this.tplNumber++;
        this.showImgList();
      },
      //关闭弹出框
      closAlert(key){
        this[key] = false;
      },
      //显示模板列表
      showImgList(){
        util.request({
          method: 'get',
          interface: 'mediaList',
          data: {
            pageSize: this.tplSize,
            pageNumber: this.tplNumber
          }
        }).then((res) => {
          this.alertBody = {
            type: 'list',
            list: this.tplNumber > 1 ? this.alertBody.list.concat(res.result.result) : res.result.result
          }
        });
      },
      //选择模版
      selectTpl(){
        this.isShow = true;
        this.alertTitle = '挑选模版';
        this.alertBody = {
          html: '',
          type: 'tplList'
        };
      },
      delModl(index, ev){
        this.list2.splice(index, 1);
      },
      updateData(data, ev){
        this.list2[this.curIndexEdit].editHtml = data;
      },
      //获取、更新模板
      getTemplates(tplCode){
        var _self = this;
        this.tplCode = tplCode;
        util.request({
          method: 'get',
          interface: 'getTemplateBytplCode',
          data: {
            tplCode: tplCode
          }
        }).then(res => {
          var tplList = res.result.result.areaList;
          var temp = [];
          for (var i = 0, m = tplList.length; i < m; i++) {
            var row = tplList[i];


            if (row.areaType == 'head') {
              var newRow = {
                "code": row.areaCode,
                "name": row.areaName,
                "order": i,
                "html": row.areaTxt,
                "editHtml": row.areaDefault,
                "fixed": false,
                "type": row.remark,
                "areaType": row.areaType
              };
              this.html5PageTitle = '';
              this.list2 = [newRow];

            } else {

              var newRow2 = {
                "code": row.areaCode,
                "name": row.areaName,
                "order": i,
                "html": row.areaTxt,
                "editHtml": row.areaDefault,
                "fixed": false,
                "type": row.remark,
                "areaType": row.areaType
              };
              newRow2.areaType = 'content';
              temp.push(newRow2);

            }
          }
          console.log(temp);
          this.list = temp;

        });
      },
      //上传图片返回地址
      upImg(curIndex, img){
        this.closAlert('isShow');
        this.curEv.target.src = img;
        this.list2[curIndex].editHtml = jquery(this.curEv.target).parents('div.list-group-item').html();
        if(this.list2[curIndex].areaType=='head'){
          this.thumbnail=img;
        }
      },
      //保存稿件
      saveManuscript(){
        return new Promise((resolve, reject) => {
          var _self = this;
          jquery('#A').find('li.liIndex').each(function () {
            var index=jquery(this).index();
            _self.list2[index].vals={};
            jquery(this).find('input').each(function (e) {
              var idx=jquery(this).index();
              //var index = jquery(this).parents('li.liIndex').attr('data-idx');
              var val = jquery(this).val();
              _self.list2[index].vals['val'+idx]=val;
              jquery(this).attr('data-val', val);
              jquery(this).attr('value', val);
              _self.list2[index].editHtml = jquery(this).parents('li.liIndex div.list-group-item').html();
            });
            jquery(this).find('textarea').each(function (ev) {
              if (jquery(this).attr('data-type') != 'noEach') {
                var idx=jquery(this).index();
                //var index = jquery(this).parents('li.liIndex').attr('data-idx');
                var val = jquery(this).val();
                _self.list2[index].vals['val'+idx]=val;
                jquery(this).attr('data-val', val);
                jquery(this).attr('value', val);
                _self.list2[index].editHtml = jquery(this).parents('li.liIndex div.list-group-item').html();
              }
            });
          })


          console.log(this.html5PageTitle);

          util.request({
            method: 'post',
            interface: 'draftArticle',
            data: {
              id: this.id,
              html5PageTitle: this.html5PageTitle,
              htnl5TemplateCode: this.tplCode,
              html5PageindexImg: this.thumbnail,
              html5PageCode: this.html5PageCode

            }
          }).then(res => {
            var html5PageCode = res.result.result.html5PageCode;
            var html5Appid=res.result.result.html5Appid;
            var id=res.result.result.id;

            var temp = 0;
            var len = this.list2.length;
            console.log(this.list2);
            for (var i = 0; i < len; i++) {
              var row = this.list2[i];
              if (row.type == 'discount') {
                var discountsCur = this.$refs.formDiscounts[0].discountsCur;
                var discounts = this.$refs.formDiscounts[0].discounts[discountsCur];
                _self.list2[i].discounts=discounts;
                !function (rowData, index) {
                  util.request({
                    method: 'post',
                    interface: 'saveArticleArea',
                    data: {
                      id:id,
                      fileCode: html5PageCode,
                      sequence: index,
                      areaCode: rowData.code,
                      areaFrom: JSON.stringify(discounts)
                    }
                  }).then(res => {
                    temp++;
                    if (temp == len) {
                      _self.$emit('getList');
                      _self.isShow = true;
                      _self.alertBody = {
                        html: '<div>保存成功</div>',
                        btnTxt: '',
                        type: 'html'
                      };
                      resolve({
                        status:0,
                        result:{html5PageCode:html5PageCode,html5Appid:html5Appid}
                      });
                    }
                  })
                }(row, i);
              } else {
                !function (rowData, index) {
                  util.request({
                    method: 'post',
                    interface: 'saveArticleArea',
                    data: {
                      id:id,
                      fileCode: html5PageCode,
                      sequence: index,
                      areaCode: rowData.code,
                      areaTxt: JSON.stringify(rowData)
                    }
                  }).then(res => {
                    temp++;
                    if (temp == len) {
                      _self.$emit('getList');
                      _self.isShow = true;
                      _self.alertBody = {
                        html: '<div>保存成功</div>',
                        btnTxt: '',
                        type: 'html'
                      };
                      resolve({
                        status:0,
                        result:{html5PageCode:html5PageCode,html5Appid:html5Appid}
                      });
                    }
                  })
                }(row, i);

              }

            }


          });
        });

      },
      release(){
        this.saveManuscript().then(res=>{
          util.request({
            method: 'post',
            interface: 'publishArticle',
            data: {
              id:res.result.id,
              html5PageCode: res.result.html5PageCode,
              html5Appid: res.result.html5Appid
            }
          }).then(res => {
            console.log(res);
          })
        });
          window.location.reload();

      },
      preview(){
      	var _self=this;
        jquery('#A').find('li.liIndex').each(function () {
          var index=jquery(this).index();
          jquery(this).find('input').each(function (e) {
            var idx=jquery(this).index();
            //var index = jquery(this).parents('li.liIndex').attr('data-idx');
            var val = jquery(this).val();
            jquery(this).attr('data-val', val);
            jquery(this).attr('value', val);
            _self.list2[index].editHtml = jquery(this).parents('li.liIndex div.list-group-item').html();
          });
          jquery(this).find('textarea').each(function (ev) {
            if (jquery(this).attr('data-type') != 'noEach') {
              var idx=jquery(this).index();
              //var index = jquery(this).parents('li.liIndex').attr('data-idx');
              var val = jquery(this).val();
              jquery(this).attr('data-val', val);
              jquery(this).attr('value', val);
              _self.list2[index].editHtml = jquery(this).parents('li.liIndex div.list-group-item').html();
            }
          });
        })
      	for(var i=0,m=this.list2.length;i<m;i++){
      		var row=this.list2[i];
          if (row.type == 'discount') {
            var discountsCur = this.$refs.formDiscounts[0].discountsCur;
            var discounts = this.$refs.formDiscounts[0].discounts[discountsCur];
            this.list2[i].discounts = discounts;
          }
        }


        this.alertBody = {
        	width:'377px',
          isShowBtn:true,
          html: '',
          data:this.list2,
          title:this.html5PageTitle,
          type: 'preview'
        };
        this.isShow = true;
        this.alertTitle='预览';
        this.$refs.modal.previewModalFn();
      },
      catTpl(code,id){
        util.request({
          method: 'get',
          interface: 'findArticleByFileCode',
          data: {
            fileCode:code,
            id:id
          }
        }).then(res => {
            this.html5PageTitle=res.result.result.html5PageTitle;
            this.id = res.result.result.id;
            this.html5PageCode = res.result.result.html5PageCode;
          var temp=[];
          for(var i=0,m=res.result.result.fileAreaList.length;i<m;i++){
              var row=res.result.result.fileAreaList[i];
              temp.push(JSON.parse(row.areaTxt));
          }
          this.list2=temp;
        })
      }
    },
    computed: {
      listString(){
        return JSON.stringify(this.list, null, 2);
      },
      list2String(){
        return JSON.stringify(this.list2, null, 2);
      }
    },
    watch: {
      isDragging (newValue) {
        if (newValue) {
          this.delayedDragging = true
          return
        }
        this.$nextTick(() => {
          this.delayedDragging = false
        })
      }
    }
  }
</script>
