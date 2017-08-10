/**
 * Created by zhangbin on 2017/7/6.
 */
let wc = window.location;
//const platform =wc.protocol+'//'+wc.host+'/';
const platform ="/esocial/";
export default {
  interfaces:{
    "authentication":platform+"authentication.json",     //登录
    "html5PageSearch":platform+"html5SiteInfo/html5PageSearch.json",      //文章列表接口
    "uploadArticleAreaImage":platform+"siteEdit/uploadArticleAreaImage.json",   //图片上传接口
    "deleteDraftFile":platform+"html5SiteInfo/deleteDraftFile.json",                       //文章删除接口,参数 html5PageCode,id
    "mediaList":platform+"html5SiteInfo/mediaList.json",
    "getUserInfo":platform+"getUserInfo.json",
    "getTemplateBytplCode":platform+"siteTpl/getTemplateBytplCode.json",
    "templateList":platform+"siteTpl/templateList.json",
    "draftArticle":platform+"siteEdit/draftArticle.json",          //保存草草
    "saveArticleArea":platform+"siteEdit/saveArticleArea.json",    //保存块
    "publishArticle":platform+"siteEdit/publishArticle.json",       //发布
    "findArticleByFileCode":platform+"siteEdit/findArticleByFileCode.json",              //回写
    "changePassword":platform+"changePassword.json",         //修改密码
    "taskList":platform+"task/list.json"               //消息
  }
}
