<%@page import="java.text.SimpleDateFormat"%>
<%@page import="com.tool.GetPicForWeb"%>
<%@page import="com.tool.FianlOssData"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@page import="com.mybatis.entity.*"%>
<%@page import=" java.util.List"%>
<%@page import="java.nio.channels.SeekableByteChannel"%>
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <title>招聘详情</title>
    <meta name="Keywords" content="嗨柚,hiyouth,青年旅行,义工旅行,打工换宿,国际义工,国际游学,毕业旅行,义工生活,穷游"/>
    <meta name="Description"
          content="“HiYouth嗨柚青年旅行”是一款集旅行信息发布、学习实践、交流分享、交友结伴、活动自组、旅游周边于一体的青年开放式生态旅行产品，打造专注于开阔青年人视野，丰富青年人课余生活和知识的深度游学平台。"/>


    <link rel="stylesheet" type="text/css" href="../css/share/reset.css"/>
    <!--myCss-->
    <link rel="stylesheet" type="text/css" href="../css/share/poster-common.css">
    <link rel="stylesheet" type="text/css" href="../css/share/poster.css">
    <link rel="stylesheet" type="text/css" href="../css/share/ui.css">
    <link rel="stylesheet" type="text/css" href="../util/datepicker/css/datepicker/base.css">
    <link rel="stylesheet" type="text/css" href="../util/datepicker/css/datepicker/dark.css">
    <!--<link rel="stylesheet" type="text/css" href="index.css"/>-->
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
                    <li><a href="index.html" class="active">首页</a></li>
                    <li><a href="about-us.html">关于我们</a></li>
                    <li><a id="x-place-1">加载中</a></li>
                    <li><a id="x-place-2">加载中</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
<!-- /header -->
<!--header-content-->
<%Hostel hostel=(Hostel)session.getAttribute("hostel");
RecruitWithBLOBs recruit=(RecruitWithBLOBs)session.getAttribute("recruit");
String collect=(String)session.getAttribute("ifCollect");
SimpleDateFormat d=new SimpleDateFormat("yyyy-MM-dd");
%>
<%List<Picture> picture=(List<Picture>)session.getAttribute("picture");%>
<section class="hotel">
    <header>

        <a class="fr report hide" href="javascript:void(0);">[举报]</a>
        <h2><%=hostel.getHname() %><%if(collect.equals("1")){ %>
          <a class="collected" href="javascrpt:void(0)" title="点击收藏该客栈" id="collect">收藏</a>
        <%}else{ %>
           <a class="collect" href="javascrpt:void(0)" title="点击收藏该客栈" id="collect">收藏</a>
        <%} %>
    </h2>
        <h3>整体评分:<%for(int i =0;i<Integer.parseInt(hostel.getHscore());i++){ %>
		<img src="../img/icons/fullScore.png" alt="评分">
    		<% } %>
        <%for(int ii =Integer.parseInt(hostel.getHscore());ii<5;ii++){ %>
		<img src="../img/icons/zeroScore.png" alt="评分">
    		<% } %>

    <script type="text/javascript">
    (function(){
    var p = {
    url:location.href,
    showcount:'1',/*是否显示分享总数,显示：'1'，不显示：'0' */
    desc:'理由',/*默认分享理由(可选)*/
    summary:'摘要',/*分享摘要(可选)*/
    title:'标题',/*分享标题(可选)*/
    site:'www.hiyouther.com',/*分享来源 如：腾讯网(可选)*/
    pics:'', /*分享图片的路径(可选)*/
    style:'102',
    width:145,
    height:30
    };
    var s = [];
    for(var i in p){
    s.push(i + '=' + encodeURIComponent(p[i]||''));
    }
    document.write(['<a version="1.0" class="qzOpenerDiv" href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?',s.join('&'),'" target="_blank">分享</a>'].join(''));
    })();
    </script>
    <script src="http://qzonestyle.gtimg.cn/qzone/app/qzlike/qzopensl.js#jsdate=20111201" charset="utf-8"></script>
</h3>

    <div class="hide" id="share-hide">

    <!-- 报名成功后的分享 -->
    <script type="text/javascript">
    (function(){
    var p = {
    url:location.href,
    showcount:'1',/*是否显示分享总数,显示：'1'，不显示：'0' */
    desc:'理由',/*默认分享理由(可选)*/
    summary:'摘要',/*分享摘要(可选)*/
    title:'标题',/*分享标题(可选)*/
    site:'嗨柚',/*分享来源 如：腾讯网(可选)*/
    pics:'图片地址', /*分享图片的路径(可选)*/
    style:'101',
    width:199,
    height:30
    };
    var s = [];
    for(var i in p){
    s.push(i + '=' + encodeURIComponent(p[i]||''));
    }
    document.write(['<a version="1.0" class="qzOpenerDiv" href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?',s.join('&'),'" target="_blank">分享</a>'].join(''));
    })();
    </script>
    <script src="http://qzonestyle.gtimg.cn/qzone/app/qzlike/qzopensl.js#jsdate=20111201" charset="utf-8"></script>
    </div>
      <p class="location"><%=hostel.getHaddress() %></p>
    </header>
    <article>
        <ul class="labels">
          <% if(hostel.getHtag()!=null&&hostel.getHtag().split(";").length>0){
    		String b[] = hostel.getHtag().split(";");
    	     String[] sign={"tag-theme", "tag-pink", "tag-yellow", "tag-red", "tag-green"};
    	       
    		for(int i=0;i<b.length;i++){int index= (int)(Math.random()*5);
    		%>
    	
        <li><a class="t <%=sign[index] %>"><%=b[i] %></a></li>
       <%}} %>
        </ul>
    </article>
</section>
<!--end here-->

<!--end here-->
<!-- banner-->
<section class="banner-pic">
    <div id="banner">
        <div id="list">

                     <% if(picture.size()>0){
            	
            %>
            	<img class="lzimg" data-src="<%=GetPicForWeb.getPicUrl(picture.get(0).getPicaddress(),60)  %>" src="" data-alt="banner" alt="loading"/>
            <%}else { %>
            <img src="../img/banner/bn1.jpg" alt="banner"/>
            <% }%>
        </div>

    </div>
</section>

<!-- banner end here -->

<div id="container">

    <section class="fixed-header">
        <div class="fixed-wrap">
            <ul class="nav">
                <li class="active"><a href="#time">招聘</a></li>

                <li><a href="#review">评论</a></li>

                <li><a href="#answer">回答</a></li>

                <li><a href="#gallery">照片</a></li>

                <li><a href="#map">位置</a></li>

                <li><a href="#record">记录</a></li>
  
                <a class="join" href="javascript:void(0);" id="join-btn" title="点击报名">
                    <b href="javascript:void(0);">报名</b>
                    <span>participate</span>
                </a>
            </ul>
        </div>
    </section>


    <section class="story paper" id="time">

    <header>
          <h1 class="title text-theme">我与我的店</h1>
    </header>
    <article>
    <p class="story"><%=hostel.getHsynopsis() %></p>
    </article>


    <%--<a class="blueBtn" href="javascript:void(0);" title="点击加载更多招聘">查看更多招聘</a>--%>
    </section>

    <section class="time paper" id="time">
        <h2 class="title2">招聘详情</h2>
        <header>
            <h2 class="blueCircle redNew"><%=recruit.getRname() %></h2>
            <span class="time">发布时间:<%=recruit.getRworktime()%></span>
        </header>
        <article>

            <h3 class="title">需求人数</h3>
            <p><!--
                --><%=recruit.getRnumbers()%>
            </p>
            <h3 class="title">到岗时间</h3>
            <p><!--
            --><%=d.format(recruit.getRsctime())+" 到 "+d.format(recruit.getRmonth())%>
            </p>
            <h3 class="title">工作内容:</h3>
            <p><%=recruit.getRtask()%></p>
            <h3 class="title">义工要求:</h3>
            <p><!--
             --><%=recruit.getRcompetence()%>
            </p>
            <h3 class="title">福利/其他:</h3>
            <p><!--
            --><%=recruit.getRsynopsis()%>
            </p>

        </article>

      
        <%--<a class="blueBtn" href="javascript:void(0);" title="点击加载更多招聘">查看更多招聘</a>--%>
    </section>

    <section class="review paper" id="review">

        <header>
            <h2></h2>
        </header>
        <article class="review-article bdrt inner-content" id="review-article">

            <!--
        pagination
        -->
            <div class="pagination-wrapper">
                <ul class="pagination">
                    <li class="active"><a href="javascript:void(0);" class="pre"></a></li>
                    <li><a href="javascript:void(0);">1</a></li>
                    <li><a href="javascript:void(0);">2</a></li>
                    <li class="active"><a href="javascript:void(0);">3</a></li>
                    <li><a href="javascript:void(0);">4</a></li>
                    <li><a href="javascript:void(0);">5</a></li>
                    <li><a href="javascript:void(0);">6</a></li>
                    <li><a href="javascript:void(0);">7</a></li>
                    <li><a href="javascript:void(0);">8</a></li>
                    <li><a href="javascript:void(0);">9</a></li>
                    <li><a href="javascript:void(0);">10</a></li>
                    <li><a href="javascript:void(0);">11</a></li>
                    <li class="active"><a href="javascript:void(0);" class="next"></a></li>
                    <li>跳转到 ：&nbsp;<input type="text" id="jumpToReview"/></li>
                    <li><a href="javascript:void(0);" class="go">GO</a></li>
                </ul>
            </div>
            <!--
            .pagination
            -->
        </article>

    </section>

    <section class="answer paper" id="answer">

        <header>
            <a class="grayBtn" href="javascript:void(0);" id="add-ask-btn">我要提问题+</a>
            <div class="i-want-ask fix hide">
                <textarea name="ask"  id="ask-area" cols="30" rows="10" placeholder="请在此输入您的问题(40字左右)" maxlength="45"></textarea>
                <p class="fr"><a href="javascript:void(0);" class="btn btn-primary" id="send-ask">发送</a><a href="javascript:void(0);" class="btn btn-white" id="ask-cancel">取消</a></p>
            </div>
        </header>
        <article class="inner-content">

        </article>
        <!--pagination-->
        <div class="pagination-wrapper">
            <ul class="pagination">
                <li class="active"><a href="javascript:void(0);" class="pre"></a></li>
                <li><a href="javascript:void(0);">1</a></li>
                <li><a href="javascript:void(0);">2</a></li>
                <li class="active"><a href="javascript:void(0);">3</a></li>
                <li><a href="javascript:void(0);">4</a></li>
                <li><a href="javascript:void(0);">5</a></li>
                <li><a href="javascript:void(0);">6</a></li>
                <li><a href="javascript:void(0);">7</a></li>
                <li><a href="javascript:void(0);">8</a></li>
                <li><a href="javascript:void(0);">9</a></li>
                <li><a href="javascript:void(0);">10</a></li>
                <li><a href="javascript:void(0);">11</a></li>
                <li class="active"><a href="javascript:void(0);" class="next"></a></li>
                <li>跳转到 ：&nbsp;<input type="text" id="jumpToQuestion"/></li>
                <li><a href="javascript:void(0);" class="go">GO</a></li>
            </ul>
        </div>
        <!--
        .pagination
        -->
    </section>

    <section class="gallery paper" id="gallery">

        <article class="gallery-article fix">

        <% if(picture.size()>0){ %>
                    <% if(picture.size()>=1){%>
                    <div class="pic-wrap">
                    <a href="javascript:void(0);" title="相册图片"> <img class="lzimg" data-src="<%=GetPicForWeb.getPicUrlForOption(picture.get(0).getPicaddress(),60,FianlOssData.getWatermark()) %>" src=""  data-alt="相册图片" alt="loading"></a>
                    </div>
                    <% }%>
                    <% if(picture.size()>=2){%>
                    <div class="pic-wrap">
                    <a href="javascript:void(0);" title="相册图片"> <img class="lzimg" data-src="<%=GetPicForWeb.getPicUrlForOption(picture.get(1).getPicaddress(),60,FianlOssData.getWatermark())  %>" src=""  data-alt="相册图片" alt="loading"></a>
                    </div>
                    <% }%>
                    <% if(picture.size()>=3){%>
                    <div class="pic-wrap">
                    <a href="javascript:void(0);" title="相册图片"> <img class="lzimg" data-src="<%=GetPicForWeb.getPicUrlForOption(picture.get(2).getPicaddress(),60,FianlOssData.getWatermark())  %>" src=""  data-alt="相册图片" alt="loading"></a>
                    </div>
                	<% }%>
               		 <% if(picture.size()>=4){%>
                    <div class="pic-wrap">
                    <a href="javascript:void(0);" title="相册图片"> <img class="lzimg" data-src="<%=GetPicForWeb.getPicUrlForOption(picture.get(3).getPicaddress(),60,FianlOssData.getWatermark())  %>" src=""   data-alt="相册图片"  alt="loading"></a>
                    </div>
                    <% }%>
                    <% if(picture.size()>=5){%>
                    <div class="pic-wrap">
                    <a href="javascript:void(4);" title="相册图片"> <img class="lzimg" data-src="<%=GetPicForWeb.getPicUrlForOption(picture.get(0).getPicaddress(),60,FianlOssData.getWatermark())  %>"  src="" data-alt="相册图片"  alt="loading"></a>
                    </div>
                    <% }%>
                     <% if(picture.size()>=6){%>
                    <div class="pic-wrap">
                    <a href="javascript:void(0);" title="相册图片"> <img class="lzimg" data-src="<%=GetPicForWeb.getPicUrlForOption(picture.get(5).getPicaddress(),60,FianlOssData.getWatermark())  %>" src=""  data-alt="相册图片"  alt="loading"></a>
                    </div>
                    <% }%>
                    <% if(picture.size()>=7){%>
                    <div class="pic-wrap">
                    <a href="javascript:void(0);" title="相册图片"> <img class="lzimg" data-src="<%=GetPicForWeb.getPicUrlForOption(picture.get(6).getPicaddress(),60,FianlOssData.getWatermark())  %>" src=""  data-alt="相册图片"  alt="loading"></a>
                    </div>
                    <% }%>
                    <% if(picture.size()>=8){%>
                    <div class="pic-wrap">
                    <a href="javascript:void(0);" title="相册图片"> <img class="lzimg" data-src="<%=GetPicForWeb.getPicUrlForOption(picture.get(7).getPicaddress(),60,FianlOssData.getWatermark())  %>" src=""  data-alt="相册图片"  alt="loading"></a>
                    </div>
                    <% }%>

            <%}else { %>
                    <p class="text-theme">暂无图片</p>
        <% } %>

        </article>

    </section>
    <section class="map paper" id="map">

        <div class="map-div fix">
            <div id="allmap"></div>
            <div class="js-map-mask" title="点击后关闭蒙版"></div>
            <div class="js-map-mask2">点击后关闭蒙版</div>
        </div>
    </section>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=lhzpY6sFuHi8d6KZ3fGBiaZG"></script>
    <!--开发者密钥：lhzpY6sFuHi8d6KZ3fGBiaZG-->
   
    <script type="text/javascript">
    //   百度地图API功能
    var map = new BMap.Map("allmap");    // 创建Map实例
    // 创建地址解析器实例
    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint('<%if(hostel.getHaddress()!=null&&hostel.getHaddress().split("-").length>2){ %><%=hostel.getHaddress().split("-")[2]%><%}else{%><%=hostel.getHaddress()%><%}%>', function(point){
        if (point) {

                     map.centerAndZoom(point, 16);
                     var marker = new BMap.Marker(point)
                     map.addOverlay(marker);
                     map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
//                     map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
                     map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

            //              跳跃动画
//            var point = new BMap.Point(106.6139220000, 29.5383200000);
//            var marker = new BMap.Marker(point);  // 创建标注
//            map.addOverlay(marker);               // 将标注添加到地图中
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

            //              baidu地图插件，控件
            map.addControl(new BMap.NavigationControl());               // 添加平移缩放控件
            map.addControl(new BMap.ScaleControl());                    // 添加比例尺控件
            map.addControl(new BMap.OverviewMapControl());              //添加缩略地图控件
            map.enableScrollWheelZoom();                            //启用滚轮放大缩小
        }
    },'<%if(hostel.getHaddress()!=null&&hostel.getHaddress().split("-").length>1){ %><%=hostel.getHaddress().split("-")[0]+hostel.getHaddress().split("-")[1]%><%}else{%><%=hostel.getHaddress()%><%}%>');

    </script>

    <section class="record paper" id="record">
        <article>
            <div class="record-div inner-content">
                <table class="record-table">
                    <tr class="blueCommon table-header">
                        <th>招聘名称</th>
                        <th>发布时间</th>
                        <th>投递人数</th>
                        <th>评论量</th>
                        <th>问答量</th>
                        <th>状态</th>
                    </tr>
                    <tr class="table-content">
                        <td>吧台义工</td>
                        <td>2013-04-12</td>
                        <td>230</td>
                        <td>2379</td>
                        <td>32</td>
                        <td><a class="blueCommon" href="">报名中</a></td>
                    </tr>
                    <tr>
                        <td>前台义工</td>
                        <td>2013-04-12</td>
                        <td>230</td>
                        <td>2379</td>
                        <td>32</td>
                        <td><a class="grayCommon" href="">招聘结束</a></td>
                    </tr>
                    <tr>
                        <td>(女生)暑期...</td>
                        <td>2012-04-12</td>
                        <td>240</td>
                        <td>2569</td>
                        <td>32</td>
                        <td><a class="grayCommon" href="">招聘结束</a></td>
                    </tr>
                    <tr>
                        <td>寒假义工...</td>
                        <td>2010-04-12</td>
                        <td>250</td>
                        <td>2889</td>
                        <td>38</td>
                        <td><a class="grayCommon" href="">招聘结束</a></td>
                    </tr>
                </table>
            </div>
            <!--
                pagination
                -->
            <div class="pagination-wrapper">
                <ul class="pagination">
                    <li class="active"><a href="javascript:void(0);" class="pre"></a></li>
                    <li><a href="javascript:void(0);">1</a></li>
                    <li><a href="javascript:void(0);">2</a></li>
                    <li class="active"><a href="javascript:void(0);">3</a></li>
                    <li><a href="javascript:void(0);">4</a></li>
                    <li><a href="javascript:void(0);">5</a></li>
                    <li><a href="javascript:void(0);">6</a></li>
                    <li><a href="javascript:void(0);">7</a></li>
                    <li><a href="javascript:void(0);">8</a></li>
                    <li><a href="javascript:void(0);">9</a></li>
                    <li><a href="javascript:void(0);">10</a></li>
                    <li><a href="javascript:void(0);">11</a></li>
                    <li class="active"><a href="javascript:void(0);" class="next"></a></li>
                    <li>跳转到 ：&nbsp;<input type="text" id="jumpToRecord"/></li>
                    <li><a href="javascript:void(0);" class="go">GO</a></li>
                </ul>
            </div>
            <!--
            .pagination
            -->
        </article>

    </section>


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
                        <a href="http://weibo.com/hiyouther" title="点击关注我们的微博"><img src="../img/footer/footer2.png"
                                                                             alt="微博图标"/></a>
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
<div class="overlay hide" id="overlay">
</div>
<div class="pop-box hide" id="pop-box">
    <div class="pop-info arrive-pop hide">
        <div class="icons">
            <a href="javascript:void(0);" class="icon-main"><img src="../img/icons-size/success-i.png" alt="错误图标"></a>
            <a href="javascript:void(0);" class="icon-close"><img src="../img/icons-size/close-i.2x.png" alt="关闭"></a>
        </div>
        <div class="pop-content">
            <div>
                <p>请选择到岗时间: <input type="text" id="arrive-date" readonly></p>
                <p>您的简历将被投递到这家客栈 </p>
            </div>
            <p><a href="javascript:void(0);" class="btn btn-primary" id="yes-join-btn">确认</a></p>
        </div>
    </div>
    <div class="pop-alert hide">
        <div class="icons">
            <a href="javascript:void(0);" class="icon-main"><img src="../img/icons-size/error-i.png" alt="错误图标"></a>
            <a href="javascript:void(0);" class="icon-close"><img src="../img/icons-size/close-i.2x.png" alt="关闭"></a>
        </div>
        <div class="pop-content">
            <div>
                <p class="pop-alert-text tac"> </p>
            </div>
            <p class="tac"><a href="javascript:void(0);" class="btn btn-primary" id="pop-alert-btn">确定</a></p>
        </div>
    </div>
    <div class="pop-ok hide">
        <div class="icons">
            <a href="javascript:void(0);" class="icon-main"><img src="../img/icons-size/success-i.2x.png" alt="成功图标"></a>
            <a href="javascript:void(0);" class="icon-close"><img src="../img/icons-size/close-i.2x.png" alt="关闭"></a>
        </div>
        <div class="pop-content">
            <div class="pop-diy">
                <p class="pop-ok-text tac"> </p>
            </div>
            <p class="tac"><a href="javascript:void(0);" class="btn btn-primary" id="pop-success-btn">确定</a></p>
        </div>
    </div>

</div>
<script src="../js/lib/require.js"></script>
<script type="text/javascript" rel="script">
    require.config({
        baseUrl: "../js",
        paths: {
            jquery: 'lib/jq',
            domReady: 'lib/require.domready',
            datepicker:'business/datepicker'
        }
    });
    require(['domReady', 'page/recruitdetail'], function (domReady, recruitdetail) {
        domReady(function () {
            recruitdetail.init()
        })
    })
</script>

</body>
</html>