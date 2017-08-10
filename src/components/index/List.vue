<template>
  <div class="allBox">
    <div class="header">
      <p class="name">{{showTimer}}</p>
      <span class="icon icon2" @click="picker"></span>
      <span class="icon icon1" @click="selectTpl"></span>
    </div>
    <div class="listBox">
      <div class="ulBox">
        <ul class="list">
          <li v-for="(item,idx) in list">
            <div class="iBox">
              <a :href="item.html5Path?item.html5Path:'javascript:;'">
                <img :src="item.html5PageindexImg" alt="">
              </a>
            </div>
            <div class="cListBox">
              <div class="lBox">
                <h4><a :href="item.html5Path?item.html5Path:'javascript:;'">{{item.html5PageTitle}}</a></h4>
                <p><a :href="item.html5Path?item.html5Path:'javascript:;'">{{item.updateTime}}</a></p>
              </div>
              <div class="rBox">
                <div class="box" v-if="item.state-0!=1"><a href="javascript:;" @click="catTpl(item.html5PageCode,item.id,$event)"><img src="./images/ico-draft.png" alt=""></a></div>
                <div class="box" style="margin-top: 5px;"><a href="javascript:;" @click="del(idx,$event)"><img src="./images/ico-delete.png" alt=""></a></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="nextlist" v-if="!isEnd" @click="nextList">{{nextCon}}</div>
      <div v-if="hasList" class="noData">当前没有文章</div>
    </div>
    <datepicker ref="picker" @setPicker="setPicker" @getTime="getTime"></datepicker>
    <modal :show="isShow" :width="alertBody.ishtml?'':'600px'" :title="alertTitle" :alertBody="alertBody" @closAlert="closAlert" @confirm="confirm" @getTemplates="getTemplates"></modal>
  </div>
</template>
<script>
  import './scss/list.scss';
  import datepicker from './../../components/assembly/Datepicker';
  import util from './../../assets/js/util';
  import interfaces from './../../assets/js/interfaces';
  import modal from './../../components/assembly/Modal';
  export default{
    components: {
      datepicker,
      modal
    },
    data(){
      return {
        isPicker: false,
        pageNumber: 1,
        pageSize: 8,
        list: [],
        nextCon: '加载更多',
        hasList: false,
        isEnd: false,
        curList: 0,
        curEv: null,
        isShow: false,
        alertTitle: '选择上传图片',
        alertBody: {
          html: '<div>您确定要删除吗？</div>',
          type: 'html'
        },
        timer: null,
        showTimer:''
      }
    },
    mounted(){
      this.loadList();
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
        this.timer = data?data:'';
        this.list = [];
        this.pageNumber = 1;
        this.loadList();
      },
      loadList(){
        util.request({
          method: 'get',
          interface: 'html5PageSearch',
          data: {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            data: this.timer ? this.timer : ''
          }
        }).then(res => {
          if (res.result.result.data.length < this.pageSize) {
            this.isEnd = true;
          }
          this.list = this.list.concat(res.result.result.data);
          this.hasList = this.list.length > 0 ? false : true;
          this.showTimer=res.result.result.updateTime;
        })
      },
      nextList(){
        if (!this.isEnd) {
          this.pageNumber++;
          this.loadList();
        }
      },
      //关闭弹出框
      closAlert(key){
        this[key] = false;
      },
      del(idx, ev){
        this.curList = idx;
        this.curEv = 'del';
        this.isShow = true;
        this.alertTitle = '提示';
        this.alertBody = {
          html: '<div class="box">您确定要删除吗？</div>',
          type: 'html'
        };
      },
      confirm(){
        this.isShow = false;
        switch (this.curEv) {
          case 'del':
            util.request({
              method: 'get',
              interface: 'deleteDraftFile',
              data: {
                html5PageCode: this.list[this.curList]['html5PageCode'],
                id: this.list[this.curList]['id']
              }
            }).then(res => {
              this.list.splice(this.curList, 1);
            })
            break;
        }
      },
      selectTpl(){
        this.isShow = true;
        this.alertTitle = '挑选模版';
        this.alertBody = {
          html: '',
          type: 'tplList'
        };
      },
      getTemplates(tplCode){
        this.$emit('getTemplates',tplCode);
      },
      catTpl(code,id,ev){
        this.$emit('catTpl',code,id);
      }
    }
  }
</script>
