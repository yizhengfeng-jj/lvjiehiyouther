"use strict";
define(function(require, exports, module) {
    var _public = module.exports = {};
    var $ = require('jquery'),
        common = require('lib/common'),
        template = require('lib/template'),
        report = require('business/report'),
        jalert = require('business/jalert'),
        router = require('business/router');



    _public.dom = function() {


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
        $("#js-test-alert").click(function () {
            var ok_callback = function () {
                
            }
            var func = function(something){
                alert(something);
                var prop = function (something) {
                    alert(something);
                    jalert.prompt("喝咯", "dd", "ok", "取消",function(es){alert(es)})
                };
                jalert.confirm("确认!!<h2>sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf</h2>","<span style='color:#b73310;'>ok</span>","取消",prop,true);
                //  $.alerts.confirm(message, ok, cancel, callback);
            };
            //jalert.alert("登录成功!","","确定","取消",func);
            jalert.confirm("您是否批量拒绝用户的申请？<br><div style='font-size: 16px;line-height: 20px;text-align: left;'>若要拒绝,请选择拒绝理由(可多选):" +
                "<br><input type='checkbox' id='js-p-reason1'><span>\"1.义工已经招满啦，不好意思哦，可以去别家店看看哈~\"</span>" +
                "<br><input type='checkbox' id='js-p-reason2'><span>\"2.你不太符合我家小店的要求哦，可以去别家店看看哈~\"</span>" +
                "<br>若非以上理由,请输入其他原因:" +
                "<br><textarea id='js-p-reason3' style='width:100%;box-sizing: border-box;'></textarea></div>","确定","取消",ok_callback);


            var reason = {};
            $("#js-p-reason1").change(function () {
                if($(this).prop("checked")){
                    reason.r1 = $(this).text();
                }else{
                    reason.r1 = '';

                }
            });
            $("#js-p-reason2").change(function () {
                if($(this).prop("checked")){
                    reason.r2 = $(this).text();
                }else{
                    reason.r2 = '';

                }
            });
            $("#js-p-reason3").blur(function () {
                    reason.r3 = $(this).text();
            });

            //jalert.timeout("你好","ok",null,10)
        });
        

    }

    _public.init = function() {
        _public.dom();
    };
});