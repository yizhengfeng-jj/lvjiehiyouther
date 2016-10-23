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


        function addZero(val) {
            val = parseInt(val);
            return val > 9 ? val : ("0" + val);
        }

        var urlInfo = common.parseURL(window.location.href),
            params = urlInfo.params,
            aside = {};

        $(".box-header .title").text("新增招聘-" + decodeURI(params.name));

        if (urlInfo.file.substr(-3, 3) == "jsp") {
            //在更新页面
            aside.update = true;
            aside.rid = params.id;
        } else {
            //新建招聘
            aside.update = false;
            aside.hid = params.id;
        }

        $("#task,#rsynopsis,#competence").bind({input:function () {
            if($(this).val().length == 2000){
                jalert.error("达到2000字!不能继续编辑!");
            }else{
                if($(this).parent().find("span").length ==0 ){
                    $(this).parent().append("<span style='position: absolute;bottom: 5px;left: 20px;color: #d3d3d3;'>剩余" + (1999-$(this).val().length)+"字可输入")
                }else{
                    $(this).parent().find("span").text("剩余" + (1999-$(this).val().length)+"字可输入")
                }
            }
        },
        blur: function () {
            $(this).parent().find("span").remove();
        }})

        // 点击插入招聘信息
        $("#submit-publish").on("click", function () {
            var data = {
                name: $.trim($("#title").val()),
                competence: $.trim($("#competence").val()),
                task: $.trim($("#task").val()),
                rsynopsis: $.trim($("#rsynopsis").val()),
                rsctime: $("#start-year").val() + "-" + addZero($("#start-month").val()) + '-01',
                rmonth: $("#end-year").val() + "-" + addZero($("#end-month").val()) + '-01',
                number: $("#number").val()
            };

            if(data.name == ""){
                jalert.error("请输入招聘的标题");
                return false;
            }
            if(data.rsctime > data.rmonth){
                jalert.error("请选择正确的到岗时间");
                return false;
            }
            if(data.competence == ""){
                jalert.error("请输入义工要求");
                return false;
            }
             if(data.task == ""){
                 jalert.error("请输入工作内容");
                 return false;
             }



            if (aside.update) {
                //更新招聘
                data.rid = aside.rid;
                data.cancel = 0;
                common.sendPost('updateRecruit', data).then(function (result) {
                    if (result && result.code === 1) {
                        jalert.alert(result.info)
                        common.skipUri("../../api/bossJSP");
                    }else{
                        jalert.error(result.info);
                    }
                });
            }else {
                //新增招聘
                data.id = aside.hid;
                common.sendPost('insertRecruit', data).then(function (result) {

                    if (result && result.code === 1) {
                        jalert.alert(result.info);
                        common.skipUri("../../api/infoJSP?id="+result.rid);
                    }else{
                        jalert.error(result.info);
                    }
                });
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

    }

});