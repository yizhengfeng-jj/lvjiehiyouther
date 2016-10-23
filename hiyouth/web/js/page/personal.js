"use strict";
define(function (require, exports, module) {
    var _public = module.exports = {};
    var $ = require('jquery'),
        common = require('lib/common'),
        report = require('business/report'),
        router = require('business/router'),
        jalert = require("business/jalert"),
        pagination = require('business/pagination'),
        upload = require("business/upload");

    _public.init = function (text_prov, text_city) {
        _public.dom(text_prov, text_city);
    };

    _public.setAge = function (str) {
        var arr = [],
            now = new Date(),
            year = now.getFullYear(),
            month = now.getMonth(),
            date = now.getDate();

        var age_td = document.getElementById("age-td");


        if (str) {
            arr = str.split("-");
            year = parseInt(arr[0]);
            month = parseInt(arr[1]);
            date = parseInt(arr[2]);
        }

        //年份的select;
        var sl_year = document.createElement("select");
        sl_year.id = "js-r-year";
        sl_year.className = "e-s disabled short";

        for (var _qwe = (new Date()).getFullYear() - 10; _qwe > 1950; _qwe--) {
            var op = document.createElement("option");

            if (_qwe == year) {
                op.selected = true;
            }
            op.innerHTML = _qwe;
            sl_year.appendChild(op);
        }

        age_td.appendChild(sl_year);


        //月份的select;
        var sl_month = document.createElement("select");
        sl_month.id = "js-r-month";
        sl_month.className = "e-s disabled short";

        for (var _qwe = 1; _qwe < 13; _qwe++) {
            var op = document.createElement("option");

            if (_qwe == month) {
                op.selected = true;
            }
            op.innerHTML = _qwe;
            sl_month.appendChild(op);
        }

        age_td.appendChild(sl_month);

        //日期的select;
        //注意js的月份要是从0开始的
        var date_new = new Date(year,month);
        date_new.setDate("-1");//因为显示的month是1开始的 设置日期-1后 就是该月的月份了;

        var sl_date = document.createElement("select");
        sl_date.id = "js-r-date";
        sl_date.className = "e-s disabled short";

        for (var _qwe = 1; _qwe <= date_new.getDate(); _qwe++) {
            var op = document.createElement("option");
            if (_qwe == date) {
                op.selected = true;
            }
            op.innerHTML = _qwe;
            sl_date.appendChild(op);
        }

        age_td.appendChild(sl_date);


        //添加警示语
        var i = document.createElement("i");
        i.className = "error";
        i.innerHTML = "*请填写真实姓名!";

        age_td.appendChild(i);


        //设置事件处理函数
        var $year = $("#js-r-year"),
            $month = $("#js-r-month"),
            $date = $("#js-r-date");

        $year.change(changeDate);
        $month.change(changeDate);

        function changeDate(){
            var year = $year.val(),
                month = $month.val(),
                date = $date.val(),
                text = "";

            var the_date = new Date(year,month);
            the_date.setDate("-1");//该月的日期

            for (var _qwe = 1; _qwe <= the_date.getDate(); _qwe++) {
                text += "<option " + (_qwe==date?"selected='true' >":">")  + _qwe + "</option>";
            }
            $date.html(text)

        }
    };
    _public.dom = function (text_prov, text_city) {


        $("#js-upload").click(function () {
            $("#p-photo-life").val("");
            $("#p-photo-life").click();
        });

        $("#js-change-pic").click(function () {
            $("#p-photo-life").val("");
            $("#p-photo-life").click();

        });

        $("#p-photo-life").change(function () {
            var formdata = new FormData();
            var file = $(this).get(0).files[0];
            formdata.append("photo", file);
            formdata.append("name", file.name);

            var pid = $("#img-face").data("pid");
            if (pid != undefined) {
                formdata.append("type", 1);
                formdata.append("pid", pid);
            } else {
                formdata.append("type", 0);
            }

            var data = {
                url: router.getUrl("changeMemberPicture"),
                type: "POST",
                data: formdata,
                async: true, //异步
                processData: false, //很重要，告诉jquery不要对form进行处理
                contentType: false, //很重要，指定为false才能形成正确的Content-Type
                success: function (result) {
                    if (result && result.code == 1) {

                        var $a = $("#js-upload");
                        $a.addClass("hide");
                        $("#img-face").data("pid", result.pid);
                        $("#img-face").attr("src", result.img)
                        $a.prev().removeClass("vhide");
                    } else {
                        jalert.error(result.info,"确定");
                    }

                }
            };
            $.ajax(data);
        });

        $('#validating').click(function () {
            var url = $(this).attr('href');
            common.send('getcomfirm', {}).done(function (res) {
                if (res.code == 1 || res.code == -1) {
                    window.location.href = url;
                } else {
                    jalert.error(res.info,"确定")
                }
            });
            return false;
        })
        common.send("modme_index", {}).done(function (file) {
            $("body").append(file);
            var $all = $("#all");
            $('.pagination-wrapper ul').pcPage({
                url: router.getUrl('getdata'),
                queryParams: {},
                options: {
                    rows: 10,
                    page: 1
                },
                pageChange: function (dom) {
                    $all.html('<div class="loading"><img src="../../img/loading.gif" alt="loading"/></div>')
                },
                renderData: function (data) {
                    //  console.log("data== "+data);
                    common.template('list-tpl', data, $all);
                }
            });
        });

        //绑定
        $(".binding").on("click", "a", function () {
            var $a = $(this);
            var text = $a.text();
            var is_phone = $a.hasClass("bi-phone");
            var value = $a.prev().val();
            switch (text) {
                case "我要绑定":
                {
                    $a.prev().removeClass("disabled");
                    $a.text("发送验证码");
                    $a.after("<a href='javascript:void(0);' >取消</a>")
                    break;
                }
                case "发送验证码":
                {
                    if (is_phone) {
                        //发送验证码到手机

                    } else {
                        //发送验证码到邮箱

                    }
                    break;
                }
                case "取消":
                {
                    if (is_phone) {
                        //取消绑定手机
                    } else {
                        //取消绑定邮箱
                        ;
                    }
                    $a.prev().prev().addClass("disabled");
                    $a.prev().text("我要绑定");
                    $a.empty();
                    break;

                }
            }
        })

        //显示功能面板控制
        //    6.    “投递历史”模块，分为“全部”、“已通过”、“已落选”、
        // “已达成”、“已完成”四个标签页。
        // “已通过”里面的可以点击客栈名称，查看客栈联系方式。
        // “已达成”里面可以点击“取消出发”和“完成工作按钮”。
        // 取消出发，会通知老板不去了，并从已达成里面删掉这条记录，
        // “完成工作”，这条记录转移到“已完成”里面，可以在“已完成”里面
        // 对客栈进行评论和评分（评价只能2次）。
        // 有删除的按钮，点击只是删除本页面的数据，不删除客栈那边的数据。
        $(".card-list").on("click", "a", function (e) {
            //<!--因为事件处理函数 是绑定在cardlist上的 可能模板只能填充里面的li-->
            var obj = $(e.target).offset(),
                x = obj.left,
                y = obj.top,
                $a = $(this),
                $children = $a.children(),
                text = $a.text(),
                img = "";

            var $li = $(this).parents("li"),
                $right = $a.parents(".card-right"),
                $span = $li.find(".card-left .ell~p span");

            if ($children.length != 0) {
                img = $children.get(0).nodeName.toLowerCase()
            }
            if (text == "评价") {

                showJudge(x, y);
                // 存储a
                _public.$tempa = $a;
                _public.$tempspan = $span;
                _public.$temprid = $li.data("rid");
                _public.$temphid = $li.data("hid");
                _public.$tempsid = $li.data("sid");
                e.stopPropagation();
            } else if (text == "删除") {
                var data = {
                    id: $li.data("aid"),
                    schedule: parseInt($li.data("sid")) + 10,
                    type: "POST"
                };
                var yes = function (ok) {
                    if(!ok){
                        return;
                    }
                    common.sendPost('changeApply', data).done(function (result) {
                        if (result && result.code == 1) {
                            $li.fadeOut().empty();
                        } else {
                            jalert.error(result.info,"确定");
                        }
                    });
                }
                jalert.confirm("删除这条简历投递信息?", "确定", "取消", yes);

            } else if (text == "撤回简历") {
                var data = {
                    id: $li.data("aid"),
                    type: "POST"
                };
                var yes = function (ok) {
                    if(!ok){return;}
                    common.sendPost('cancel', data).done(function (result) {
                        if (result && result.code == 1) {
                            $li.fadeOut().empty();
                        } else {
                            jalert.error(result.info,"确定");
                        }
                    });
                }
                jalert.confirm("您要撤回这条简历投递吗？", "确定", "取消", yes);

            }else if (text == "取消出发") {

                var ifsuccess = function () {
                    $li.data("sid",2001);
                    $li.find(".card-right").html('<p><a href="javascript:void(0);" class=" js-test btn btn-warn">已取消</a></p>');
                };

                var yes = function (ok) {
                    if(!ok){return;}
                    if(ok.length == 0){
                        jalert.error("请输入您取消出发的理由");
                        return false;
                    }
                    var data = {
                        id: $li.data("aid"),
                        type: "POST",
                        schedule: 2001,
                        refuse:ok
                    };
                    common.sendPost('changeApply', data).done(function (result) {
                        if (result && result.code == 1) {
                            ifsuccess();
                        } else {
                            jalert.error(result.info);
                        }
                    });
                };
                jalert.prompt("您要取消出发吗？?请输入取消出发的理由.","","确定","取消",yes);
                //jalert.prompt("您要取消出发吗？", "确定", "取消", yes);

            } else if (text == "结束工作") {

                var data = {
                    id: $li.data("aid"),
                    schedule: 3000,
                    type: "POST"
                };
                var yes = function (ok) {
                    if(!ok){return;}
                    common.sendPost('changeApply', data).done(function (result) {
                        if (result && result.code == 1) {
                            $li.data("sid", 3000);
                            $right.html('<p><a href="javascript:void(0);" class=" js-test btn btn-warn">评价</a></p>');
                            $span.text("待评价");
                        } else {
                            jalert.error(result.info,"确定");

                        }
                    });
                };
                jalert.confirm("您已经到店并且完成工作了吗？", "完成", "未完成", yes);
            } else if (img == "img") {

                if($a.hasClass("c-a")){

                    jalert.alert("<h2>"+$a.find("img").attr("alt")+":" + $a.find("span").text() + "</h2>")
                }else{
                    common.skipUri('../../api/infoJSP?id=' + $li.data("rid"));
                }
            }
        });


        function tabRender(container, schedule, callback) {

            $('.pagination-wrapper ul').off();
            $('.pagination-wrapper ul').pcPage({
                url: router.getUrl('getdata'),
                queryParams: {schedule: schedule},
                options: {
                    rows: 10,
                    page: 1
                },
                pageChange: function (dom) {
                    $all.html('<div class="loading"><img src="../../img/loading.gif" alt="loading"/></div>')
                },
                renderData: function (data) {

                    //  console.log(data);
                    common.template('list-tpl', data, container);
                }
            })

        }


        function showJudge(x, y) {
            var $judge = $("div.judge");
            var $imgs = $judge.find("img");

            if($('body').width()>768){
                $judge.removeClass("hide").css({"top": y + 40 + "px", "left": (x - 180) + "px"});
            }else{
                var q =($('body').width()- 275)/2,
                    w = ($('body').height() - 310)/2;
                $judge.removeClass("hide").css({"top": y + 40  + "px", "left": q + "px"});

            }


            //change pictures
            var src = $imgs.attr('src').replace("fullStar", "halfStar");

            $imgs.attr("src", src);
            $imgs.addClass("halfStar");
            $imgs.removeClass("fullStar");
            $(document.body).on("click", hideJudge);

        }

        function hideJudge(e) {
            if (!$(".judge").hasClass("hide")) {
                $(".judge").addClass("hide");

                $(document.body).off("click");
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
                // var score = [0, 0, 0];
                var sum = 0;
                if($("#judge-text").val().trim()==""){
                    alert("请输入对该客栈的评价");
                    return;
                }
                $(".judge li a").each(function (index, el) {
                    sum += $(el).find(".fullStar").length;
                });

                var sendData = {
                    id: _public.$temprid,
                    comment: $("#judge-text").val(),
                    score: parseInt(sum / 3),
                    type: 1
                };

                common.sendPost('insertcomment', sendData).done(function (result) {
                    if (result && result.code == 1) {
                        var $li = _public.$tempa.parents("li");
                        var sid = parseInt($li.data("sid"));
                        var ifsuccess = function () {
                            $li.data("sid", sid + 10);
                            _public.$tempa.text("已评价");
                            _public.$tempspan.text("已评价");
                            hideJudge();
                        };
                        common.send("changeApply", {id: $li.data("aid"), schedule: sid + 10}).done(function (result) {
                            if (result && result.code == 1) {
                                ifsuccess();
                            } else {
                                jalert.error(result.info,"确定");
                            }
                        });
                    } else {
                        jalert.error(result.info,"确定");
                    }
                });

                hideJudge();
            }
        });


        //tab-group的跳转
        var tab = {
            index: 0,
            tab: ["全部", "已发送", "已通过", "待评价", "已评价"],
            id: ["all", "sent", "accepted", "completed", "finished"],
            to: function (text, $a) {

                //fix ie indexOf surpport
                if (!(Array.prototype.indexOf)) {
                    Array.prototype.indexOf = function (obj) {
                        for (var i = 0; i < this.length; i++) {
                            if (this[i] == obj) {
                                return i;
                            }
                        }
                        return -1;
                    }
                }


                //hide
                $(".tab").eq(this.index).removeClass("tab-active");
                $('#' + this.id[this.index]).hide();
                //show
                this.index = this.tab.indexOf(text);
                $(".tab").eq(this.index).addClass("tab-active");
                $('#' + this.id[this.index]).show();

                if (this.index == 0) {

                    tabRender($("#all"), undefined);

                } else if (this.index == 1) {

                    tabRender($("#sent"), 1);

                } else if (this.index == 2) {

                    tabRender($("#accepted"), 2);

                } else if (this.index == 3) {

                    tabRender($("#completed"), 3);

                } else if (this.index == 4) {

                    tabRender($("#finished"), 4);

                }


            },
            click: function (el, $a) {
                this.to(el.text.replace(/[+]?\d+/, ""), $a);
            }
        };
        $(".tab-group").on("click", "a", function () {
            tab.click($(this).get(0), $(this));
        });

        //更换头像
        $("#portrait").change(function () {
            var formdata = new FormData(),
                file = $(this).get(0).files[0],
                $this = $(this);

            formdata.append("touxiang",file.name);
            formdata.append("file",file)
            var data = {
                url:router.getUrl("insertHead"),
                type: "POST",
                data: formdata,
                async: true, //异步
                processData: false, //很重要，告诉jquery不要对form进行处理
                contentType: false, //很重要，指定为false才能形成正确的Content-Type
                success: function(result){
                    if(result &&result.code ==1){
                      common.skipUri(router.getUrl("memberJSP"));

                    }else {
                        jalert.error(result.info,"确定");
                    }

                }
            };
            $.ajax(data);

        });
        $("#js-changeImg").click(function () {
            $(this).prev().val("").click();
        })



        //以下是采用uploader
        //var option = {
        //    url: 'insertHead',
        //    nameUrl: 'getcomfirm',
        //    param: {
        //        /*realname: $('#p-name').val(),
        //         idcard_num: $('#p-idcard').val()*/
        //    }
        //};
        //var uploader1 = upload.getUploader();

        //uploader1.init({
        //    btns: ['js-changeImg'],
        //    done: function () {
        //        common.skipUri(router.getUrl("memberJSP"));
        //    },
        //    progress: function () {
        //    },
        //    error: function () {
        //    },
        //    add: function (up, files) {
        //
        //        getSign('insertHead', $.extend(option.param, {
        //
        //            touxiang: files[0].name,
        //            // realname: $('#p-name').val(),
        //            // idcard_num: $('#p-idcard').val()
        //        })).done(function (result) {
        //            // console.log(files[0].name);
        //            //console.log(JSON.stringify(result));
        //            uploader1.send(result);
        //        })
        //    }
        //});

        //// 得到签名
        //function getSign(url, params) {
        //
        //    return common.send(url, params)
        //}
        //
        //// 得到名字
        //function getName(uri, bossId) {
        //    if (bossId) return common.send(url, {hotelId: bossId});
        //    return common.send(uri, {})
        //}

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

        //editor
        //需要操作的地方就在每个editor的PostPostPost和cancel函数里面
        profile_editor(); //执行函数体
        function profile_editor() {
            var editor = {
                dom: $("#form-profile"),//暂存的dom
                edit_btn: $("#profile-edit-btn"),//编辑按钮
                save_btn: $("#profile-save-btn"),//保存按钮
                cancel_btn: $("#profile-cancel-btn"),//取消按钮
                edit: edit,//编辑方法
                save: save,//保存方法
                cancel: cancel,//取消方法
                get_data: get_data,//取得编辑里的数据
                reset: reset //删除事件 恢复最初的状态
            };
            var tag = {
                new_btn: $("#new-tag-btn"),//新增按钮
                new_tag_input: $("#new-tag"),//标签输入框
                on: function () {//初始绑定事件
                    this.new_btn = $("#new-tag-btn");
                    this.new_tag_input = $("#new-tag");
                    this.new_tag_input.show();
                    this.new_btn.removeClass("hide");

                    //添加已有的标签的点击事件;
                    $("#js-tag-dest").on("click", ".t-del", function () {

                        $(this).fadeOut();//删除标签隐藏
                        $("#js-tag-pool").append($(this).parent().remove());//添加到目标区域

                    });

                    $("#js-tag-pool").on("click", ".t", function () {
                        $(this).next().fadeIn();//删除标签显示
                        $("#js-tag-dest").append($(this).parent().remove());
                    });

                    $("#js-tag-dest .t-del").fadeIn();

                    tag.new_tag_input.fadeIn();

                    tag.new_btn.click(function () {
                        tag.new_tag()
                    });

                    this.new_tag_input.keydown(function (e) {
                        if (e.keyCode == 13) {
                            tag.new_tag();
                        }
                    });

                    var $dest_t = $("#js-tag-dest .t"),
                        $pool_t = $("#js-tag-pool .t");

                    $dest_t.each(function (index1, el1) {
                        $pool_t.each(function (index2, el2) {
                            if ($(el1).text() == $(el2).text()) {
                                $(el2).parent().empty();
                            }
                        })
                    });

                    $(".tag-pane").slideDown();
                },
                off: function () {

                },
                new_tag: function () {
                    var name = this.new_tag_input.val(),
                        a = document.createElement("a"),
                        li = document.createElement("li"),
                        span = document.createElement("span")


                    if (name.trim() == "") return;
                    this.new_tag_input.val("");
                    var namespace = ["tag-theme", "tag-pink", "tag-yellow", "tag-red", "tag-green"];
                    var len = namespace.length;
                    var random = Math.floor(Math.random() * len);
                    //随机分配tag名称

                    a.className = "t " + namespace[random];
                    a.innerHTML = name;
                    li.appendChild(a);

                    span.className = "t-del";
                    span.innerHTML = "x";
                    li.appendChild(span);


                    $("#js-tag-dest").append(li);


                    tag.on();
                },
                get_tags: function () {
                    var $alist = $("#js-tag-dest li>a");
                    var obj = [];
                    $alist.each(function (index, el) {
                        // obj.class.push(el.className);
                        obj.push(el.innerHTML);
                    });
                    return obj;
                }
            };
            editor.reset(); //初始化
            function reset() {
                editor.edit_btn.removeClass("disabled");
                editor.edit_btn.one("click", function () {
                    editor.edit();
                });
                tag.off();
                $(".profile-option").slideUp();
                tag.new_btn.addClass("hide").off();
                $(".profile-edit .edit-display .e-s").addClass("disabled");
                $(".profile-option").slideUp();
                tag.new_tag_input.hide();
                editor.save_btn.off();
                editor.cancel_btn.off();
            }

            function edit() {
                //保存副本
                this.dom = $("#form-profile").clone(true);
                //设置显示
                this.edit_btn.addClass("disabled");
                $(".profile-edit .e-s").removeClass("disabled");
                $(".profile-option").slideDown();
                editor.save_btn.on("click", function () {
                    editor.save();
                });
                editor.cancel_btn.on("click", function () {
                    editor.cancel();
                });

                $(".woman").show();

                $(".man").show();
                //添加标签有关的事件
                tag.on();

                $("#show-slogan-p").remove();
                $("#js-sign-p").fadeIn();
            }

            function save() {

                    //todo check

                    if($("#nickname-input").val().trim() == ""){
                        jalert.alert("请输入您的昵称.","知道");
                        return false;
                    }





                var that = this;
                var data = this.get_data();
                common.sendPost('insertdata', data).done(function (result) {
                    if (result && result.code == 1) {
                        $(".labels li>a[class$='-b']").parent().empty();
                        $(".profile-edit .e-s").addClass("disabled");
                        that.edit_btn.removeClass("disabled");
                        editor.reset();
                        common.skipUri("../../api/memberJSP");
                    } else {
                        jalert.error("错误:" + result.info,"确定");

                    }
                });
            }

            // common.parseUrl(window.location.href).param.id
            function get_data() {
                var obj = {};
                //obj.touxiang = 12;
                obj.name = $("#nickname-input").val();
                obj.sex = $("input[name=sex]:checked").val();
                //  obj.province = $("#province").val();
                obj.sign = $("#js-sign-p").val() || "";
                obj.location = $("#province").val() + "-" + $("#city").val();
                obj.tag = tag.get_tags();

                return obj;
            }

            function cancel() {
                //再次渲染一次页面.
                $("#form-profile").slideUp().replaceWith(this.dom);

                $("#new-tag-btn").addClass("hide");
                editor.reset()
            }
        }

        //编辑简历
        resume_editor();

        function resume_editor() { //简历编辑部分
            var editor = {
                dom: $("#form-resume"),
                edit_btn: $("#resume-edit-btn"),
                save_btn: $("#resume-save-btn"),
                cancel_btn: $("#resume-cancel-btn"),
                edit: edit,
                save: save,
                cancel: cancel,
                get_data: get_data,
                reset: reset //删除事件 恢复最初的状态
            };

            editor.reset();

            function reset() {
                //init
                this.edit_btn.removeClass("disabled");
                editor.edit_btn.one("click", function () {
                    if ($(this).text() == "新建简历") {
                        $(".resume .edit-display").removeClass("hide");
                        $(this).text("编辑");
                    }
                    editor.edit()
                });
                $(".resume  .e-s").addClass("disabled");
                this.edit_btn.removeClass("disabled");
                $(".resume .btn-menu").slideUp();
                editor.save_btn.off();
                editor.cancel_btn.off();

                $("#realname,#contact,#summary").off();
            }


            function edit() {
                this.dom = $("#form-resume").clone(true);
                this.edit_btn.addClass("disabled");
                $(".resume .edit-display .e-s").removeClass("disabled");
                $(".resume .btn-menu").slideDown();

                editor.save_btn.on("click", function () {
                    editor.save();
                });

                editor.cancel_btn.on("click", function () {
                    editor.cancel();
                });

                //添加输入框如果输入为空就警告
                $("#realname,#contact,#summary").on("input", function (e) {
                    if ($(this).val() == "") {
                        $(this).next().fadeIn();
                    } else {
                        $(this).next().fadeOut();
                    }
                })

                $(".show-summary").remove();
                $("#summary").fadeIn();
            }

            function save() {


                //todo checkdata
                if($("#realname").val().trim() == ""){
                    jalert.error("请输入您的真实姓名","知道了");
                    $("#realname").next().fadeIn();
                    return false;
                }else{
                    $("#realname").next().fadeOut();
                }

                if($("#js-r-phone").val().trim() == ""){
                    jalert.error("请输入您的电话(必填)","知道了");
                    return false;
                }

                if($("#summary").val().trim() == ""){
                    jalert.error("请输入您的简历.","知道了");
                    return false;
                }

                if($("#summary").val().trim().length >999){
                    jalert.error("简历字数过长.","知道了");
                    return false;
                }




                var data = this.get_data();
                common.sendPost('insertcv', data).done(function (result) {
                    if (result && result.code == 1) {
                        editor.reset();
                        common.skipUri("../../api/memberJSP");
                    } else {
                        jalert.error(result.info,"知道了");
                    }
                });


                //console.log(data);


                editor.reset(); //重置editor的事件
            }

            function cancel() {
                $("#form-resume").replaceWith(this.dom);
                this.reset();
            }

            function get_data() {
                var obj = {},
                    sj = "",
                    wx = "",
                    qq = "";
                obj.realname = $("#realname").val();
                obj.age = $("#js-r-year").val() +"-"+ $("#js-r-month").val() +"-"+ $("#js-r-date").val();

                if ($("#js-r-phone").val().trim() != "") {
                    sj = "##sj##" + $("#js-r-phone").val().trim() + "##/sj##";
                }
                if ($("#js-r-weixin").val().trim() != "") {
                    wx = "##wx##" + $("#js-r-weixin").val().trim() + "##/wx##";
                }
                if ($("#js-r-qq").val().trim() != "") {
                    qq = "##qq##" + $("#js-r-qq").val().trim() + "##/qq##";
                }
                obj.contact = sj + wx + qq;
                obj.summary = $("#summary").val();
                return obj;
            }
        }


        //省份二级联动原生js 初始化在下面调用的initSelect("重庆市","南岸区")//若无参数就是默认的北京北京
        var list1 = [];
        var list2 = [];
        list1[list1.length] = "北京市";
        list1[list1.length] = "天津市";
        list1[list1.length] = "河北省";
        list1[list1.length] = "山西省";
        list1[list1.length] = "内蒙古";
        list1[list1.length] = "辽宁省";
        list1[list1.length] = "吉林省";
        list1[list1.length] = "黑龙江省";
        list1[list1.length] = "上海市";
        list1[list1.length] = "江苏省";
        list1[list1.length] = "浙江省";
        list1[list1.length] = "安徽省";
        list1[list1.length] = "福建省";
        list1[list1.length] = "江西省";
        list1[list1.length] = "山东省";
        list1[list1.length] = "河南省";
        list1[list1.length] = "湖北省";
        list1[list1.length] = "湖南省";
        list1[list1.length] = "广东省";
        list1[list1.length] = "广西自治区";
        list1[list1.length] = "海南省";
        list1[list1.length] = "重庆市";
        list1[list1.length] = "四川省";
        list1[list1.length] = "贵州省";
        list1[list1.length] = "云南省";
        list1[list1.length] = "西藏自治区";
        list1[list1.length] = "陕西省";
        list1[list1.length] = "甘肃省";
        list1[list1.length] = "青海省";
        list1[list1.length] = "宁夏回族自治区";
        list1[list1.length] = "新疆维吾尔自治区";
        list1[list1.length] = "香港特别行政区";
        list1[list1.length] = "澳门特别行政区";
        list1[list1.length] = "台湾省";
        list1[list1.length] = "其它";

        list2[list2.length] = ["北京", "东城区", "西城区", "崇文区", "宣武区", "朝阳区", "丰台区", "石景山区", " 海淀区（中关村）", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "密云县", "延庆县", " 其他"];
        list2[list2.length] = ["和平区", "河东区", "河西区", "南开区", "红桥区", "塘沽区", "汉沽区", "大港区",
            "西青区", "津南区", "武清区", "蓟县", "宁河县", "静海县", "其他"
        ];
        list2[list2.length] = ["石家庄市", "张家口市", "承德市", "秦皇岛市", "唐山市", "廊坊市", "衡水市",
            "沧州市", "邢台市", "邯郸市", "保定市", "其他"
        ];
        list2[list2.length] = ["太原市", "朔州市", "大同市", "长治市", "晋城市", "忻州市", "晋中市", "临汾市",
            "吕梁市", "运城市", "其他"
        ];
        list2[list2.length] = ["呼和浩特市", "包头市", "赤峰市", "呼伦贝尔市", "鄂尔多斯市", "乌兰察布市",
            "巴彦淖尔市", "兴安盟", "阿拉善盟", "锡林郭勒盟", "其他"
        ];
        list2[list2.length] = ["沈阳市", "朝阳市", "阜新市", "铁岭市", "抚顺市", "丹东市", "本溪市", "辽阳市",
            "鞍山市", "大连市", "营口市", "盘锦市", "锦州市", "葫芦岛市", "其他"
        ];
        list2[list2.length] = ["长春市", "白城市", "吉林市", "四平市", "辽源市", "通化市", "白山市", "延边朝鲜族自治州", "其他"];
        list2[list2.length] = ["哈尔滨市", "七台河市", "黑河市", "大庆市", "齐齐哈尔市", "伊春市", "佳木斯市",
            "双鸭山市", "鸡西市", "大兴安岭地区(加格达奇)", "牡丹江", "鹤岗市", "绥化市　", "其他"
        ];
        list2[list2.length] = ["黄浦区", "卢湾区", "徐汇区", "长宁区", "静安区", "普陀区", "闸北区", "虹口区",
            "杨浦区", "闵行区", "宝山区", "嘉定区", "浦东新区", "金山区", "松江区", "青浦区", "南汇区", "奉贤区", "崇明县", "其他"
        ];
        list2[list2.length] = ["南京市", "徐州市", "连云港市", "宿迁市", "淮安市", "盐城市", "扬州市", "泰州市",
            "南通市", "镇江市", "常州市", "无锡市", "苏州市", "其他"
        ];
        list2[list2.length] = ["杭州市", "湖州市", "嘉兴市", "舟山市", "宁波市", "绍兴市", "衢州市", "金华市",
            "台州市", "温州市", "丽水市", "其他"
        ];
        list2[list2.length] = ["合肥市", "宿州市", "淮北市", "亳州市", "阜阳市", "蚌埠市", "淮南市", "滁州市",
            "马鞍山市", "芜湖市", "铜陵市", "安庆市", "黄山市", "六安市", "巢湖市", "池州市", "宣城市", "其他"
        ];
        list2[list2.length] = ["福州市", "南平市", "莆田市", "三明市", "泉州市", "厦门市", "漳州市", "龙岩市", "宁德市", "其他"];
        list2[list2.length] = ["南昌市", "九江市", "景德镇市", "鹰潭市", "新余市", "萍乡市", "赣州市", "上饶市",
            "抚州市", "宜春市", "吉安市", "其他"
        ];
        list2[list2.length] = ["济南市", "聊城市", "德州市", "东营市", "淄博市", "潍坊市", "烟台市", "威海市",
            "青岛市", "日照市", "临沂市", "枣庄市", "济宁市", "泰安市", "莱芜市", "滨州市", "菏泽市", "其他"
        ];
        list2[list2.length] = ["郑州市", "三门峡市", "洛阳市", "焦作市", "新乡市", "鹤壁市", "安阳市", "濮阳市",
            "开封市", "商丘市", "许昌市", "漯河市", "平顶山市", "南阳市", "信阳市", "周口市", "驻马店市", "其他"
        ];
        list2[list2.length] = ["武汉市", "十堰市", "襄樊市", "荆门市", "孝感市", "黄冈市", "鄂州市", "黄石市",
            "咸宁市", "荆州市", "宜昌市", "随州市", "恩施土家族苗族自治州", "仙桃市", "天门市", "潜江市", "神农架林区", "其他"
        ];
        list2[list2.length] = ["长沙市", "张家界市", "常德市", "益阳市", "岳阳市", "株洲市", "湘潭市", "衡阳市",
            "郴州市", "永州市", "邵阳市", "怀化市", "娄底市", "湘西土家族苗族自治州", "其他"
        ];
        list2[list2.length] = ["广州市", "清远市市", "韶关市", "河源市", "梅州市", "潮州市", "汕头市", "揭阳市",
            "汕尾市", " 惠州市", "东莞市", "深圳市", "珠海市", "中山市", "江门市", "佛山市", "肇庆市", "云浮市",
            "阳江市", "茂名市", "湛江市", " 其他"
        ];
        list2[list2.length] = ["南宁市", "桂林市", "柳州市", "梧州市", "贵港市", "玉林市", "钦州市", "北海市",
            "防城港市", "崇左市", "百色市", "河池市", "来宾市", "贺州市", "其他"
        ];
        list2[list2.length] = ["海口市", "三亚市", "其他"];
        list2[list2.length] = ["渝中区", "大渡口区", "江北区", "沙坪坝区", "九龙坡区", "南岸区", "北碚区",
            "万盛区", "双桥区", "渝北区", "巴南区", "万州区", "涪陵区", "黔江区", "长寿区", "合川市", "永川市",
            "江津市", "南川市", "綦江县", "潼南县", "铜梁县", "大足县", "璧山县", "垫江县", "武隆县", "丰都县",
            "城口县", "开县", "巫溪县", "巫山县", "奉节县", "云阳县", "忠县", "石柱土家族自治县", "彭水苗族土家族自治县",
            "酉阳土家族苗族自治县", "秀山土家族苗族自治县", "其他"
        ];
        list2[list2.length] = ["成都市", "广元市", "绵阳市", "德阳市", "南充市", "广安市", "遂宁市",
            "内江市", "乐山市", "自贡市", "泸州市", "宜宾市", "攀枝花市", "巴中市", "资阳市", "眉山市", "雅安",
            "阿坝藏族羌族自治州", "甘孜藏族自治州", "凉山彝族自治州县", "其他"
        ];
        list2[list2.length] = ["贵阳市", "六盘水市", "遵义市", "安顺市", "毕节地区", "铜仁地区",
            "黔东南苗族侗族自治州", "黔南布依族苗族自治州", "黔西南布依族苗族自治州", "其他"
        ];
        list2[list2.length] = ["昆明市", "曲靖市", "玉溪市", "保山市", "昭通市", "丽江市", "普洱市",
            "临沧市", "德宏傣族景颇族自治州", "怒江傈僳族自治州", "楚雄彝族自治州", "红河哈尼族彝族自治州",
            "文山壮族苗族自治州", "大理白族自治州", "迪庆藏族自治州", "西双版纳傣族自治州", "其他"
        ];
        list2[list2.length] = ["拉萨市", "那曲地区", "昌都地区", "林芝地区", "山南地区", "日喀则地区", "阿里地区", "其他"];
        list2[list2.length] = ["西安市", "延安市", "铜川市", "渭南市", "咸阳市", "宝鸡市", "汉中市", "安康市", "商洛市", "其他"];
        list2[list2.length] = ["兰州市 ", "嘉峪关市", "金昌市", "白银市", "天水市", "武威市", "酒泉市",
            "张掖市", "庆阳市", "平凉市", "定西市", "陇南市", "临夏回族自治州", "甘南藏族自治州", "其他"
        ];
        list2[list2.length] = ["西宁市", "海东地区", "海北藏族自治州", "黄南藏族自治州", "玉树藏族自治州",
            "海南藏族自治州", "果洛藏族自治州", "海西蒙古族藏族自治州", "其他"
        ];
        list2[list2.length] = ["银川市", "石嘴山市", "吴忠市", "固原市", "中卫市", "其他"];
        list2[list2.length] = ["乌鲁木齐市", "克拉玛依市", "喀什地区", "阿克苏地区", "和田地区", "吐鲁番地区",
            "哈密地区", "塔城地区", "阿勒泰地区", "克孜勒苏柯尔克孜自治州", "博尔塔拉蒙古自治州",
            "昌吉回族自治州伊犁哈萨克自治州", "巴音郭楞蒙古自治州", "河子市", "阿拉尔市", "五家渠市", "图木舒克市", "其他"
        ];
        list2[list2.length] = ["香港", "其他"];
        list2[list2.length] = ["澳门", "其他"];
        list2[list2.length] = ["台湾", "其他"];

        var ddlProvince = document.getElementById("province");
        ddlProvince.onchange = function (e) {
            selectprovince(e.target);
        };
        var ddlCity = document.getElementById("city");
        if (text_prov) {
            initSelect(text_prov, text_city);
        } else {
            initSelect();
        }

        function initSelect(pvovince, city) {
            var p_frag = document.createDocumentFragment();
            var book = 0;
            for (var i = 0, p_length = list1.length; i < p_length; i++) {
                var option = document.createElement("option");
                option.appendChild(document.createTextNode(list1[i]));
                option.value = list1[i];
                if (option.value == pvovince) {
                    option.selected = true;
                    book = i;
                }
                p_frag.appendChild(option);
            }
            ddlProvince.appendChild(p_frag);
            p_frag = null;

            var initprovince = list2[book];
            var fp_frag = document.createDocumentFragment();
            for (var j = 0, fp_length = initprovince.length; j < fp_length; j++) {
                var optioncity = document.createElement("option");
                optioncity.appendChild(document.createTextNode(initprovince[j]));
                optioncity.value = initprovince[j];
                if (optioncity.value == city) {
                    optioncity.selected = true;
                }
                fp_frag.appendChild(optioncity);
            }
            ddlCity.appendChild(fp_frag);
            fp_frag = null;

        }

        function indexof(obj, value) {

            for (var k = 0, length = obj.length; k < length; k++) {
                if (obj[k] == value)
                    return k;
            }
            return k;
        }

        function selectprovince(obj) {
            ddlCity.options.length = 0; //clear
            var index = indexof(list1, obj.value);
            var list2element = list2[index];
            var frag = document.createDocumentFragment();
            for (var i = 0, li2_length = list2element.length; i < li2_length; i++) {
                var option = document.createElement("option");
                option.appendChild(document.createTextNode(list2element[i]));
                option.value = list2element[i];
                frag.appendChild(option);
            }
            ddlCity.appendChild(frag)
        }

    }

});
