    <%@page import="com.mybatis.entity.Boss" %>
            <%@page import="com.tool.FianlOssData" %>
        <%@page import="com.tool.GetPicForWeb" %>
        <%@ page language="java" contentType="text/html; charset=UTF-8"
                 pageEncoding="UTF-8" %>
        <!DOCTYPE html>
        <html>

        <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta charset="UTF-8">
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <title>个人中心-商家</title>
        <link rel="stylesheet" type="text/css" href="../../css/share/reset.css"/>
        <link rel="stylesheet" type="text/css" href="../../css/share/ui.css"/>
        <link rel="stylesheet" type="text/css" href="../../css/host/index.css"/>
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
        <li><a href="../index.html">首页</a></li>
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
            <% Boss boss=(Boss)session.getAttribute("boss");
            String str=null;
            if(boss.getBtouxiang()!=null){if(boss.getBtouxiang().indexOf("http")>=0){
                        str= boss.getBtouxiang();
               }else{
        str= GetPicForWeb.getPicUrlForOption(boss.getBtouxiang(),60,FianlOssData.getHeadpicu());}} %>
        <div class="profile bdr-227">
        <div class="profile-nav  bg-249 fl">
        <div class="portrait-wrapper fix">
        <div class="portrait bdr-227 fl">
        <a href="javascript:void(0);" title="建议上传1X1的头像">
        <img src="<%=str%>" alt="头像"/>
        </a>
        <input type="file" hidden id="portrait" >
        <span id="js-changeImg">修改</span>
        </div>
        </div>
        <h2 id="js-boss-bid" data-bid="<%=boss.getBid()%>"><%=boss.getBusername()%></h2>
        <p class="idcardCi">
            <%if(boss.getBcancel().equals("2")){ %>
        <img src="../../img/icons/idcardCi.png" alt="身份认证通过" title="身份认证通过" />
            <%}else{ %>
        <img src="../../img/icons/idcardCiGray.png" alt="身份认证未通过" title="未身份认证" />
            <%} %>
</p>
        <div class="btn-group">
        <p><a href="messages.html?id=<%=boss.getBid()%>" target="_blank">我的消息</a><span
            class="hide" id="profile-news">12</span></p>
        <p><a href="../identification.html" target="_blank"  id="validating">身份认证</a></p>
        <p><a href="./setting.html" target="_blank">账号设置</a></p>
        </div>
        </div>
        <div class="profile-edit">
        <div class="box-header">
        <h1 class="title">基本资料<a class="btn btn-primary fr" href="javascript:void(0);"
        id="profile-edit-btn">编辑</a></h1>
        </div>
        <div class="box-content edit-display">
            <form id="form-profile">
        <table>
        <colgroup>
        <col style="width: 90px;"/>
        <col style="width: auto;"/>
        </colgroup>
        <tbody>
        <tr>
        <th>昵称<span>:</span></th>
        <td><input type="text" name="" class="e-s disabled" id="nickname-input" value="<%=boss.getBusername()!=null?boss.getBusername():""%>"
        maxlength="30"/></td>
        </tr>
        <tr>
        <th>性别<span>:</span></th>
        <td>
            <% if(boss.getBsex()!=null&&boss.getBsex().equals("woman")){%>
        <input type="radio" name="sex" checked="checked" value="woman" class="woman e-s disabled"/>
            <span class="woman">女</span>
        <input type="radio" name="sex" value="man" class="man e-s hide disabled"/>
            <span class="man hide">男</span>
            <%}else{ %>
        <input type="radio" name="sex" value="woman" class="woman e-s hide disabled"/>
            <span class="woman hide">女</span>
        <input type="radio" name="sex" value="man" checked="checked" class="man e-s disabled"/>
            <span class="man">男</span>
            <%} %>
        </td>
        </tr>
        <tr>
        <th>地区<span>:</span></th>
        <td>
        <select name="province" id="province" class="disabled e-s">
        </select>
        <select name="city" id="city" class="disabled e-s">
        </select>
        </td>
        </tr>
        <tr>
        <th class="vab">个性签名<span>:</span></th>
        <td><textarea id="slogan" rows="10" cols="85" class="disabled e-s" maxlength="200"
        placeholder="随便写点什么让大家认识你吧! (200字以内)"><%=boss.getBsign()!=null?boss.getBsign():"" %></textarea></td>
        </tr>

        </tbody>
        </table>
            </form>
        <p class="fr profile-option hide">
        <a class="btn btn-primary" href="javascript:void(0);"
        id="profile-save-btn">保存</a>
        <a class="btn btn-white" href="javascript:void(0);"
        id="profile-cancel-btn">取消</a>
        </p>
        </div>
        </div>
        </div>

        <div class="box ">
        <div class="box-header ">
        <h1 class="title">我的店铺<a class="fr n btn btn-primary" href="javascript:void(0);"
        id="new-hotel-btn">新增店铺<span
        class="">+</span></a></h1>
        </div>
        <div class="hotel-list bg-249 fix">
        <ul>
            <p class="name">名称</p>
        <p class="location">坐标</p>
        <p class="Ci">商家认证</p>
        <p class="score">评分</p>
        <p class="option fr">操作</p>
        </ul>
        </div>
        <div class="box-content">

        <ul class="card-list " id="cardList">
        <!--//事件委托在ul上面-->

        <%--<li>--%>
        <%--<div class="portrait-70 bdr-227 fl">--%>
        <%--<img src="../../img/banner/bn1.jpg" alt="头像"/>--%>
        <%--</div>--%>
        <%--<p class="name ell " title="这是我店铺的名字">这是我店铺的名字</p>--%>
        <%--<p class="location">云南</p>--%>
        <%--<p class="Ci"><img class="vam" src="../../img/icons/storeCi.png"/></p>--%>
        <%--<p class="score"><img src="../../img/icons/fullStar.png" title="评分" alt="客栈评分"/><img--%>
        <%--src="../../img/icons/fullStar.png" title="评分" alt="客栈评分"/><img--%>
        <%--src="../../img/icons/fullStar.png" title="评分" alt="客栈评分"/></p>--%>
        <%--<div class="option fr">--%>
        <%--<p class="abs-toggle"><a href="javascript:void(0);" class=" btn btn-primary">查看</a></p>--%>
        <%--<ul class="abs-list pabs">--%>
        <%--<li><a href="javascript:void(0);">收到的简历</a></li>--%>
        <%--<li><a href="javascript:void(0);">发布招聘</a></li>--%>
        <%--<li><a href="javascript:void(0);">招聘历史</a></li>--%>
        <%--</ul>--%>
        <%--<p><a href="javascript:void(0);" class="btn btn-neg">删除</a></p>--%>
        <%--</div>--%>
        <%--</li>--%>
        <%--<li>--%>
        <%--<div class="portrait-70 bdr-227 fl">--%>
        <%--<img src="../../img/banner/bn1.jpg" alt="头像"/>--%>
        <%--</div>--%>
        <%--<p class="name ell " title="这是我店铺的名字">有间客栈</p>--%>
        <%--<p class="location">云南</p>--%>
        <%--<p class="Ci"><img class="vam" src="../../img/icons/storeCi.png"/></p>--%>
        <%--<p class="score"><img src="../../img/icons/fullStar.png" title="评分" alt="客栈评分"/><img--%>
        <%--src="../../img/icons/fullStar.png" title="评分" alt="客栈评分"/><img--%>
        <%--src="../../img/icons/fullStar.png" title="评分" alt="客栈评分"/></p>--%>
        <%--<div class="option fr">--%>
        <%--<p class="abs-toggle"><a href="javascript:void(0);" class=" btn btn-primary">查看</a></p>--%>
        <%--<ul class="abs-list pabs">--%>
        <%--<li><a href="javascript:void(0);">收到的简历</a></li>--%>
        <%--<li><a href="javascript:void(0);">发布招聘</a></li>--%>
        <%--<li><a href="javascript:void(0);">招聘历史</a></li>--%>
        <%--</ul>--%>
        <%--<p><a href="javascript:void(0);" class="btn btn-neg">删除</a></p>--%>
        <%--</div>--%>
        <%--</li>--%>
        </ul>

        </div>
        </div>
        <!--
        pagination
        -->
        <div class="pagination-wrapper">
        <ul class="pagination">
        <li><a href="javascript:void(0);" class="pre"></a></li>
        <li><a href="javascript:void(0);">1</a></li>
        <li><a href="javascript:void(0);">2</a></li>
        <li><a href="javascript:void(0);">3</a></li>
        <li><a href="javascript:void(0);">4</a></li>
        <li><a href="javascript:void(0);">5</a></li>
        <li><a href="javascript:void(0);">6</a></li>
        <li><a href="javascript:void(0);">7</a></li>
        <li><a href="javascript:void(0);">8</a></li>
        <li><a href="javascript:void(0);">9</a></li>
        <li><a href="javascript:void(0);">10</a></li>
        <li><a href="javascript:void(0);">11</a></li>
        <li><a href="javascript:void(0);" class="next"></a></li>
        <li>跳转到 ：&nbsp;<input type="text" id="jumpTo"/></li>
        <li><a href="javascript:void(0);" class="go">GO</a></li>
        </ul>
        </div>
        <!--
        .pagination
        -->
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
        <script src="../../util/plupload-2.1.2/js/plupload.full.min.js"></script>
        <script type="text/javascript" rel="script">
        require.config({
        baseUrl: "../../js",
        paths: {
        jquery: 'lib/jq',
        domReady: 'lib/require.domready'
        }
        });
        require(['domReady', 'page/host.index'], function (domReady, index) {
        domReady(function () {
            <%
                    String pram = "";
                    if(boss.getBaddress()!=null&&boss.getBaddress().split("-").length>1){
                        String prov = boss.getBaddress().split("-")[0];
                        String city = boss.getBaddress().split("-")[1];
                        pram = prov+"','"+city;
                    }else {

                    }%>
        index.init('<%=pram %>');
        });
        });
        </script>

        </body>

        </html>
