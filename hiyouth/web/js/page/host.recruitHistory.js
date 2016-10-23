/**
 * Created by xiepengcheng on 16/4/23.
 */
"use strict";
define(function(require, exports, module) {
    var _public = module.exports = {};
    var $ = require('jquery'),
        common = require('lib/common'),
        report = require('business/report'),
        jalert = require('business/jalert'),
        pagination = require('business/pagination'),
        router = require('business/router');

    var _private = {};

    _public.init = function() {
        // todo ...
        _public.dom();
    };
    _public.dom = function() {

        var urlInfo = common.parseURL(window.location.href),
            params = urlInfo.params;

        $(".box-header  .title").text("发布历史-" + decodeURI(params.name));

        // 渲染招聘历史
        $(".pagination-wrapper ul").pcPage({
            url: router.getUrl('getRecruit'),
            queryParams: {id:params.id},
            options: {
                rows: 3,
                page: 1
            },
            pageChange: function(dom) {
                $(".card-list").html('<div class="loading"><img src="../../img/loading.gif" alt="loading"/></div>')
            },
            renderData: function(data) {
                //console.log(JSON.stringify(data));
                common.template('card-list-template', data, $('.card-list'));
            }
        });



        //给cardlist添加event-listener
        $(".card-list").on("click", "a", function () {
            var $a = $(this);
            var text = $a.text();
            var rid = $a.parent().parent().parent().data("rid")
            switch (text) {
                case "进行中":
                {
                    window.open("../../api/infoJSP?id="+rid)
                    break;
                }
                case "下架招聘":
                {
                    var yes =function(ok){
                        if(!ok){return;}
                        common.send("updateRecruit",{rid:rid,cancel:-1}).done(function(result){
                            if (result && result.code === 1) {
                                $a.parent().parent().html('<p><a href="javascrip:void(0);" class="btn btn-neg">已结束</a></p>');
                            } else {
                                jalert.error(result.info)
                            }
                        });
                    };

                    jalert.confirm("确定下架招聘?","下架","取消",yes);
                    break;
                }
                case "已结束":
                {
                    window.open("../../api/infoJSP?id="+rid)
                    break;
                }
                case "修改":
                {
                    window.open("../../api/recruitJSP?id="+rid)
                    break;
                }
                //case "删除":
                //{
                //    alert("删除招聘的ajax");
                //   ;
                //    $li.remove();
                //    break;
                //}
                default:{
                    if($a.hasClass("name")){
                        //跳转到客栈详情
                        common.skipUri("profile.jsp?id="+params.id)
                    }
                }
            }
        })

        //返回顶部
        $(function () {
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
        });

    }

});