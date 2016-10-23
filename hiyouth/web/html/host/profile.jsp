      <%@page import="com.alibaba.fastjson.JSONObject"%>
<%@page import="com.alibaba.fastjson.JSON"%>

<%@page import="com.tool.FianlOssData"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.mybatis.entity.Picture"%>
<%@page import="com.mybatis.entity.Hostel"%>
<%@page import="com.tool.GetPicForWeb" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
                 pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <title>店铺详情-嗨柚</title>
    <link rel="stylesheet" type="text/css" href="../../css/share/reset.css"/>
    <link rel="stylesheet" type="text/css" href="../../css/share/ui.css"/>
    <link rel="stylesheet" type="text/css" href="../../css/host/profile.css"/>
</head>

<body>
<!-- header-->
<div class="header">
    <div class="header-content">
        <div class="headerWrapper fix">
            <div class="header-content-logo fl">
                <a href="../index.html"><img src="../../img/header/logo.png" alt="logo"/></a>
            </div>
            <div class="header-content-nav fr">
                <ul>
                    <li><a href="../index.html" >首页</a></li>
          <li><a href="../about-us.html">关于我们</a></li>
          <li><a id="x-place-1">加载中</a></li>
          <li><a id="x-place-2">加载中</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
<!-- /header -->

<div class="container-wrapper">
    <div class="container">
        <div class="box ">
            <div class="box-header ">
                <h1 class="title">店铺详情    <a href="javascript:void(0)" class="btn fr n btn-primary" id="js-new-recruit">发布招聘</a><a href="javascript:void(0)" class="btn fr n h-c-theme" id="history-btn">发布历史</a><a
                        href="javascript:void(0)" class="btn fr n h-c-theme"  id="requests-btn">简历汇总</a><a href="javascript:void(0)" class="btn fr n" id="to-identifi">商家认证</a></h1>
            </div>
            <div class="box-content edit-display">
            <%
              Hostel hostel=(Hostel)session.getAttribute("hostel"); 
            List<Picture> picture=(ArrayList)session.getAttribute("picture"); 
            %>   <a href="javascript:void(0);" id="recruit-edit-btn" class="btn fr btn-primary ">编辑</a>
                <form action="javascript:void(0);" method="post">
                    <table>
                        <colgroup>
                            <col style="width: 105px;"/>
                            <col style="width: auto;"/>
                        </colgroup>
                        <tbody>

                        <tr>
                            <th>店铺名称<span>:</span></th>
                            <td><input type="text" name="hostname" id="hostname" value="<%=hostel.getHname() %>" class="e-s disabled"/></td>
                        </tr>
                        <tr>
                            <th>店铺地区<span>:</span></th>
                            <td><select name="province" id="province" class="e-s disabled"></select>
                                <select name="address" id="city" class="e-s disabled">
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>详细地址<span>:</span></th>
                            <td>
                             <%if(hostel.getHaddress()!=null&&hostel.getHaddress().split("-").length>2){ %>
                            <input type="text" name="" id="location"  placeholder="请填入能在电子地图上定位到的地址" value="<%=hostel.getHaddress().split("-")[2] %>" class="e-s disabled"/></td>
                          <%}else{%>
                          <input type="text" name="" id="location" value=""  placeholder="请填入能在电子地图上定位到的地址" class="e-s disabled"/></td>
                <%} %>
                        </tr>
          <tr>
          <th class="vat">联系方式<span>:</span></th>
          <td>
          <span>
          <img src="../../img/icons/phone.m.png">
          <% String h=hostel.getHphone()==null?"{\"sj\":\"null\",\"sjs\":false,\"wx\":\"null\",\"wxs\":false,\"qq\":\"null\",\"qqs\":false}":hostel.getHphone();
             h=h.equals("")?"{\"sj\":\"null\",\"sjs\":false,\"wx\":\"null\",\"wxs\":false,\"qq\":\"null\",\"qqs\":false}":h;
JSONObject json=JSON.parseObject(h);%>
          <input value="<%=json.get("sj")%>"  class="e-s disabled short" type="text" id="js-r-phone" maxlength="11" placeholder="请输入您的手机号码(选填)" title="手机号码">
          <select id="js-r-phone-s"  class="hide">
        <%if(json.get("sjs")!=null&&json.getBooleanValue("sjs")){ %>
          <option selected="true">公开</option>
          <option>不公开</option>
          <%}else{%>
          <option>公开</option>
          <option  selected="true">不公开</option>
          <%} %>
          </span>
          <span>
          <img src="../../img/icons/weixin.m.png">
          <input value="<%=json.get("wx") %>"   class="e-s disabled short" type="text" id="js-r-weixin" placeholder="请输入您的微信号(选填)" title="微信账号">
          <select id="js-r-weixin-s" class="hide">
          <%if(json.get("wxs")!=null&&json.getBooleanValue("wxs")){ %>
          <option selected="true">公开</option>
          <option>不公开</option>
          <%}else{%>
          <option>公开</option>
          <option  selected="true">不公开</option>
          <%} %>
          </select>
          </span>
          <span>
          <img src="../../img/icons/qq.m.png">
          <input value="<%=json.get("qq") %>"   class="e-s disabled short" type="text"  id="js-r-qq" placeholder="请输入您的QQ号码(选填)" title="QQ号码">
          <select id="js-r-qq-s"  class="hide">
       <%if(json.get("qqs")!=null&&json.getBooleanValue("qqs")){ %>
          <option selected="true">公开</option>
          <option>不公开</option>
          <%}else{%>
          <option>公开</option>
          <option  selected="true">不公开</option>
          <%} %>
          </select>
          </span>
          </td>
          </tr>
                        <tr>
                            <th class="vab">我与我的店<span>:</span></th>
                            <td><textarea id="synopsis" name="synopsis" class="e-s disabled" placeholder="有人的地方就有江湖，凡是江湖必有情仇。远离江湖的小店，满是退隐的高手。店主来袭，讲讲你的江湖故事！说说你的小店风雨。" rows="10" cols="90"><%=hostel.getHsynopsis() %></textarea></td>
                        </tr>
                      <tr>
                      <th class="vab">店铺标签<span>:</span></th>
                      <td class="fix">
                      <ul class="labels fix" id="js-tag-dest">
                          <%if(hostel.getHtag()!=null&&hostel.getHtag().indexOf(";")!=-1){
                                                  String[] sign={"tag-theme", "tag-pink", "tag-yellow", "tag-red", "tag-green"};

                                                for(String tag:hostel.getHtag().split(";")){int index= (int)Math.random()*5; %>
                      <li><a class="t "+<%=sign[index] %>><%=tag %></a><span class="t-del">x</span></li>
                          <%}}%>
                      </ul>

                      <div class="tag-pane">
                      <ul class="labels fix"  id="js-tag-pool">
                      <li><a class="t tag-theme-b">吃货看过来</a><span class="t-del">x</span></li>
                      <li><a class="t tag-theme-b">这家饭很香</a><span class="t-del">x</span></li>
                      <li><a class="t tag-pink-b">get新技能</a><span class="t-del">x</span></li>
                      <li><a class="t tag-pink-b">老板有点帅</a><span class="t-del">x</span></li>
                      <li><a class="t tag-theme-b">老板有点拽</a><span class="t-del">x</span></li>
                      <li><a class="t tag-green-b">猫咪控看过来</a><span class="t-del">x</span></li>
                      <li><a class="t tag-theme-b">一起去减肉</a><span class="t-del">x</span></li>
                      <li><a class="t tag-theme-b">这有歪果仁</a><span class="t-del">x</span></li>
                      <li><a class="t tag-pink-b">疯子看过来</a><span class="t-del">x</span></li>
                      <li><a class="t tag-green-b">喜欢萌妹子</a><span class="t-del">x</span></li>
                      <li><a class="t tag-pink-b">小鲜肉集中营s</a><span class="t-del">x</span></li>
                      </ul>
                      <input type="text" id="new-tag" class="hide" maxlength="10" placeholder="输入自定义标签(回车添加)"><a href="javascript:void(0);"
                      class="btn btn-primary hide" id="new-tag-btn">新增</a>
                      </div>
                      </td>
                      </tr>
                        <tr>
                            <th class="vab">展示图片<span>:</span></th>
                            <td>
                                <p class="text-theme">第一张为封面.其他图片将按照固定位置展示(图片添加后就会自动保存到服务器)</p>
                                <ul class="photo-list fix">
                                    <li>
                                        <%if(picture.size()>0){ %>
                                        <img  src="<%=GetPicForWeb.getPicUrlForOption(picture.get(0).getPicaddress(),60,FianlOssData.getIndexhostelpic())%>" alt="展示图片"><a class="hide" title="点击添加图片"
                                            href="javascript:void(0);">+</a><input
                                            type="file" accept="image/*" hidden   data-number="1" data-pid="<%=picture.get(0).getPicid()%>">
                                           <% }else{%> 
                                                  <img class="vhide" src="" alt="展示图片"><a title="点击添加图片"
                                            href="javascript:void(0);">+</a><input
                                            type="file"accept="image/*" hidden  data-number="1">
                                            <%} %>
                                        <p><span class="fl">重选</span><span class="fr">删除</span></p>
                                    </li>
                                      <li>
                                        <%if(picture.size()>1){ %>
                                        <img  src="<%=GetPicForWeb.getPicUrlForOption(picture.get(1).getPicaddress(),60,FianlOssData.getIndexhostelpic())%>" alt="展示图片"><a class="hide" title="点击添加图片"
                                            href="javascript:void(0);">+</a><input
                                            type="file" accept="image/*" hidden  data-number="2" data-pid="<%=picture.get(1).getPicid()%>">
                                         <% }else{%> 
                                                  <img class="vhide" src="" alt="展示图片"><a title="点击添加图片"
                                            href="javascript:void(0);">+</a><input
                                            type="file" accept="image/*" hidden data-number="2">
                                            <%} %>
                                        <p><span class="fl">重选</span><span class="fr">删除</span></p>
                                    </li>
                                          <li>
                                        <%if(picture.size()>2){ %>
                                        <img src="<%=GetPicForWeb.getPicUrlForOption(picture.get(2).getPicaddress(),60,FianlOssData.getIndexhostelpic())%>" alt="展示图片"><a class="hide" title="点击添加图片"
                                            href="javascript:void(0);">+</a><input
                                            type="file" accept="image/*" hidden  data-number="3" data-pid="<%=picture.get(2).getPicid()%>">
                                         <% }else{%> 
                                                  <img class="vhide" src="" alt="展示图片"><a title="点击添加图片"
                                            href="javascript:void(0);">+</a><input
                                            type="file" accept="image/*" hidden data-number="3">
                                            <%} %>
                                        <p><span class="fl">重选</span><span class="fr">删除</span></p>
                                    </li>
                                          <li>
                                        <%if(picture.size()>3){ %>
                                        <img src="<%=GetPicForWeb.getPicUrlForOption(picture.get(3).getPicaddress(),60,FianlOssData.getIndexhostelpic())%>" alt="展示图片"><a class="hide" title="点击添加图片"
                                            href="javascript:void(0);">+</a><input
                                            type="file" accept="image/*" hidden  data-number="4" data-pid="<%=picture.get(3).getPicid()%>">
                                         <% }else{%> 
                                                  <img class="vhide" src="" alt="展示图片"><a title="点击添加图片"
                                            href="javascript:void(0);">+</a><input
                                            type="file"  accept="image/*" hidden data-number="4">
                                            <%} %>
                                        <p><span class="fl">重选</span><span class="fr">删除</span></p>
                                    </li>
                                       <li>
                                        <%if(picture.size()>4){ %>
                                        <img  src="<%=GetPicForWeb.getPicUrlForOption(picture.get(4).getPicaddress(),60,FianlOssData.getIndexhostelpic())%>" alt="展示图片"><a title="点击添加图片"
                                            href="javascript:void(0);" class="hide">+</a><input
                                            type="file" accept="image/*" hidden  data-number="5" data-pid="<%=picture.get(4).getPicid()%>">
                                      <% }else{%> 
                                                  <img class="vhide" src="" alt="展示图片"><a title="点击添加图片"
                                            href="javascript:void(0);">+</a><input
                                            type="file" accept="image/*" hidden data-number="5">
                                            <%} %>
                                        <p><span class="fl">重选</span><span class="fr">删除</span></p>
                                    </li>
                                    <li>
                                        <%if(picture.size()>5){ %>
                                        <img  src="<%=GetPicForWeb.getPicUrlForOption(picture.get(5).getPicaddress(),60,FianlOssData.getIndexhostelpic())%>" alt="展示图片"><a title="点击添加图片"
                                            href="javascript:void(0);" class="hide">+</a><input
                                            type="file" accept="image/*" hidden  data-number="6" data-pid="<%=picture.get(5).getPicid()%>">
                                      <% }else{%>
                                                  <img class="vhide" src="" alt="展示图片"><a title="点击添加图片"
                                            href="javascript:void(0);">+</a><input
                                            type="file" accept="image/*" hidden data-number="6">
                                            <%} %>
                                        <p><span class="fl">重选</span><span class="fr">删除</span></p>
                                    </li>
                                    <li>
                                        <%if(picture.size()>6){ %>
                                        <img  src="<%=GetPicForWeb.getPicUrlForOption(picture.get(6).getPicaddress(),60,FianlOssData.getIndexhostelpic())%>" alt="展示图片"><a title="点击添加图片"
                                            href="javascript:void(0);" class="hide">+</a><input
                                            type="file" accept="image/*" hidden  data-number="7" data-pid="<%=picture.get(6).getPicid()%>">
                                      <% }else{%>
                                                  <img class="vhide" src="" alt="展示图片"><a title="点击添加图片"
                                            href="javascript:void(0);">+</a><input
                                            type="file" accept="image/*" hidden data-number="7">
                                            <%} %>
                                        <p><span class="fl">重选</span><span class="fr">删除</span></p>
                                    </li> <li>
                                        <%if(picture.size()>7){ %>
                                        <img  src="<%=GetPicForWeb.getPicUrlForOption(picture.get(7).getPicaddress(),60,FianlOssData.getIndexhostelpic())%>" alt="展示图片"><a title="点击添加图片"
                                            href="javascript:void(0);" class="hide">+</a><input
                                            type="file" accept="image/*" hidden  data-number="8" data-pid="<%=picture.get(7).getPicid()%>">
                                      <% }else{%>
                                                  <img class="vhide" src="" alt="展示图片"><a title="点击添加图片"
                                            href="javascript:void(0);">+</a><input
                                            type="file" accept="image/*" hidden data-number="8">
                                            <%} %>
                                        <p><span class="fl">重选</span><span class="fr">删除</span></p>
                                    </li>
                                    <li>
                                        <%if(picture.size()>8){ %>
                                        <img  src="<%=GetPicForWeb.getPicUrlForOption(picture.get(8).getPicaddress(),60,FianlOssData.getIndexhostelpic())%>" alt="展示图片"><a title="点击添加图片"
                                            href="javascript:void(0);" class="hide">+</a><input
                                            type="file" accept="image/*" hidden  data-number="9" data-pid="<%=picture.get(8).getPicid()%>">
                                         <% }else{%>
                                                  <img class="vhide" src="" alt="展示图片"><a title="点击添加图片"
                                            href="javascript:void(0);">+</a><input
                                            type="file" accept="image/*" hidden data-number="9">
                                            <%} %>
                                        <p><span class="fl">重选</span><span class="fr">删除</span></p>
                                    </li>
                                </ul>
                            </td>
                        </tr>

                        </tbody>
                    </table>
          <div class="fix">
             <a href="javascript:void(0)" class="btn fl n btn-primary" id="js-new-recruit2">发布招聘</a>
          </div>
                    <div class="option hide">
                        <p><a href="javascript:void(0);" class="btn btn-warn" id="recruit-plus-btn">保存并新增招聘</a><a href="javascript:void(0);" class="btn btn-primary" id="recruit-save-btn">保存</a><a href="javascript:void(0);" class="btn btn-neg" id="recruit-cancel-btn">取消</a></p>
                    </div>

                </form>


            </div>
        </div>

    </div>
</div>

<!-- toolbor -->
<div class="toolbar">
    <a id="scrollTop" href="javascript:void(0);"></a>
</div>
<!-- /toolbor -->
<!-- footer-->
<div class="footer">
    <div class="footer-content">
        <div class="footerWrapper">
            <div class="footer-content-text ">
                <ul>
                    <li>
                        <h2>快速导航</h2>
                        <p><a href="javascript:void(0);">我是义工</a></p>
                           <p><a href="javascript:void(0);">我是商家</a></p>
                        <p><a href="javascript:void(0);">友情链接</a></p>
                    </li>
                    <li>
                        <h2>帮助中心</h2>
                        <p><a href="javascript:void(0);">常见问题</a></p>
                         <p><a href="../contract.html" target="_blank">用户协议</a></p>
                    </li>
                    <li>
                        <h2>反馈</h2>
                        <p><a href="javascript:void(0);">意见建议</a></p>
                        <p><a href="javascript:void(0);">举报</a></p>
                    </li>
                </ul>
            </div>
            <div class="footer-content-conact">
                <ul>
                    <li class="hide">
                        <img src="../../img/footer/footer1.png" alt="微博图标"/>
                        <p>嗨柚旅行微博</p>
                        <a href="http://weibo.com/hiyouther" title="点击关注我们的微博"><img src="../../img/footer/footer2.png"
                                                                            alt="微博图标"/></a>
                    </li>
                    <li>
                        <img class="erweima" src="../../img/footer/8cmerweima.jpg" alt="微信公众号二维码"/>
                        <p>嗨柚微信公众号</p>
                        <p>hiyouthtour</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <p>Copyright&copy;2015-2016 hiyouther.com All Rights Reserved</p>
        <p><a href="http://www.miitbeian.gov.cn" title="http://www.miitbeian.gov.cn">渝ICP备16003213号-1</a></p>
    </div>
</div>
<!-- /footer -->
<script src="../../js/lib/require.js"></script>
<script type="text/javascript" rel="script">
    require.config({
        baseUrl: "../../js",
        paths: {
            jquery: 'lib/jq',
            domReady: 'lib/require.domready'
        }
    });
    require(['domReady', 'page/host.profile'], function (domReady, profile) {
        <%
        String pram = "";
        if(hostel.getHaddress()!=null&&hostel.getHaddress().split("-").length>1){
            String prov = hostel.getHaddress().split("-")[0];
            String city = hostel.getHaddress().split("-")[1];
            pram = prov+"','"+city;
        }%>
        domReady(function () {
            profile.init('<%=pram %>')
        });
    });
</script>

</body>

</html>