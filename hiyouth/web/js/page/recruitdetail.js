"use strict";
define(function (require, exports, module) {
    var _public = module.exports = {};
    var $ = require('jquery'),
        common = require('lib/common'),
        report = require('business/report'),
        pagination = require('business/pagination'),
        upload = require('business/upload'),
        router = require('business/router'),
        jalert = require("business/jalert"),
        datepicker = require("business/datepicker");
    var _private = {};
    //报名


    var addZore = function (num) {
        if(num <= 9) return "0"+num;
        else return num;
    };
    _private.insertapply = function (params) {
        common.send('insertapply', params).done(function (result) {

            if (result && result.code === 1) {
                 jalert.alert('<h2 class="text-theme">可爱的柚宝，您已经成功报名啦~！</h2>请联系老板或者等老板来联系你哦~~\n',"好的",null);
                $("#popup_message").append($("#share-hide").clone(true).show());
                $(".arrive-pop").hide();
                _public.pop.hide();
            }else {
                jalert.error(result.info);
            }
        }).error(function (r) {
            jalert.error("发送失败!请检查网络或者联系我们帮您解决.");
            console.log(r);
        });
    };
    //我要提问
    _private.insertcomment = function (params) {
        common.send('insertcomment', params).done(function (result) {
            if (result && result.code === 1) {
                $("#ask-area").parent().slideUp();
                $("#ask-area").val("");

                //todo 添加问题的id
                var html = '<h3 class="question" data-cid="'+ result.data.cid + '" data-aid="'+ result.data.aid + '">' + params.comment + '<span class="time">' + common.getDateFormat() + '</span><a href="javascript:void(0);" class="fr replyBtn">回答问题</a></h3>'
                $("#answer").find("article").prepend(html);

            } else {
                jalert.error(result.info);
            }
        });
    };
    //回答问题
    _private.insertanswer = function (params, cb) {
        common.send('insertanswer', params).done(function (result) {
            if (result && result.code === 1) {

                var html = '<div class="words">'
                    + '<div class="left">'
                    + '<a href="javascript:void(0);" title="点击进入详情">'
                    + '<img class="portrait-72" src="'
                    +   result.img
                    + '" alt="logo-name">'
                    + '</a>'
                    + '<a href="javascript:void(0);" title="点击进入详情" data-aid="'
                    +result.aid
                    +'" data-cid="'
                    +result.cid
                    +'" class="name">'
                    + result.name
                    + '</a>'
                    + '<a href="javascript:void(0);" title="点击进入详情" class="prop">'
                    + (result.type == 'member'?"义工":"老板")
                    + '</a>'
                    + (result.vercard == 0?'<span><img src="../img/icons/idcardCiGray.png" alt="身份认证" title="身份未认证"></span>':'<span><img src="../img/icons/idcardCi.png" alt="身份认证" title="身份已认证"></span>')
                    + '</div>'
                    + '<div class="right">'
                    + '<p class="right-content">'
                    + params.answer
                    + '</p>'
                    + '<p class="time">'
                    + common.getDateFormat()
                    + '</p>'
                    + '<button type="button" class="replyBtn">回复</button>'
                    + '</div>'
                    + '</div>';

                cb(html);
            } else {
                jalert.error(result.info);
            }
        });
    };

    _public.scroll = [0, 0, 0, 0, 0];//设置全局变量 用于访问
    _public.culScroll = function (scroll) {
        var $fixedbar = $("#container");
        var $time = $("#time");
        var $review = $("#review");
        var $answer = $("#answer");
        var $gallery = $("#gallery");
        var $map = $("#map");
        var $record = $("#record");


        scroll[0] = $fixedbar.offset().top
        scroll[1] = $time.offset().top;
        scroll[2] = $review.offset().top;
        scroll[3] = $answer.offset().top;
        scroll[4] = $gallery.offset().top;
        scroll[5] = $map.offset().top;
        scroll[6] = $record.offset().top;
    }
    _public.init = function () {
        $(".lzimg").each(function () {
            var $this = $(this),
                url = $this.data('src');

            var img = new Image();
            img.src = url;
            img.onload = function () {

                $this.get(0).onload = function () {
                    _public.culScroll(_public.scroll);
                }
                $this.attr('src', img.src);
                $this.attr('alt', $this.data('alt'));

            }
        });
        var $reviewArticle = $('#review-article'),
            urlInfo = common.parseURL(window.location.href),
            params = urlInfo.params;

        var $answer = $('#answer'), // 问答
            $record = $('#record'), // 记录
            $review = $('#review'); // 评论
        //加入模板
        common.send("recruitedetail",{}).done(function (file) {
           $("body").append(file);

        // 渲染评论
        $review.find('.pagination-wrapper ul').pcPage({
            url: router.getUrl('getRComment'),
            queryParams: {id: params.id},
            options: {
                rows: 3,
                page: 1
            },
            pageChange: function (dom) {
                $review.find('.inner-content').html('<div class="loading"><img src="../img/loading.gif" alt="loading"/></div>')
            },
            renderData: function (data) {
                var html = '';
                for (var i = 0; i < data.score; i++) {
                    html += '<img src="../img/icons/fullScore.png" alt="评分">'
                }
                $review.find('h2').html("整体评分:" + html);

                common.template('tag-comment', data, $review.find('.inner-content'));

                _public.culScroll(_public.scroll);//重新计算scroll
            }
        });

        // 渲染问答
        $answer.find('.pagination-wrapper ul').pcPage({
            url: router.getUrl('getRQuestion'),
            queryParams: {id: params.id},
            options: {
                rows: 3,
                page: 1
            },
            pageChange: function (dom) {
                $answer.find('.inner-content').html('<div class="loading"><img src="../img/loading.gif" alt="loading"/></div>')
            },
            renderData: function (data) {
                common.template('tag-question', data, $answer.find('.inner-content'));
                $answer.find('.answer-container').each(function() {
                    var $this = $(this),
                        cid = $this.data('cid');

                    $.get('/hello/api/getAnswer', {
                        cid: cid,
                        page: 1,
                        rows: 3
                    }).done(function(res) {
                        common.template('tag-answer', res, $this);
                        _public.culScroll(_public.scroll);//重新计算scroll
                    })

                })

            }
        });

            $answer.on('click', '.load-more', function() {
                var $this = $(this),
                    page = $this.data('page'),
                    cid = $this.data('cid');

                $.get('/hello/api/getAnswer', {
                    cid: cid,
                    page: page,
                    rows: 3
                }).done(function(res) {
                    if(res.data && res.data.length > 0) {
                        $this.data('page', page+1);
                        //console.log($this.parents('.question-container').find('.answer-container'))
                        common.template('tag-answer', res, $this.parents('.question-container').find('.answer-container'), true);
                        _public.culScroll(_public.scroll);//重新计算scroll
                    }else{
                        $this.html('没有了')
                    }
                })
            })

        // 渲染历史
        $record.find('.pagination-wrapper ul').pcPage({
            url: router.getUrl('getInfo'),
            queryParams: {id: params.hid}, // 此处是客栈id
            options: {
                rows: 3,
                page: 1
            },
            pageChange: function (dom) {
                $answer.find('.inner-content').html('<div class="loading"><img src="../img/loading.gif" alt="loading"/></div>')
            },
            renderData: function (data) {
                common.template('tag-record', data, $record.find('.inner-content'));
                _public.culScroll(_public.scroll);

                }
            });
           });


        //收藏
        $('#collect').click(function () {
            var $this = $(this);
            if($(".header-top-right a:eq(0)").text()=="登录"){
                jalert.timeout("您未登录","确定",null,2);
                e.preventDefault();
                e.stopPropagation();
                return false;
            }


            if ($this.hasClass('collect')) {

                common.send('collect', {
                    id: params.id
                }).done(function (result) {
                    if (result && result.code == 1) {
                        jalert.timeout("收藏成功","确定",null,3);
                        $this.addClass('collected').removeClass('collect');
                    }
                    else {
                        jalert.error("收藏失败");

                    }
                })
            } else {

                common.send('cancelcollect', {
                    id: params.id
                }).done(function (result) {
                    if (result && result.code == 1) {
                        $this.addClass('collect').removeClass('collected');
                    }
                    else {
                        // 请求失败
                        ;
                    }
                })
            }
            return false
        });
        _public.dom();



        //我要提问
        $("#send-ask").click(function () {
            var text = $("#ask-area").val();
            _private.insertcomment({comment: text, id: common.parseURL(window.location.href).params.id, type: 0});

        });

        //报名
        $("#yes-join-btn").click(function () {
            //todo
            //确认报名接口

            var urlInfo = common.parseURL(window.location.href),
                params = urlInfo.params,
                time = $('#arrive-date').val();
            if (time == "") {
                jalert.error("报名不能为空");
            } else {
                _private.insertapply({id: params.id, time: time});
                //成功
            }
        })

        $(".record").on("click","a", function (e) {
            var aid = $(this).parents("tr").data("aid");
            window.open("../api/infoJSP?id="+aid);
        })
    };

    _public.dom = function () {
        var mask_func = function(){
            $(".js-map-mask,.js-map-mask2").click(function () {
                var $back = $(".js-map-mask,.js-map-mask2").remove();
                setTimeout(function(){
                    $(".map-div").append($back);
                    mask_func();
                },600000)//600000
            });
        }
    mask_func();

        $(function () {
            //我要提问按钮
            $("#add-ask-btn").click(function () {
                $(this).next().slideDown();

            });
            $("#ask-cancel").click(function () {
                $("#add-ask-btn").next().slideUp();
                $("#ask-area").val("");
            })

            $("#answer article").on("click", "button,a", function () {
                var $this = $(this),
                    text = $this.text();
                switch (text) {
                    case "回答问题":
                    {
                        var html = ' <div class="fix hide">'
                            + '<textarea name="ask"  id="ask-area" cols="30" rows="10" placeholder="请在此输入您的回答(40字左右)" ></textarea>'
                            + '<p class="fr"><a href="javascript:void(0);" class="btn btn-primary" id="send-ask">确认回答</a><a href="javascript:void(0);" class="btn btn-white" id="ask-cancel">取消回答</a></p>'
                            + '</div>';
                         $this.parent().after(html).next().slideDown();;

                        $this.addClass("disabled");
                        break;
                    }
                    case "取消回答":
                    {
                        $this.parent().parent().prev().find(".disabled").removeClass("disabled");
                        $this.parent().parent().slideUp().done().empty();
                        break;
                    }
                    case "确认回答":
                    {
                        var content = $this.parent().prev().val();
                        var aid = $this.parent().parent().prev().data("aid");
                        var cid = $this.parent().parent().prev().data("cid");
                        //todo
                        var cb = function (html) {
                          var temp =  $this.parent().parent().prev().find(".disabled").removeClass("disabled");
                            $this.parent().parent().replaceWith('<div class="answer">' + html + '</div>');
                            temp.next().slideDown();
                        };
                        _private.insertanswer({cid: cid, lid:aid, answer: content}, cb);
                        break;
                    }
                    case "回复":
                    {
                        var html = '<div class="words hide"> <div class="right"> <textarea name="replyText" rows="20" cols="85" maxlength="200" placeholder="继续追问/帮助解答  "></textarea> <p class="addition">限制200字</p> <p class="option"> <button type="button" class="replyBtn cancel">取消回复</button> <button type="button" class="replyBtn">确定回复</button> </p> </div></div>';
                        $this.addClass("disabled").parent().parent().after(html).next().slideDown();
                        break;
                    }
                    case "确定回复":
                    {
                        var content = $this.parent().parent().find("textarea").val();
                        var aid = $this.parents(".words").prev().find(".name").data("aid");
                        var cid = $this.parents(".words").prev().find(".name").data("cid");

                        var cb = function (html) {
                            var $div = $this.parent().parent().parent();
                            $div.prev().find(".disabled").removeClass("disabled");
                            $div.replaceWith(html);
                        };
                        _private.insertanswer({cid: cid, lid: aid, answer: content}, cb);
                        break;
                    }
                    case "取消回复":
                    {
                        $this.parent().parent().parent().slideUp().empty().prev().find("button").removeClass("disabled");
                        break;
                    }

                }
            })


            // 弹出框
            $('#arrive-date').DatePicker({
                mode: 'single',
                position: 'bottom',
                onBeforeShow: function (el) {
                    if ($('#arrive-date').val())
                        $('#arrive-date').DatePickerSetDate($('#arrive-date').val(), true);
                },
                onChange: function (date, el) {
                    $(el).val(date.getFullYear() + "-" + addZore(date.getMonth() + 1) + '-' + addZore(date.getDate()));
                    $(el).DatePickerHide();
                }
            });


            //popup事件绑定
            $("#join-btn").click(function () {
                if($(".header-top-right a:eq(0)").text()=="登录"){
                    jalert.timeout("您未登录","知道了",null,4);
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }

                _public.pop.show("join");
            });

            //scroll部分
            _public.culScroll(_public.scroll);
            var scroll = _public.scroll;

            $(".fixed-header").on("click", "a", function (e) {
                var arr = ["#time", "#review", "#answer", "#gallery", "#map", "#record"];
                var index = arr.indexOf(e.target.hash);
                if (index == -1) {
                    e.preventDefault();
                    return false;
                }
                //找到有的scroll
                $(".fixed-header li").removeClass("active");
                $(e.target).parent().addClass("active");
                $('body,html').animate({
                    scrollTop: scroll[index + 1] - 130
                }, 500);
                e.preventDefault();
            });

            $(window).on("scroll", function (e) {

                var st = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
                var $fixedbar = $(".fixed-header");
                if (st < scroll[0]) {
                    $fixedbar.removeClass("sticky");
                    $("section.story").css({margin:"30px 0 50px"})
                } else {
                    $fixedbar.addClass("sticky");
                    $("section.story").css({margin:"80px 0 50px"})
                }
                var $positionTop = $(this).scrollTop();


                if ($positionTop < scroll[2] - 130 && $positionTop >= scroll[1] - 130) {
                    $(".fixed-header li").removeClass("active");
                    $(".fixed-header li:eq(0)").addClass("active");
                }
                else if ($positionTop < (scroll[3] - 130) && $positionTop >= (scroll[2] - 130)) {
                    $(".fixed-header li").removeClass("active");
                    $(".fixed-header li:eq(1)").addClass("active");

                }
                else if ($positionTop < (scroll[4] - 130) && $positionTop >= (scroll[3] - 130)) {
                    $(".fixed-header li").removeClass("active");
                    $(".fixed-header li:eq(2)").addClass("active");

                }
                else if ($positionTop < (scroll[5] - 130) && $positionTop >= (scroll[4] - 130)) {
                    $(".fixed-header li").removeClass("active");
                    $(".fixed-header li:eq(3)").addClass("active");

                }
                else if ($positionTop < scroll[6] - 130 && $positionTop >= scroll[5] - 130) {
                    $(".fixed-header li").removeClass("active");
                    $(".fixed-header li:eq(4)").addClass("active");
                } else if ($positionTop >= scroll[6] - 130) {
                    $(".fixed-header li").removeClass("active");
                    $(".fixed-header li:eq(5)").addClass("active");
                }


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
        })
    };
    _public.pop = {
        el: $("#pop-box"),
        ov: $("#overlay"),
        alert: pop_info,
        ok: pop_ok,
        show: pop_show,
        hide: pop_hide
    }

    function pop_show(text) {
        this.ov.fadeIn();
        this.el.slideDown();
        if ("join" == text) {
            $(".arrive-pop").show();
            $(document.body).css({"margin-right": "17px", "overflow": "hidden"})
            $("#pop-box .icon-close").one('click', function () {
                $(".arrive-pop").hide();
                _public.pop.hide();
            });

        }
        return this;
    }

    function pop_info(text, el) {
        if (text) {
            //仅文字
            this.el.find(".pop-alert-text").text(text);
            this.el.find(".pop-alert").show();
            this.el.find(".icon-close").one('click', function () {
                this.hide();
            });
        } else {

        }
        return this;
    }

    function pop_ok(text, el) {
        if (text) {
            //仅文字
            this.el.find(".pop-ok-text").text(text);
            this.el.find(".pop-ok").show();
            this.el.find(".icon-close,.btn-primary").one('click', function () {
                this.hide();
            });
        } else {

        }
        return this;
    }

    function pop_hide() {
        this.ov.fadeOut();
        this.el.slideUp();
        $(document.body).css({"margin-right": "", "overflow": ""})
        return this;
    }


});

;