"use strict";
define(function(require, exports, module) {
    var _public = module.exports = {};
    var $ = require('jquery'),
        common = require('lib/common'),
        template = require('lib/template'),
        report = require('business/report'),
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
        //common.send("modlogin",{}).done(function (file) {
        //    $("body").append(file);
        //});

    }

    _public.init = function() {
        _public.dom();
    };
});