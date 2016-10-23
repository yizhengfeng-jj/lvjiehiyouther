"use strict";
define(function (require, exports, module) {
    var _private = {};
    var $ = require('jquery'),
        router = require('business/router'),
        common = require('lib/common');
    var _public = module.exports = {};


    _public.send = function(times) {
        console.log(_private.cal(times))
    };
    _private.cal = function(times) {
        if(!times.length || times.length < 2) return;
        for(var i = 1; i < times.length; i++) {
            times[i] -= times[0]
        }
        return times.slice(1).join(',')
    }


    function forLogin() {
        common.send('getUserInfo', {_t:(new Date).getTime()}).done(function(res) {
            if(res.code == 1) {

                $("#x-place-1,#btn-login").replaceWith('<a href="javascript:void(0);"  id="js-usernickname-vk" class="ell" data-type="'+res.data.t+'" title="点击前往个人中心"><img class="head-top-pic-tk" src="'+res.data.h+'" alt="头像"><span class="username-span-vk">'+res.data.n+'</span><span class="message-new-vk hide">' + res.data.pushsize +'</span></a><a href="javascript:void(0);" class="hide" style="display: none;"><span class="caret hide" ></span></a>');
                $("#x-place-2,#btn-register").replaceWith('<a href="/api/cancelLogin">注销</a>');
                $("#js-usernickname-vk").on("click",function(){
                    if($(this).data("type")==0){
                        common.skipUri(router.getUrl("memberJSP"))
                    }else if($(this).data("type")==1){
                        common.skipUri(router.getUrl("bossJSP"))
                    }
                });
                $("#js-msg-vk").click(function(){
                    if($("#js-usernickname-vk").data("type")==0){
                        common.skipUri(router.getUrl("me_message"))
                    }else if($("#js-usernickname-vk").data("type")==1){
                        common.skipUri(router.getUrl("host_message"))
                    }
                });
                if(res.data.pushsize>0){
                    if(res.data.pushsize >99 ){
                        $(".message-new-vk").text("99");
                    }
                    $(".message-new-vk").fadeIn();
                    $("#profile-news,#delegate span:eq(2)").text("+"+res.data.pushsize).fadeIn();
                }
                //switch (res.data.t) {
                //    case 111:
                //        $('.header-top-right').html('<ul><li><a href="#">'+res.data.n+'</a></li></ul>');
                //    default:
                //        $('.header-top-right').html('<ul><li><a href="#">'+res.data.n+'</a></li></ul>');
                //}
            }else{
                $("#x-place-1").replaceWith('<a href="javascript:void(0);"  id="btn-login">登录</a>');
                $("#x-place-2").replaceWith('<a href="javascript:void(0);"  id="btn-register">注册</a>');

                $("#btn-login").off().click(function(){
                    if($(".the-box-wrapper").length==0){
                        $("body").append('<div class="overlay-login"></div><div class="the-box-wrapper"></div>')
                    }
                    if($(".login-container").length ==0){
                        common.send("mod_login_v2").done(function (html) {
                            $(".the-box-wrapper").append(html);
                        }).error(function (result) {
                           alert("请求错误\n状态码:"+result.status +"\n状态说明:"+ result.statusText||"无任何返回值");
                        });
                    }else{
                        var top = "100px";
                        if($("body").width()<768){
                            top = "20px";
                        }
                        $(".register-container").css({display:"none"});
                        $(".login-container").show().animate({"margin-top":top,display:"block"},600);
                        $(".overlay-login").fadeIn(600);
                        $(".login-container").find(".step-1").slideDown();
                    }
                }) ;
                $("#btn-register").off().click(function(){
                    if($(".the-box-wrapper").length==0){
                        $("body").append('<div class="overlay-login"></div><div class="the-box-wrapper"></div>')
                    }
                    if($(".register-container").length ==0){
                        common.send("mod_register_v2").done(function (html) {
                            $(".the-box-wrapper").append(html);
                        }).error(function (result) {
                            alert("请求错误\n状态码:"+result.status +"\n状态说明:"+ result.statusText||"无任何返回值");
                        });
                    }else{

                        var top = "100px";
                        if($("body").width()<768){
                            top = "20px";
                        }
                        $(".login-container").css({display:"none"});
                        $(".register-container").show().animate({"margin-top":top,display:"block"},600);
                        $(".overlay-login").eq(0).fadeIn(600);
                        $(".register-container").find(".step-1").show();
                    }
                })

            }
        })
    }

    forLogin();
    _public.forlogin = forLogin;
})