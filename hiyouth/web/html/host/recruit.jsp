
<%@page import="java.util.Date"%>
<%@page import="com.mybatis.entity.RecruitWithBLOBs"%>
<%@page import="com.mybatis.entity.Recruit"%>
<%@page import="com.tool.GetPicForWeb" %>
        <%@ page language="java" contentType="text/html; charset=UTF-8"
                 pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta charset="UTF-8">
		<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<title>修改招聘-嗨柚</title>
		<link rel="stylesheet" type="text/css" href="../../css/share/reset.css" />
		<link rel="stylesheet" type="text/css" href="../../css/share/ui.css" />
		<link rel="stylesheet" type="text/css" href="../../css/host/recruit.css" />
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
            <%
            RecruitWithBLOBs recruit=(RecruitWithBLOBs)session.getAttribute("recruit"); 
            %>
		<div class="container-wrapper">
			<div class="container">
				<div class="box ">
					<div class="box-header ">
						<h1 class="title">修改招聘</h1>
					</div>
					<div class="box-content">
						<form action="heihei" method="post">
							<table>
							<colgroup>
								<col style="width: 105px;" />
								<col style="width: auto;" />
							</colgroup>
							<tbody>
								<tr>
									<th>招聘标题<span>:</span></th>
									<td><input type="text" name="title" id="title" value="<%=recruit.getRname() %>"  placeholder="在此写入标题" /></td>
								</tr>
                                <tr>
                                <th class="vab">工作时间<span>:</span></th>
                                <td class="clear-fix">
    <select name="" id="start-year">

    </select>
    <select name="" id="start-month">

    </select>
    <span>到</span>
    <select name="" id="end-year">

    </select>
    <select name="" id="end-month">

    </select>
    <script>

    <%Date sdate=recruit.getRsctime();Date edate=recruit.getRmonth();%>
    var init_time = {

        year1:<%=sdate.getYear()%>,
        month1:<%=sdate.getMonth()+1%>,
        year2:<%=edate.getYear()%>,
        month2:<%=edate.getMonth()+1%>
    };


    var year = document.createDocumentFragment(),
    year2 = document.createDocumentFragment(),
    month = document.createDocumentFragment(),
    month2,
    now = new Date(),

    start_year = document.getElementById("start-year"),
    end_year = document.getElementById("end-year"),
    start_month = document.getElementById("start-month"),
    end_month = document.getElementById("end-month")
    ;
    //年份
    for (var i = now.getFullYear(); i < now.getFullYear() + 2; i++) {
        var o = document.createElement("option");
        var o2 = document.createElement("option");
        if(init_time.year1 && init_time.year1 == i){
            o.selected = true;
        }
        if(init_time.year2 && init_time.year2 == i){
            o2.selected = true;
        }
        o.innerHTML = i;
        o2.innerHTML = i;
        year.appendChild(o);
        year2.appendChild(o2);
    }
    //js的月份是从0开始的


    function get_month(t,month) {
    var d = document.createDocumentFragment(),
    now = new Date();

    if (t === "this") {
        for (var j = now.getMonth(); j < 12; j++) {
            var p = document.createElement("option");
            p.innerHTML = (j + 1);
            if(month && month == (j+1)){
                p.selected = true;
            }
            d.appendChild(p);
        }
    } else if (t === "next") {
        for (var k = now.getMonth(), l = 0; l <= k; l++) {
            var q = document.createElement("option");
            q.innerHTML = (l + 1);
            if(month && month == (l+1)){
                q.selected = true;
            }
            d.appendChild(q);
        }

    }

    return d;
    }

    //添加月份节点
    if(now.getFullYear() == init_time.year1){
        month = get_month("this",init_time.month1)
    }else{
         month =get_month("next",init_time.month1)
    }
    if(now.getFullYear() == init_time.year2){
        month2 =get_month("this",init_time.month2)
    }else{
        month2 =get_month("next",init_time.month2)
    }


    start_year.appendChild(year);
    end_year.appendChild(year2);
    start_month.appendChild(month);
    end_month.appendChild(month2);

    //设置事件函数
    start_year.onchange = function (e) {
    if(e.target.value != (new Date()).getFullYear()){
        start_month.innerHTML = "";
        start_month.appendChild(get_month("next"));
    }else{
        start_month.innerHTML = "";
        start_month.appendChild(get_month("this"));
    }
    };
    end_year.onchange = function (e) {
    if(e.target.value != (new Date()).getFullYear()){
        end_month.innerHTML = "";
        end_month.appendChild(get_month("next"));
    }else{
        end_month.innerHTML = "";
        end_month.appendChild(get_month("this"));
    }
    }



    </script>
                                </td>
                                </tr>
                                <tr>
                                <th class="vab">需要人数<span>:</span></th>
                                <td>
                                <input type="text" value="<%=recruit.getRnumbers()%>" maxlength="20" placeholder="例如:4-5人" id="number">
                                </td>
                                </tr>
								<tr>
									<th class="vab">工作内容<span>:</span></th>
									<td><textarea id="task" name="workcontent"  maxlength="2000" rows="10" cols="85" placeholder="在此写入工作的内容(2000字以内)"><%=recruit.getRtask()%></textarea></td>
								</tr>
								<tr>
									<th class="vab">义工要求<span>:</span></th>
									<td>
										<textarea id="competence" name="yigongyaoqiu"  maxlength="2000" rows="10" cols="85"  placeholder="在此写入义工要求(2000字以内)"><%=recruit.getRcompetence()%></textarea>
									</td>
								</tr>
								<tr>
									<th class="vab">福利/其他<span>:</span></th>
									<td><textarea id="rsynopsis" name="fuli" rows="10" cols="85"  maxlength="2000"  placeholder="福利或者其他内容(2000字以内)"><%=recruit.getRsynopsis()%></textarea></td>
								</tr>

							</tbody>
						</table>
						<div class="option">
							<a href="javascript:void(0);" id="submit-publish" class="btn btn-warn">保存</a>
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
                                        <a href="http://weibo.com/hiyouther" title="点击关注我们的微博"><img src="../../img/footer/footer2.png" alt="微博图标"/></a>
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
            require(['domReady', 'page/host.recruit'], function (domReady, recruit) {
                domReady(function () {
                    recruit.init()
                });
            });
        </script>

	</body>

</html>