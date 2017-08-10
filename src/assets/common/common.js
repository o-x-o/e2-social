/**
 * Created by zhangbin on 2017/7/6.
 */
import './common.scss';
export default {
  /**
   * loading效果
   * */
  loading:()=>{
    let oLoading = document.getElementById('loadingAdd');
    if(!oLoading){
      let oDiv = document.createElement('div');
      document.body.appendChild(oDiv);
      oDiv.innerHTML='<span></span>';
      oDiv.id='loadingAdd';
    }
  },
  removeLoading:()=>{
    let oDiv = document.getElementById('loadingAdd');
    if(oDiv){
      document.body.removeChild(oDiv);
    }
  },
  /**
   * 弹出框（确定，取消）
   * 使用：common.showModal({
   *     title:'提示',
   *     content:'哈哈',
   *     showCancel:true,
   *     success:function () {
   *       console.log(1111)
   *     }
   *   })
   * */
  showModal:(options)=>{
    let oShowModal = document.getElementById('showModal');
    if(!oShowModal){
      let oDiv = document.createElement('div');
      document.body.appendChild(oDiv);
      oDiv.id='showModal';
      let title='<h3>'+(options.title?options.title:'')+'</h3>';
      let content='<p>'+(options.content?options.content:'')+'</p>';
      let btns='<div class="btns"><a href="javascript:;" class="succ">确定</a>'+(options.showCancel?'<a href="javascript:;" class="cancel">取消</a>':'')+'</div>';
      oDiv.innerHTML='<div class="cBox">'+title+content+btns+'</div>';
      oDiv.addEventListener('touchend',(ev)=>{
        if(ev.target.className=='succ'){
          options.success&&options.success();
          this.a.hideModal();
        }else if(ev.target.className=='cancel'){
          this.a.hideModal();        //a:是默认的
        }
      },false)
    }
  },
  hideModal:()=>{
    let oShowModal = document.getElementById('showModal');
    if(oShowModal){
      document.body.removeChild(oShowModal);
    }
  }
}
