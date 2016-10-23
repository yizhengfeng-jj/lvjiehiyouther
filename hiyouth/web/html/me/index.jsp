    <%@page import="com.mybatis.entity.Memberpicture"%>
<%@page import="com.tool.GetPicForWeb" %>
            <%@page import="com.tool.FianlOssData" %>
        <%@page import="com.mybatis.entity.Member" %>
        <%@page import="com.mybatis.entity.Recruit" %>
        <%@ page language="java" contentType="text/html; charset=UTF-8"
                 pageEncoding="UTF-8" %>
        <!DOCTYPE html>
        <html>

        <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta charset="UTF-8">
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>个人中心</title>
        <link rel="stylesheet" type="text/css" href="../../css/share/reset.css" />
        <!-- <link rel="stylesheet" type="text/css" href="../../css/share/animate.css" /> -->
        <link rel="stylesheet" type="text/css" href="../../css/share/ui.css" />
        <link rel="stylesheet" type="text/css" href="../../css/me/index.css" />
        </head>

        <body>
        <!-- header-->
        <div class="header">
        <div class="header-content">
        <div class="headerWrapper fix">
        <div class="header-content-logo fl">
        <a href="../index.html"><img src="../../img/header/logo.png" alt="logo" /></a>
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
            <% Member member=(Member)session.getAttribute("member"); 
              Memberpicture memberpicture=(Memberpicture)session.getAttribute("Memberpicture"); 
            String str=null;
            if(member.getMtouxiang()!=null){if(member.getMtouxiang().indexOf("http")>=0){
                        str= member.getMtouxiang();
               }else{
        str= GetPicForWeb.getPicUrlForOption(member.getMtouxiang(),60,FianlOssData.getHeadpicu());}}%>
        <div class="container">
        <div class="profile fix">
        <div class="profile-nav bg-249 fl">
        <div class="portrait-wrapper fix">
        <div class="portrait bdr-227 fl ">
        <img src="<%=str %>" alt="用户头像" />
        <input type="file" hidden id="portrait">
        <span title="点击修改头像" id="js-changeImg">修改</span>
        </div>
        </div>

        <h2 id="nickname-h2"><%=member.getMemname() %></h2>
        <p class="idcardCi">
            <%if(member.getMcancel().equals("2")){ %>
        <img src="../../img/icons/idcardCi.png" alt="身份认证通过" title="身份认证通过" />
            <%}else{ %>
        <img src="../../img/icons/idcardCiGray.png"  alt="身份认证未通过" title="未身份认证" />
            <%} %>
</p>
        <div class="btn-group">
        <p><a href="messages.html?id=<%=member.getMid() %>" target="_blank" title="单击前往我的消息">我的消息</a><span
        class="hide" id="profile-news">12</span></p>
        <p><a href="favorite.html" target="_blank" title="单击前往我的收藏">我的收藏</a><span class="hide">25</span></p>
        <p><a href="../identification.html" id="validating">身份认证</a></p>
        <p><a href="./setting.html" target="_blank">账号设置</a></p>
        </div>
        </div>
        <div class="profile-edit bdr-227 bg-white">
        <div class="box-header">
        <h1 class="title">基本资料<a class="btn btn-primary fr " href="javascript:void(0);"
        id="profile-edit-btn">编辑</a></h1>
        </div>
        <div class="edit-display fix">

        <form id="form-profile">
        <table>

        <colgroup>
        <col style="width: 90px;" />
        <col style="width: auto;" />
        </colgroup>
        <tbody>
        <tr>
        <th>昵称<span>:</span></th>
        <td>
        <input type="text" name="" id="nickname-input" maxlength="24"
        value="<%=member.getMemname()!=null?member.getMemname():"" %>" class="e-s
        disabled" />
        </td>
        </tr>
        <tr>
        <th>性别<span>:</span></th>
        <td>
            <% if(member.getMsex()!=null&&member.getMsex().equals("woman")){%>
        <input type="radio" name="sex" checked="checked" value="woman" class="woman e-s disabled"/>
            <span class="woman">女</span>
        <input type="radio" name="sex" value="man" class="man hide e-s disabled"/>
            <span class="man hide">男</span>
            <%}else{ %>
        <input type="radio" name="sex" value="woman" class="woman hide e-s disabled"/>
            <span class="woman hide">女</span>
        <input type="radio" name="sex" value="man" checked="checked" class="man e-s disabled"/>
            <span class="man">男</span>
            <%} %>
        </td>
        </tr>
        <tr>
        <th>地区<span>:</span></th>
        <td>
        <select name="province" id="province" class="e-s disabled">

        </select>
        <select name="city" id="city" class="e-s disabled">

        </select>
        </td>
        </tr>

        <tr>
        <th class="vtab">个性签名<span>:</span></th>
        <td>
            <p id="show-slogan-p"><%=member.getMcredit()!=null?member.getMcredit():"" %></p>
        <textarea name="slogan" rows="10" cols="85" maxlength="200" id="js-sign-p" placeholder="随便写点什么让大家认识你吧!(200字以内)"
        class="e-s disabled hide"><%=member.getMcredit()!=null?member.getMcredit():"" %></textarea>
        </td>
        </tr>
        <tr>
        <th class="vtab">个人标签<span>:</span></th>
        <td>
        <ul class="labels fix" id="js-tag-dest">
            <%if(member.getMsign()!=null&&member.getMsign().split(";").length>0&&member.getMsign().indexOf(";")!=-1){
                String[] sign={"tag-theme", "tag-pink", "tag-yellow", "tag-red", "tag-green"};
            	for(String tag:member.getMsign().split(";")){
            		int index= (int)(Math.random()*5);
                   %>
                <li><a class="t <%=sign[index] %>"><%=tag %></a><span class="t-del">x</span></li>
            <%}}else{ %>

            <% }%>
        </ul>

            <div class="tag-pane">
                    <ul class="labels fix"  id="js-tag-pool">
                            <li><a class="t tag-theme-b">无敌小厨娘</a><span class="t-del">x</span></li>
                            <li><a class="t tag-theme-b">宠物小管家</a><span class="t-del">x</span></li>
                            <li><a class="t tag-pink-b">劳动我在行</a><span class="t-del">x</span></li>
                            <li><a class="t tag-pink-b">吃货萌妹纸</a><span class="t-del">x</span></li>
                            <li><a class="t tag-theme-b">无敌小鲜肉</a><span class="t-del">x</span></li>
                            <li><a class="t tag-green-b">读书小达人</a><span class="t-del">x</span></li>
                            <li><a class="t tag-theme-b">绘画小能手</a><span class="t-del">x</span></li>
                            <li><a class="t tag-theme-b">推广小喇叭</a><span class="t-del">x</span></li>
                            <li><a class="t tag-pink-b">麻雀小话唠</a><span class="t-del">x</span></li>
                            <li><a class="t tag-green-b">处女座晚期</a><span class="t-del">x</span></li>
                    </ul>
            <input type="text" id="new-tag" class="hide" maxlength="10" placeholder="输入自定义标签(回车添加)"><a href="javascript:void(0);"
            class="btn btn-primary hide" id="new-tag-btn">新增</a>
            </div>

        </td>
        </tr>
        </tbody>
        </table>
        </form>
        <p class="fr profile-option hide">
        <a class="btn btn-primary" href="javascript:void(0);" id="profile-save-btn">保存</a>
        <a class="btn btn-white" href="javascript:void(0);" id="profile-cancel-btn">取消</a>
        </p>
        </div>
        <!--绑定还没有做好-->
        <div class="binding hide">
        <div class="box-header">
        <h1 class="title">账号绑定</h1>
        </div>
        <div class="edit-display">
        <table>
        <colgroup>
        <col style="width: 90px;" />
        <col style="width: auto;" />
        </colgroup>
        <tbody>
        <tr>
        <th>手机号码<span>:</span></th>
        <td>
        <input type="text" name="" id="phone-bind" maxlength="24" value="12345678901" class="disabled" />
        <span class="btn text-theme" title="请在账号设置里修改">已绑定</span>
        </td>
        </tr>
        <!--/未绑定前 a标签上加上对应的类 手机是bi-phone 邮箱是bi-email -->
        <!--<input type="text" name="" id="email-bind" maxlength="24" value="" class="disabled" /> -->
        <!--<a class="btn btn-primary fr bi-email" href="javascript:void(0);">我要绑定</a> -->

        <!--绑定后 将a标签替换为span 别忘了title属性 将值渲染到value里面 -->
        <!--<input type="text" name="" id="phone-bind" maxlength="24" value="12345678901" class="disabled" />-->
        <!--<span class="btn text-theme" title="请在账号设置里修改">已绑定</span> -->
        <tr>
        <th>邮箱账号<span>:</span></th>
        <td>
        <input type="text" name="" id="email-bind" maxlength="24" value="" class="disabled" />
        <a class="btn btn-primary bi-email" href="javascript:void(0);">我要绑定</a>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </div>
        </div>
        </div>

        <div class="resume box">
        <div class="box-header ">
        <h1 class="title">我的简历
            <%if(member.getMcontact()==null&&member.getMrealname()==null&&member.getMresume()==null){ %>
        <a href="javascript:void(0);" id="resume-edit-btn"
        class="fr btn btn-primary ">新建简历</a></h1>
        </div>
        <div class="box-content">
        <!--如果是新建简历 上方的'编辑'改为'新建简历' 下方的edit-display添加hide属性 会在edit里面判断字符是否为'新建简历'来取消hide-class-->

        <div class="edit-display hide">
            <%}else{ %>
        <a href="javascript:void(0);" id="resume-edit-btn"
        class="fr btn btn-primary ">编辑简历</a></h1>
        </div>
        <div class="box-content">
        <!--如果是新建简历 上方的'编辑'改为'新建简历' 下方的edit-display添加hide属性 会在edit里面判断字符是否为'新建简历'来取消hide-class-->

        <div class="edit-display">
            <%} %>
        <form id="form-resume">
        <table>
        <colgroup>
        <col style="width: 90px;" />
        <col style="width: auto;" />
        </colgroup>
        <tbody>

  <% if(memberpicture.getMpaddress()!=null){ %>
            <div class="display">
   <%}else{%>
<div class="display vhide">
   <%}%>
                    <img src="<%=GetPicForWeb.getPicUrl(memberpicture.getMpaddress(), 60)  %>" id="img-face"/><span id="js-change-pic">修改</span>
            </div>
  <% if(memberpicture.getMpaddress()!=null){ %>
            <a href="javascript:void(0);" class="hide" title="点击上传图片" id="js-upload" data-pid="<%=memberpicture.getMpid()%>">+ 上传照片</a>
   <%}else{%>
 <a href="javascript:void(0);" title="点击上传图片" id="js-upload" data-pid="<%=memberpicture.getMpid()%>">上传一张个人照片</a>
   <%}%>
               
                <input type="file" accept="image/*" name="file" hidden id="p-photo-life">

        <tr>
        <th>真实姓名<span>:</span></th>
        <td>
        <input type="text" name="realname" id="realname"
        value="<%=member.getMrealname()!=null?member.getMrealname():"" %>" class="e-s disabled" />
        <i class="error">*请填写真实姓名!</i>
        </td>
        </tr>
            <tr>
            <th>出生日期<span>:</span></th>
            <td id="age-td">
            </td>
            </tr>
        <tr>
        <th class="vat">联系方式<span>:</span></th>
        <td>
        <p class="show-contact"></p>
        <input type="text" name="contact" id="contact" value="<%=member.getMcontact()!=null?member.getMcontact():"" %>"
        placeholder="例如:'我的微信:xxx','手机123*'"
        class="e-s disabled hide" />
            <span><img src="../../img/icons/phone.m.png">
<%String contact=member.getMcontact();%>
<%if(contact!=null&&contact.indexOf("##sj##")<contact.indexOf("##/sj##")){%>
<input value="<%=contact.substring(contact.indexOf("##sj##")+6,contact.indexOf("##/sj##"))%>"  class="e-s disabled short" type="text" id="js-r-phone" maxlength="11" placeholder="请输入您的手机号码(必填)" title="手机号码">
<%}else{%>
<input value=""  class="e-s disabled short" type="text" id="js-r-phone" maxlength="11" placeholder="请输入您的手机号码(必填)" title="手机号码">
<%}%>
</span>
            <span><img src="../../img/icons/weixin.m.png">
<%if(contact!=null&&contact.indexOf("##wx##")<contact.indexOf("##/wx##")){%>
<input  value="<%=contact.substring(contact.indexOf("##wx##")+6,contact.indexOf("##/wx##"))%>" class="e-s disabled short" type="text" id="js-r-weixin" placeholder="请输入您的微信号(选填)" title="微信账号">
<%}else{%>
<input class="e-s disabled short" type="text" id="js-r-weixin" placeholder="请输入您的微信号(选填)" title="微信账号">
<%}%>
</span>
            <span><img src="../../img/icons/qq.m.png">
<%if(contact!=null&&contact.indexOf("##qq##")<contact.indexOf("##/qq##")){%>
<input  value="<%=contact.substring(contact.indexOf("##qq##")+6,contact.indexOf("##/qq##"))%>"  class="e-s disabled short" type="text"  id="js-r-qq" placeholder="请输入您的QQ号码" title="QQ号码">
<%}else{%>
<input class="e-s disabled short" type="text"  id="js-r-qq" placeholder="请输入您的QQ号码(选填)" title="QQ号码">
<%}%>
</span>
        <i class="error">*请填写联系方式!</i>
        </td>
        </tr>
        <tr>
        <th class="vtab">自我介绍<span>:</span></th>
        <td>
        <p class="show-summary"><%=member.getMresume()!=null?member.getMresume():""%></p>
        <textarea name="summary" id="summary" rows="10"  cols="85" placeholder="是否午夜时分梦见自己在大理慵懒的下午茶，还有次跟朋友聊起涠洲岛的五彩滩，曾经在微博上看到有人夸过南宁去越南。我们有梦为马，我们诗酒趁年华。写下属于你的“独白” 找一家喜欢的小栈，休闲午后，散漫时光。" class="e-s
        disabled hide"><%=member.getMresume()!=null?member.getMresume():""%></textarea>
        <i class="error vat">*请填写自我介绍!</i>
        </td>
        </tr>
            <tr>
            <th class="vtab"></th>
            <td>
            <p class="tips">
            温馨提示：“如果应聘成功，一定要提示老板点击通过哦！否则不能对店家发表评论哦。你的评论对其它义工至关重要！”</p>

            </td>
            </tr>
        </tbody>
        </table>
        </form>
        <div class="btn-menu hide">
        <a href="javascript:void(0);" id="resume-save-btn" class="btn btn-primary">保存</a>
        <a href="javascript:void(0);" id="resume-cancel-btn" class="btn btn-white">取消</a>
        </div>
        </div>
        </div>
        </div>
        <div class="box">
        <div class="box-header">
        <h1 class="title">投递历史</h1>
        </div>
        <div class="box-content">
        <div class="tab-group clear-fix">
        <ul>
        <li><a href="javascript:void(0);" class="tab tab-active">全部</a></li>
        <li><a href="javascript:void(0);" class="tab">已发送<i
        class="tab-new hide">+3</i></a></li>
        <li><a href="javascript:void(0);" class="tab">已通过</a></li>
        <li><a href="javascript:void(0);" class="tab">待评价</a></li>
        <li><a href="javascript:void(0);" class="tab">已评价</a></li>
        </ul>
        </div>
            <div style="padding-left: 3em">
            <p class="text-theme">温馨提示:<br>1.请查看老板的联系方式并联系他们吧。<br>2.老板通过您的申请后,请在约定的时间到店工作哦,如果完成老板的工作或者取消出发了,请点击"结束工作"<br>3.结束工作后,请对商家进行准确、中肯的评分和评价哦。</p>
            </div>
        <ul class="card-list" id="all">
        <!--因为事件处理函数 是绑定在cardlist上的 可能模板只能填充里面的li-->
        </ul>
        <ul class="card-list hide" id="sent">
        </ul>
        <ul class="card-list hide" id="accepted">
        </ul>
        <ul class="card-list hide" id="completed">
        </ul>
        <ul class="card-list hide" id="finished">
        </ul>
        </div>
        </div>
        <!--
        pagination
        -->
        <div class="pagination-wrapper">
        <ul class="pagination">
        <li>
        <a href="javascript:void(0);" class="pre"></a>
        </li>
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
        <li>
        <a href="javascript:void(0);" class="next"></a>
        </li>
        <li>跳转到 ：&nbsp;
        <input type="text" id="jumpTo" />
        </li>
        <li><a href="javascript:void(0);" class="go">GO</a></li>
        </ul>
        </div>
        <!--
        .pagination
        -->
        </div>
        </div>
        <!-- 评分 -->
        <div class="judge hide">
        <ul>
        <li>性格性情:
        <a href="javascript:void(0);" title="点击评分"><img src="../../img/icons/halfStar.png" alt="星星"
        class="halfStar"><img src="../../img/icons/halfStar.png" alt="星星" class="halfStar"><img
        src="../../img/icons/halfStar.png" alt="星星" class="halfStar"><img src="../../img/icons/halfStar.png" alt="星星"
        class="halfStar"><img src="../../img/icons/halfStar.png" alt="星星" class="halfStar"></a>
        </li>
        <li>工作能力:
        <a href="javascript:void(0);" title="点击评分"><img src="../../img/icons/halfStar.png" alt="星星"
        class="halfStar"><img src="../../img/icons/halfStar.png" alt="星星" class="halfStar"><img
        src="../../img/icons/halfStar.png" alt="星星" class="halfStar"><img src="../../img/icons/halfStar.png" alt="星星"
        class="halfStar"><img src="../../img/icons/halfStar.png" alt="星星" class="halfStar"></a>
        </li>
        <li>符合描述:
        <a href="javascript:void(0);" title="点击评分"><img src="../../img/icons/halfStar.png" alt="星星"
        class="halfStar"><img src="../../img/icons/halfStar.png" alt="星星" class="halfStar"><img
        src="../../img/icons/halfStar.png" alt="星星" class="halfStar"><img src="../../img/icons/halfStar.png" alt="星星"
        class="halfStar"><img src="../../img/icons/halfStar.png" alt="星星" class="halfStar"></a>
        </li>
        </ul>
        <textarea name="judge" id="judge-text" cols="5" rows="5" maxlength="200"
        placeholder="请在这里写入对这次招聘的评价~(200字以内)"></textarea>

        <p><a href="javascript:void(0);" class="btn btn-warn">确认</a></p>
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
        <img src="../../img/footer/footer1.png" alt="微博图标" />
        <p>嗨柚旅行微博</p>
        <a href="http://weibo.com/hiyouther" title="点击关注我们的微博"><img src="../../img/footer/footer2.png" alt="微博图标" /></a>
        </li>
        <li>
        <img class="erweima" src="../../img/footer/8cmerweima.jpg" alt="微信公众号二维码" />
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
        require(['domReady', 'page/personal'], function(domReady, personal) {
        domReady(function() {

            <%
        String pram = "";
            if(member.getMaddress()!=null&&member.getMaddress().split("-").length>0)
            {
                String prov = member.getMaddress().split("-")[0];
                String city =  "";

                if(member.getMaddress()!=null&&member.getMaddress().split("-").length>1)
                {
                    city = member.getMaddress().split("-")[1];
                }else{
                    city =  "";
                }

              pram = prov + "','" + city;
            }
            else
            {
                pram = "";
            }
        %>

        personal.init('<%=pram %>');
            personal.setAge("<%=member.getMtel()%>");
        });
        });
        </script>

        <script type="text/javascript" src="../../util/plupload-2.1.2/js/plupload.full.min.js"></script>
        </body>

        </html>