/**
 * Created by xiepengcheng on 16/4/23.
 */
"use strict";
define(function (require, exports, module) {
    var _public = module.exports = {};
    var $ = require('jquery'),
        common = require('lib/common'),
        report = require('business/report'),
        jalert = require('business/jalert'),
        pagination = require('business/pagination'),
        router = require('business/router');

    var _private = {};

    _public.init = function () {
        // todo ...
        _public.dom();
    };
    _public.dom = function () {


        var urlInfo = common.parseURL(window.location.href),
            params = urlInfo.params;

        $(".container .box-header .title").text("简历汇总-" + decodeURI(params.name));

        var Tab = {
            index: 0,
            tab: ["全部", "未通过", "已通过", "待评分", "已评分"],
            id: ["all", "received", "accepted", "completed", "finished"],
            to: function (text) {
                //hide
                $(".tab").eq(this.index).removeClass("tab-active")
                $('#' + this.id[this.index]).hide();
                //show
                this.index = this.tab.indexOf(text);
                if (this.index != 0) {
                    params.schedule = this.index;

                    $(".pagination-wrapper ul").off();
                    $(".pagination-wrapper ul").pcPage({
                        url: router.getUrl('getApply'),
                        queryParams: {id: params.id, schedule: params.schedule},
                        options: {
                            rows: 10,
                            page: 1
                        },
                        pageChange: function (dom) {
                            $("#all, #received, #accepted, #completed, #finished").html('<div class="loading"><img src="../../../img/loading.gif" alt="loading"/></div>')
                        },
                        renderData: function (result) {
                            //根据id渲染数据
                            common.template('apply-list', result, $("#"+Tab.id[Tab.index]));

                            (function () {
                                //替换男女字符
                                $(".woman").html("\u2640");
                                $(".man").html("\u2642");
                            })();


                        }
                    });

                } else {
                    params.schedule = undefined;

                    $(".pagination-wrapper ul").off();
                    $(".pagination-wrapper ul").pcPage({
                        url: router.getUrl('getApply'),
                        queryParams: {id: params.id},
                        options: {
                            rows: 10,
                            page: 1
                        },
                        pageChange: function (dom) {
                            $("#all, #received, #accepted, #completed, #finished").html('<div class="loading"><img src="../../img/loading.gif" alt="loading"/></div>')
                        },
                        renderData: function (result) {

                            common.template('apply-list', result, $("#"+Tab.id[Tab.index]));

                            (function () {
                                //替换男女字符
                                $(".woman").html("\u2640");
                                $(".man").html("\u2642");
                            })();


                        }
                    });

                }
                $(".tab").eq(this.index).addClass("tab-active")
                $('#' + this.id[this.index]).show();
            },
            click: function (el) {
                this.to(el.text.replace(/[+]?\d+/, ""));
            }
        }

        // tab toggle
        $("#delegate").on("click", ".tab", function () {
            Tab.click(this);
        });


        // 发送旅店id获取数据  此处id为模拟数据id需要获取传入数据
        //common.send("getApply", {id: 1}).then(function(result){
        //
        //
        //});

        // 渲染招聘历史
        $(".pagination-wrapper ul").pcPage({
            url: router.getUrl('getApply'),
            queryParams: {id: params.id, schedule: params.schedule},
            options: {
                rows: 10,
                page: 1
            },
            pageChange: function (dom) {
                $("#all, #received, #accepted, #completed, #finished").html('<div class="loading"><img src="../../img/loading.gif" alt="loading"/></div>')
            },
            renderData: function (result) {

                common.template('apply-list', result, $("#"+Tab.id[Tab.index]));

                (function () {
                    //替换男女字符
                    $(".woman").html("\u2640");
                    $(".man").html("\u2642");
                })();


            }
        });

        //返回顶部
        $(window).scroll(function () {
            if ($(document).scrollTop() > 200) {
                $(".toolbar").fadeIn();
            } else {
                $(".toolbar").fadeOut();
            }
        });
        $("#scrollTop").click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 500);
            return false;
        });



        //bottom 显示所有checkbox
        //绑定选中全部的按钮
        $(".bottom").on("click", "a", function (e) {
            var $a = $(this),
                 text = $a.text();
            if (text == "本页全选") {
                $(".check-box+label").click();
                return false;
            } else if (text == "通过") {
                $(":checkbox:checked").not($("#li-all")).each(function (index, el) {
                    var $li = $(el).parents("li");
                    var $a2 = $li.find(".card-right .btn");
                    if ($a2.text() == "通过") {
                        $a2.click();
                    }
                })
            } else if (text == "删除") {
                $(":checkbox:checked").not($("#li-all")).each(function (index, el) {
                    var $li = $(el).parents("li");
                    $li.find(".card-right .h-c-theme").each(function (index,el) {
                        if ($(el).text() == "删除"){
                            $(el).click()
                        }
                    });
                })
            } else if (text == "拒绝") {

            if($(":checkbox:checked").not($("#li-all")).length==0){
                jalert.error("请选择批量拒绝的用户");
                return;
        }
                var reason = {r1:'',r2:'',r3:''};
                var ok_callback = function (yes) {
                    if(!yes){return;}
                    var text_reason = reason.r1 + reason.r2 + reason.r3,
                        li_list=[],
                        lab = $(":checkbox:checked").not($("#li-all"));


                    lab.each(function (index, el) {
                        var $li = $(el).parents("li");
                        var $a2 = $li.find(".card-right .btn").eq(0);
                        if ($a2.text() == "通过") {
                            li_list.push($li.data("aid"));
                        }

                    });

                    common.send("allRefuse",{id:li_list,refuse:text_reason}).done(function (result) {
                        if(result && result.code ==1){
                            jalert.alert(result.info);
                            lab.each(function (index, el) {
                                var $li = $(el).parents("li"),
                                    sid = parseInt($li.data("sid"));

                                var $a2 = $li.find(".card-right .btn").eq(0);
                                if ($a2.text() == "通过") {
                                    $li.data('sid',(sid+1));
                                    $li.find(".cell span").text("未通过");
                                    $li.find(".card-right").html('<p class="text-gray single">已拒绝</p> <p> <a href="javascript:void(0);" class="h-c-theme">查看详情</a> &nbsp;<a href="javascript:void(0);" class="h-c-theme">删除</a></p>');
                                }


                            });

                        }
                    })


                };


                jalert.confirm("您是否批量拒绝用户的申请？<br><div style='font-size: 16px;line-height: 20px;text-align: left;'>若要拒绝,请选择拒绝理由(可多选):" +
                    "<br><input type='checkbox' id='js-p-reason1'><span>\"1.义工已经招满啦，不好意思哦，可以去别家店看看哈~\"</span>" +
                    "<br><input type='checkbox' id='js-p-reason2'><span>\"2.你不太符合我家小店的要求哦，可以去别家店看看哈~\"</span>" +
                    "<br>若非以上理由,请输入其他原因:" +
                    "<br><textarea id='js-p-reason3' style='width:100%;box-sizing: border-box;'></textarea></div>","确定","取消",ok_callback);


                $("#js-p-reason1").change(function () {
                    if($(this).prop("checked")){
                        reason.r1 = $(this).next().text();
                    }else{
                        reason.r1 = '';

                    }
                });
                $("#js-p-reason2").change(function () {
                    if($(this).prop("checked")){
                        reason.r2 = $(this).next().text();
                    }else{
                        reason.r2 = '';

                    }

                });
                $("#js-p-reason3").blur(function () {
                    reason.r3 = $(this).val();
                });
            }
        })


        //全部选中 --checkbox  此处有坑 不知道为什么不能让li-all也checked-- 已解决 是因为没有处理默认事件
        $(".check-box+label").on("click", function (e) {
            var $t = $(this);
            if ($t.attr("for") == "li-all") {

                if ($t.prev().prop("checked") ==false ) {
                    $(".check-box").prop("checked", true);
                    $t.prev().addClass("checked")

                } else {
                    $(".check-box").prop("checked", false);
                    $t.prev().removeClass("checked")

                }
                e.stopPropagation();
                e.preventDefault();
                return false;
            }else{
                $t.prev().removeClass("checked")
            }

        });

        $(".card-list").on("click", ".ell ,.portrait-70", function (e) {
            if ($(this).hasClass("ell")) {
                detail($(this))
            } else {
                detail($(this).next())
            }
        });
        $(".card-list").on("click", ".card-right a", function (e) {
            var $a = $(this),
                $li = $a.parents("li"),
                $right = $a.parents(".card-right"),
                $span = $li.find(".card-left .ell~p span"),
                text = $a.text();


            switch (text) {
                case "通过":
                {
                    var ifsuccess = function () {
                        var sid =  parseInt($li.data("sid"))
                        $li.data("sid",2000);
                        $right.html(' <p class="single"><a href="javascript:void(0);" class="btn btn-green ">结束工作</a></p>'
                            +'<p> <a href="javascript:void(0);" class="h-c-theme">查看详情</a></p>');
                        $span.text("已通过");
                    };
                   var yes=function(ok){
                       if(!ok){return;}

                       common.send("changeApplyByBoss", {id: $li.data("aid"), schedule: 2000}).done(function (result) {
                        if (result && result.code == 1) {
                            ifsuccess();
                        } else {
                            jalert.error(result.info);
                        }
                    })};
                    jalert.confirm("温馨提示：<br />亲爱的老柚，<span class='text-theme'>“通过”</span>代表达成前往协议，请先与义工联系确认，再点击“确认通过”哦。么么嘬～","确认通过","取消",yes);

                    break;
                }

                case "删除" :
                {
                    var ifsuccess = function () {

                        $li.empty();
                    };
                    var yes=function(ok){
                        if(!ok){return;}

                        common.send("changeApplyByBoss", {id: $li.data("aid"), schedule: parseInt($li.data("sid"))+100}).done(function (result) {
                        if (result && result.code == 1) {
                            ifsuccess();
                        } else {
                            jalert.error(result.info);
                        }
                    })};
                    jalert.confirm("删除义工的申请?\n","确定","取消",yes);

                    break;

                }
                case "拒绝":
                {

                    var ifsuccess = function () {
                        var sid =$li.data("sid");
                        $li.data("sid",parseInt(sid)+1)
                        $right.html('<p class="text-gray single">已拒绝</p>'+
                         ' <p> <a href="javascript:void(0);" class="h-c-theme">查看详情</a>'+
                             '&nbsp;<a href="javascript:void(0);" class="h-c-theme">删除</a></p>')
                        $span.text("已拒绝");
                    };

                    var ifyes =function(text){
                        if(text == null){return;}

                        if(text.trim()!=""){
                        common.send("changeApplyByBoss", {id: $li.data("aid"), refuse:text,schedule: parseInt($li.data("sid"))+1}).done(function (result) {
                            if (result && result.code == 1) {
                                ifsuccess();
                            } else {
                                jalert.error(result.info);
                            }
                        });

                        }else{
                            jalert.error("请输入拒绝理由");
                        }
                    };
                    //notie.confirm("是否拒绝该申请?","确定","取消",ifyes);
                    jalert.prompt("您是否要拒绝该申请?请输入拒绝的理由.","","确定","取消",ifyes);
                    break;
                } case "取消出发":
                {

                    var ifsuccess = function () {
                        var sid =$li.data("sid");
                        $li.data("sid",2001)
                        $right.html('<p class="text-gray single">已取消出发</p>');
                        $span.text("已取消");
                    };

                    var ifyes =function(text){
                        if(text == null){return;}

                        if(text.trim()!=""){
                        common.send("changeApplyByBoss", {id: $li.data("aid"), refuse:text,schedule: 2001}).done(function (result) {
                            if (result && result.code == 1) {
                                ifsuccess();
                            } else {
                                jalert.error(result.info);
                            }
                        });

                        }else{
                            jalert.error("请输入取消出发理由");
                        }
                    };
                    //notie.confirm("是否拒绝该申请?","确定","取消",ifyes);
                    jalert.prompt("义工是否取消出发?请输入取消出发的理由.","","确定","取消",ifyes);
                    break;
                }
                case "查看详情":
                {

                    detail($a);
                    break;

                }

                case "结束工作":
                {
                    var ifsuccess = function () {
                        $li.data("sid",3000);
                        $right.html(' <p class="single"><a href="javascript:void(0);" class="btn btn-warn">评分</a></p>'
                            +'<p> <a href="javascript:void(0);" class="h-c-theme">查看详情</a></p>')
                        $span.text("待评价");
                    };
                   var yes = function (ok) {
                       if(!ok){return;}
                       common.send("changeApplyByBoss", {id: $li.data("aid"), schedule: 3000}).done(function (result) {
                        if (result && result.code == 1) {
                            ifsuccess();
                        } else {
                            jalert.error(result.info);
                        }
                    });
                   }
                    jalert.confirm("义工已经到店工作并且完成工作了吗？","完成了","没有",yes);
                    break;

                }
                case "评分" :
                {
                    _public.$tempa = $a;
                    showJudge(e);
                    break;

                }

            }

        });


        //查看详情
        function detail($a) {
            var show = function (obj) {


                var namespace = ["tag-theme", "tag-pink", "tag-yellow", "tag-red", "tag-green"];
                var len = namespace.length;
                //随机分配tag名称

                //此处应该弹窗显示用户详情
                var  $name = $(" #md-name"),
                     $age = $("#md-age"),
                     $contact = $("#md-contact"),
                     $sign = $("#md-sign"),
                     $tag = $("#md-tag"),
                     $info = $("#md-info"),
                     $img = $("#js-member-life");

                $("#md-close").click(function () {
                    $(".tk-detail").fadeOut();
                    $(this).off();
                    $name.text("");
                    $age.text("");
                    $sign.text("");
                    $tag.text("");
                    $contact.text("");
                    $info.text("");
                });

                //传递当前用户信息
                $name.html(obj.name + ((obj.idcard == 2)?"<img src='../../img/icons/idcardCi.png' style='vertical-align: -4px;margin-left:5px;' title='身份认证通过'>":"<img src='../../img/icons/idcardCiGray.png' style='vertical-align: -4px;margin-left:5px;' title='未身份认证'>"));
                $sign.text(obj.sign);
                if(obj.age){
                    $age.text(parseInt((new Date()).getFullYear() - obj.age.substr(0,4)));

                }else{
                    $age.text("载入中...")
                }

                //$tag.text(obj.tag.join("、"));

                var ul = document.createElement("ul")
                ul.className = "labels fix"
                $.each(obj.tag,function(index,el){
                    var a = document.createElement("a");
                    var li = document.createElement("li");
                    var random = Math.floor(Math.random() * len);
                    a.className = "t " + namespace[random];
                    a.innerHTML = el;
                    li.appendChild(a);
                    ul.appendChild(li);
                });
                $tag.html(ul);


                obj.contact=obj.contact.replace("##/qq##", '##qq##');
                obj.contact=obj.contact.replace("##/sj##", '##sj##');
                obj.contact=obj.contact.replace("##/wx##", '##wx##');
                var qq=obj.contact.split("##qq##")[1] || "";
                var sj=obj.contact.split("##sj##")[1] || "";
                var wx=obj.contact.split("##wx##")[1] || "";
                var text = (sj?"手机："+sj+"<br>":"") +(wx?"微信："+wx+"<br>":"") +(qq?"QQ："+qq+"<br>":"")
                $contact.html(text||"对方未填写");
                $info.text(obj.content);

                if(obj.picture){
                    $img.attr("src",obj.picture);
                    $img.removeClass("hide");
                    $img.prev().removeClass("hide");
                }else{
                    $img.addClass("hide");
                    $img.prev().addClass("hide");

                }

                $(".tk-detail").fadeIn();
            };
            var aid = $a.parents("li").data("aid");
            common.send("getApplyDetail", {aid: aid}).done(function (result) {
                if (result && result.code == 1) {
                    show(result.data);
                } else {
                    jalert.error(result.info);
                }
            })

        }




        //显示评分面板
        $(".card-right .btn-warn").on("click", function (e) {
            var obj = $(e.target).offset(),
                x = obj.left,
                y = obj.top,
                $judge = $("div.judge"),
                $imgs = $judge.find("img"),
                src = $imgs.attr('src').replace("fullStar", "halfStar");

            $imgs.attr("src", src);
            $imgs.addClass("halfStar");
            $imgs.removeClass("fullStar");

            $(".judge").removeClass("hide");
            $(".judge").css({"display": "block", top: y + 40 + "px", left: (x - 180) + "px"});

            e.stopPropagation();
            $(document.body).on("click", hideJudge);
        });
        function showJudge(e) {
            var obj = $(e.target).offset(),
                x = obj.left,
                y = obj.top,
                $judge = $("div.judge"),
                $imgs = $judge.find("img");

            $(".judge").removeClass("hide");

            if($('body').width()>768){
                $judge.removeClass("hide").css({"top": y + 40 + "px", "left": (x - 180) + "px"});
            }else{
                var q =($('body').width()- 275)/2,
                    w = ($('body').height() - 310)/2;
                $judge.removeClass("hide").css({"top": y + 40  + "px", "left": q + "px"});

            }

            var src = $imgs.attr('src').replace("fullStar", "halfStar");

            $imgs.attr("src", src);
            $imgs.addClass("halfStar");
            $imgs.removeClass("fullStar");

            e.stopPropagation();
            $(document.body).on("click", hideJudge);

        }

        function hideJudge(e) {
            if (!$(".judge").hasClass("hide")) {
                $(".judge").css({display: "none"});
                $(".judge").addClass("hide");
                $(document.body).off("click", hideJudge);
            }
        }

        $(".judge").on("click", function (e) {
            e.stopPropagation();
            e.cancelBubble = true;
        });
        //点击评分星级
        $(".judge").on("click", "img,.btn", function (e) {
            if (e.target.nodeName.toLowerCase() == "img") {
                var $left = $(e.target);
                var $right = $left.next();
                while ($left.length != 0) {
                    var src = $left.attr("src").replace("halfStar", "fullStar");
                    $left.attr("src", src);
                    $left.addClass("fullStar");
                    $left.removeClass("halfStar");
                    $left = $left.prev();
                }
                while ($right.length != 0) {
                    var src = $right.attr("src").replace("fullStar", "halfStar");
                    $right.attr("src", src);
                    $right.addClass("halfStar");
                    $right.removeClass("fullStar");
                    $right = $right.next();
                }
                e.stopPropagation();
                e.cancelBubble = true;

            } else {
                //获得星数
                var score = [0, 0, 0];
                $(".judge li a").each(function (index, el) {
                    score[index] = $(el).find(".fullStar").length;
                });
                var score_single = parseInt((score[0] + score[0] + score[0]) / 3);
                var $li = _public.$tempa.parents("li");

                common.send("makeScore", {
                    id: $li.data("mid"),
                    score: score_single
                }).done(function (result) {
                    if (result && result.code == 1) {
                        var ifsuccess = function () {
                            var $li =_public.$tempa.parents("li");
                            var sid = parseInt($li.data("sid"));

                            $li.data("sid",sid+100);
                            _public.$tempa.parents(".card-right").html('<p class="single"><a href="javascript:void(0);" class="btn btn-warn">已评分</a></p>')
                            hideJudge();
                        };
                        common.send("changeApplyByBoss", {id: $li.data("aid"), schedule: parseInt($li.data("sid"))+100}).done(function (result) {
                            if (result && result.code == 1) {
                                ifsuccess();
                            } else {
                                jalert.error(result.info);
                            }
                        });
                    } else {
                        jalert.error(result.info);
                    }
                }).error(function () {
                    jalert.error("评价失败!");
                    hideJudge();
                })

            }
        });

        //特殊字符
        function mw() {
            //替换男女字符
            $(".woman").html("\u2640");
            $(".man").html("\u2642");
        }

        mw();
    }

});