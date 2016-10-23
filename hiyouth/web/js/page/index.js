"use strict";
define(function (require, exports, module) {
    var _public = module.exports = {};
    var $ = require('jquery'),
        common = require('lib/common'),
        report = require('business/report'),
        pagination = require('business/pagination'),
        router = require('business/router'),
        datepicker = require("business/datepicker"),
        jalert = require("business/jalert");

    var _private = {featureSize: 0};

    _public.init = function () {

        $(".lyimg").each(function () {
            var $this = $(this),
                url = $this.data('url');

            var img = new Image();
            img.src = url;
            img.onload = function () {
                $this.attr('src', img.src);
            }
        })

        $(".winner-201606").click(function () {
            window.open("activity/graduation.html")
        });

        var self = this;
        var page = 0,
            pagesize = 12,
            id, startdate, enddate;
        var pageComment = 0;

        var $allArea = $('#all-area');

        var $hot = $('.hot-area');
        $hot.on('click', 'a', function () {

            var $this = $(this),
                active = $this.hasClass("active"),
             name = $this.text();//this id must be  a super scope id
            //判断是否是激活状态 ?全部地区
            if (active || $this.text() == "全部") {
                //取消所有的激活状态
                $hot.find("a.active").removeClass("active");

                _private.getAllHotel({
                    page: page,
                    pagesize: pagesize
                });
                $allArea.html('全部招聘');
                $("#place").val("") ;
                $("#year").val("");
                $("#month").val("");
                $('#feature').slideDown().prev().slideDown();
            } else {
                //loadRecommend(pageComment = 0, ++pageComment);
                // 加载全部地址
                _private.getAllHotel({
                    page: page,
                    pagesize: pagesize,
                    name:name
                });

                $allArea.html('全部招聘-' + $this.text()+'<span style="font-size:12px;">(点击热门地区的全部清除筛选)</span>');


                //去除其他标签状态
                $hot.find("a.active").removeClass("active");
                //当前a标签添加激活状态
                $this.addClass("active");
                $('#feature').slideUp().prev().slideUp();
            }
        });


        //判断筛选框是否有输入
        $('#place').on("change", function () {
           checksearch();
        });
        $('#place').keydown(function (e) {
            if (e.keyCode == 13) {
                $('.search-btn').click();
            }
        });
        function checksearch (){
            if ($("#place").val() != "" || $("#year").val() != "" || $("#month").val() != "") {
                $(".search-btn").addClass("active");
            } else {
                $(".search-btn").removeClass("active");
            }
        }


        $('.search-btn').click(function () {
            if ($(".search-btn").hasClass("active")) {
                $('#feature').slideUp().prev().slideUp();
                _private.getAllHotel({
                    page: page,
                    pagesize: pagesize,
                    startdate: $('#year').val() || undefined,
                    enddate: $('#month').val() || undefined,
                    name: $('#place').val() || undefined
                });
                $allArea.html('全部地区-' + $('#place').val() +'<span style="font-size:12px;">(点击热门地区的全部清除筛选)</span>');
                $('.hot-area a').each(function(){
                    if($(this).text()==$('#place').val())  {
                           $(this).addClass("active");
                    }else {
                            $(this).removeClass("active");
                    }
                });

            } else {
                //jAlert('请输入筛选条件!', 'Okay dude', function(){
                //    // ...
                //});
                jalert.error("请输入筛选条件!","知道了",null);
            }

        });
            var addZore = function (num) {
                    if(num <= 9) return "0"+num;
                    else return num;
            };
        $('#year').DatePicker({
            mode: 'single',
            position: 'bottom',
            onBeforeShow: function (el) {
                if ($('#year').val())
                    $('#year').DatePickerSetDate($('#year').val(), true);
            },
            onChange: function (date, el) {
                $(el).val(date.getFullYear() + "-" + addZore((date.getMonth() + 1)) + '-' + addZore(date.getDate()));
                $(el).DatePickerHide();
                checksearch();
            }
        });
        $('#month').DatePicker({
            mode: 'single',
            position: 'bottom',
            onBeforeShow: function (el) {
                if ($('#month').val())
                    $('#month').DatePickerSetDate($('#month').val(), true);
            },
            onChange: function (date, el) {
                $(el).val(date.getFullYear() + "-" + addZore((date.getMonth() + 1)) + '-' + addZore(date.getDate()));
                $(el).DatePickerHide();
                checksearch();
            }
        });




        //换一换
        $('#another').on('click', function () {
            if (_private.featureSize == 0) {
                loadRecommend(++pageComment);
            } else {
                loadRecommend(((++pageComment) % Math.ceil(_private.featureSize / 6)) + 1);
            }
        });

        function loadRecommend(page) {
            $('#feature').html('<div class="loading"><img src="../img/loading.gif" alt="loading"/></div>');
            _private.getHotel({
                page: page,
                rows: 6
            }, function (data) {
                common.template('tpl-hotel-item', data, '#feature');
            })
        }

        loadRecommend(++pageComment)

        _private.getAllHotel({
            page: page,
            pagesize: pagesize,
            id: id,
            startdate: startdate,
            enddate: enddate
        });
        //_private.getTags(function (data) {
        //    common.template('tpl-tags', data, $hot.find('.two-right ul'));
        //});

        _public.dom()
    };

    _public.dom = function () {
        //当前轮播索引 为 每隔一段时间增一 .为负数是为了最开始延时,
        var CurImgCount = -2;

        function lunbo(left) {
            var $Bannerlist = $(".banner-img .slide-list"); //图片的ul
            var $slognlist = $(".slide-wrap .slide-list"); //标语的ul
            var $img = $(".banner-img .slide-list li"); //图片的li,
            var $text = $(".slide-wrap .slide-list li"); //文字的li
            var length = $img.length;
            var left = (left == undefined ? true : left); //如果left传入参数,默认往左滑动
            var direction = (left ? "left" : "right") + "-" + CurImgCount;
            if (left) {
                //当往左为真时 往左滑动
                if (CurImgCount == (length - 1)) {
                    CurImgCount = 0; //到达最后一个 索引赋值为0
                } else if (CurImgCount < 0) {
                    CurImgCount++; //延迟时的增1 不继续执行
                    return;
                } else {
                    CurImgCount++; //可以继续往后轮播
                }
                ;
            } else {
                //不往左滑动 往右滑动
                if (CurImgCount == 0) {
                    CurImgCount = length - 1;
                } else if (CurImgCount < 0) {
                    CurImgCount++;
                    return;
                } else {
                    CurImgCount--;
                }
                ;
            }
            var animate_name = direction + "-" + CurImgCount;

            $Bannerlist.css({
                "-webkit-animation-name": animate_name,
                "animation-name": animate_name
            })

            $slognlist.css({
                "-webkit-animation-name": animate_name,
                "animation-name": animate_name
            })
        }

        var SlideManager = {
            imgLunbo: {}, //用于保存轮播intenal函数的引用
            setImgLunbo: function () {
                return setInterval(lunbo, 4000);
            },
            cancelImgLunbo: function (obj) {
                clearInterval(obj);
                return {};
            }
        };
        SlideManager.imgLunbo = SlideManager.setImgLunbo();
        var $banner = $(".banner");
        var $archs = $(".slide-wrap>a");
        $archs.eq(0).on("click", function (e) {
            if (CurImgCount < 0) {
                CurImgCount = 0;
            }
            lunbo(false);
        })
        $archs.eq(1).on("click", function (e) {
            if (CurImgCount < 0) {
                CurImgCount = 0;
            }
            lunbo(true);
        });
        //鼠标进入banner
        $banner.mouseenter(function () {
            //轮播
            SlideManager.imgLunbo = SlideManager.cancelImgLunbo(SlideManager.imgLunbo); //返回空对象 的引用
            $archs.fadeIn();
        });
        //鼠标离开banner
        $banner.mouseleave(function () {
            SlideManager.imgLunbo = SlideManager.setImgLunbo();
            $archs.fadeOut();
        });

        //判断筛选框是否有输入
        $(".shaixuan input").on("input", function () {
            if ($("#place").val() != "" || $("#year").val() != "" || $("#month").val() != "") {
                $(".search-btn").addClass("active");
            } else {
                $(".search-btn").removeClass("active");
            }

        });

        $(".section").on("click", ".pocker,a.ell", function (e) {
            var $this = $(this);
            if ($this.hasClass("ell")) {
                window.open($this.attr("href"));
                e.stopPropagation();
                return false;
            } else {
                var url = $this.find(".ell").attr("href");
                window.open(url);
            }
        });
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


    };

    _private.getAllHotel = function (params) {
        var $all = $('#all');//.html('<div class="loading"><img src="../img/loading.gif" alt="loading"/></div>')
        $('.pagination').off();
        $('.pagination').pcPage({
            url: router.getUrl('getAllHoste'), // 请求路径
            queryParams: { // 每次请求都会带的参数
                id: params.id,
                name: params.name,
                startdate: params.startdate,
                enddate: params.enddate
            },
            options: { // rows = 3, page = 1
                rows: params.pagesize,
                page: params.page
            },
            pageChange: function (dom) { // 点击页面按钮的时候触发的事件
                $all.html('<div class="loading"><img src="../img/loading.gif" alt="loading"/></div>')
            },
            renderData: function (data) { // 数据回调 第三个参数 可以为 选择器 或 jq对象， 第四个参数 isAppend
                common.template('tpl-hotel-item', data, $all);
            }
        })
    };

    _private.getHotel = function (params, cb) {
        common.send('getHotel', params).done(function (result) {
            if (result && result.code === 1) {
                cb(result);
                if (result.size) {
                    _private.featureSize = result.size;
                }

            } else {
            }
        });
    };

    //_private.getTags = function (cb) {
    //    common.send('getTag', {}).done(function (result) {
    //        if (result && result.code === 1) {
    //            cb(result)
    //        } else {
    //        }
    //    });
    //}
});

