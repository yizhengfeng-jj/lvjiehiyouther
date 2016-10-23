"use strict";
define(function(require, exports, module) {
    var _public = module.exports = {};
    var $ = require('jquery'),
        common = require('lib/common'),
        pagination = require('business/pagination'),
        report = require('business/report'),
        jalert = require('business/jalert'),
        router = require('business/router');


    _public.init = function() {


        _public.dom();
         //tab初始绘制
     
       tabRender($("#job"),"getcollect");
    };
    _public.dom = function() {


        //tab-group的跳转
        var tab = {
            index: 0,
            tab: ["招聘信息", "活动信息"],
            id: ["job", "activity"],
            to: function(text) {
                //hide
                $(".tab").eq(this.index).removeClass("tab-active");
                $('#' + this.id[this.index]).hide();
                //show
                this.index = this.tab.indexOf(text);
                $(".tab").eq(this.index).addClass("tab-active");
                $('#' + this.id[this.index]).show();
            },
            click: function(el) {
                this.to(el.text.replace(/[+]?\d+/, ""));
            }
        };
        $(".tab-group").on("click", "a", function(e) {
            tab.click(e.target);
        });

        $(".tab").on("click",function(e){
            var text=$(this).text();
            var container=$("#job");
           
            if(text.indexOf("招聘信息")!=-1){
                tabRender(container,"getcollect");

            }else if(text.indexOf("活动信息")!=-1){
                container=$("#activity");
                tabRender(container,"getcollect");

            }

        })
        $(".card-list").on("click", "a", function(e) {
            var text = $(e.target).text();
            var that=$(this);
            if (text == "查看详情") {
                var rid = that.parents("li").data("rid");
                window.open("../../api/infoJSP?id="+rid);

            } else if (text == "取消收藏") {
                //alert("取消收藏");

                var yes = function (ok){
                    if(!ok){return;}

                    var data = { id: that.parents("li").data("rid") };

                    common.send("cancelcollect", data).done(function(result) {
                      
                        if (result && result.code == 1) {
                        
                            var $li = that.parents("li");
                            $li.hide();
                        } else {
                            jalert.error(result.info,"确定");

                        }

                    });

                };
                jalert.confirm("取消收藏?","确定","继续收藏",yes)



                //$li.data("index") 获取li上的data index(如果有的话)
            } else {
                var img = "";
                var $children = $(this).children();
                if ($children.length != 0) {
                    img = $children.get(0).nodeName.toLowerCase();
                    if (img == "img") {
                        //点击的是商家头像跳转到[商家详情]

                    }
                }
            }
        });


        //返回顶部
        $(function() {
            $(window).scroll(function() {
                if ($(document).scrollTop() > 200) {
                    $(".toolbar").fadeIn();
                } else {
                    $(".toolbar").fadeOut();
                }
            });

            $("#scrollTop").click(function() {
                $('body,html').animate({
                    scrollTop: 0
                }, 500);
                return false;
            });
        });


    };

    function tabRender(container,url) {
        var $all = container;
        $('.pagination-wrapper ul').pcPage({
            url: router.getUrl(url),
            queryParams: {},
            options: {
                rows: 5,
                page: 1
            },
            pageChange: function(dom) {
                $all.html('<div class="loading"><img src="../../img/loading.gif" alt="loading"/></div>')
            },
            renderData: function(data) {
                
                if (data.data.length > 0) {
                    common.template('favorite-tpl', data, $all);
                } else {
                    $all.html("");
                }

            }
        })

    }

});
