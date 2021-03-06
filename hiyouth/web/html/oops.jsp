
    <%@page import="org.json.JSONObject"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
                 pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <title>oops-嗨柚</title>
    <link rel="stylesheet" type="text/css" href="../css/share/reset.css"/>
    <link rel="stylesheet" type="text/css" href="../css/share/ui.css"/>
    <link rel="stylesheet" type="text/css" href="../css/contact.css"/>
    <link rel="stylesheet" type="text/css" href="../css/media.css"/>
    <style>
        .box-header {
            text-align: center;;
        }
        .box-content {
            padding: 40px 40px 60px;
            text-align: center;;
        }
        .box-content h2{
            font-size: 16px;;
        }

        @media screen and (max-width: 768px) {
            td img {
                width: 90px;
                height: auto;
            }
            td p {
                font-size: 12px;
                color: #777
            }

            .box-header{
                display: none;
            }

            .box-content > p {
                color: rgb(16, 208, 216);
                margin: 10px;
            }

            .box {
                border: none
            }
        }
    </style>
</head>

<body>
<!-- header-->
<div class="header">
    <div class="header-content">
        <div class="headerWrapper fix">
            <div class="header-content-logo fl">
                <a href="index.html"><img src="../img/header/logo.png" alt="logo"/></a>
            </div>
            <div class="header-content-nav fr">
                <ul>
                    <li><a href="index.html">首页</a></li>
                    <li><a href="about-us.html">关于我们</a></li>
                    <li><a id="x-place-1">加载中</a></li>
                    <li><a id="x-place-2">加载中</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
<!-- /header -->
<%int code = (int)session.getAttribute("code");
	if( code == 1 ){
		String email = (String)session.getAttribute("email");
%>
<div class="container-wrapper">
    <div class="container">
        <div class="box">
            <div class="box-header">
                <h1 class="title">邮箱验证成功！</h1>
            </div>
            <div class="box-content">
                  <h2 class="text-theme">您好，您的邮箱号为：<%=email%>验证成功！<br>
                  	我们将在   <span id="js-1">5</span>  秒后跳转到首页，请前往登陆。
                  </h2>

            </div>
        </div>
    </div>
</div>
<%} else{%>
<div class="container-wrapper">
    <div class="container">
        <div class="box">
            <div class="box-header">
                <h1 class="title">邮箱验证失败 </h1>
            </div>
            <div class="box-content">
                  <h2 class="text-theme">对不起没有查到到您的账号信息!<br>
                  	我们将在  <span id="js-1">5</span> 秒后跳转到首页，请前往注册！
                  </h2>

            </div>
        </div>
    </div>
</div>
<%} %>
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
                        <p><a href="contract.html" target="_blank">用户协议</a></p>
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
                        <img src="../img/footer/footer1.png" alt="微博图标"/>
                        <p>嗨柚旅行微博</p>
                        <a href="http://weibo.com/hiyouther" title="点击关注我们的微博"><img src="../img/footer/footer2.png" alt="微博图标"/></a>
                    </li>
                    <li>
                        <img class="erweima" src="../img/footer/8cmerweima.jpg" alt="微信公众号二维码"/>
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
            <script>
                window.onload = function(){
                        count = 4;
                    setInterval(function(){

                         if(count==0){
                            window.location.href = "index.html";
                        }else{
                         document.getElementById("js-1").innerHTML = count;
                        --count;
                        }
                    },1000)


             }
            </script>
</body>

</html>