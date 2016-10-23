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
        router = require('business/router');

    var _private = {};

    _public.init = function() {
        // todo ...
        _public.dom();

    };

    //end
    _public.dom = function() {

        $("#js-step-1").click(function () {
            _public.username = $("#js-username").val().trim();

            _public.usertype = $("#js-usertype").val();

            _public.option =/^1\d{10}$/.test(_public.username)?"mobile":"email";

            common.sendPost("findpwd",{option:_public.option,account:_public.username,type:_public.usertype}).done(function(result){
                    if(result && result.code == 1){
                        $(".js-init").fadeOut();
                        $(".next_step").fadeIn();
                    }else{
                        jalert.error(result.info);
                    }
            })


        });

        $("#js-last-step").click(function () {
            $(".js-init").fadeIn();
            $(".next_step").fadeOut();
        });
        $("#js-js-resend").click(function () {
            var $this = $(this),
                timer,
                count=59;
            $("#js-step-1").trigger("click");
            $this.text("60秒后可再次点击");
            $this.addClass("disabled")
            timer = setInterval(function () {
                if(count<0){
                    clearInterval(timer);
                    $this.removeClass("disabled")

                    $this.text("再次发送");
                }else{
                    $this.text(count+"秒后可再次点击");
                    --count;
                }
            },1000)

        });
        
        $("#js-new-password2,#js-new-password").blur(function () {
            var val1 = $("#js-new-password").val(),
            val2 = $("#js-new-password2").val();
            if(val1 =="" ||val2 == ""){
                return ;
            }
            if(val1 != val2){
                $("#js-new-password2").next().text("两次密码不一致");
            }else{
                $("#js-new-password2").next().text("");
            }

        });

        $("#js-step-2").click(function () {
            var $verid = $("#js-verid"),
                $newpassword = $("#js-new-password");
            if($verid.val().trim().length!=4){
                jalert.error("请输入验证码!");
                return false;
            }
            if($newpassword.val().trim().length <6 || $newpassword.val().trim().length >18){
                jalert.error("请输入正确的密码");
                return false;
            }
            if( $("#js-new-password").val() !=  $("#js-new-password2").val() ){
                jalert.error("两次密码不一致!");
                return false;
            }




            common.sendPost("findpwd",{option:_public.option,verid:$verid.val().trim(),newpwd:$newpassword.val().trim()}).done(function(result){
                if(result && result.code == 1){
                    jalert.alert(result.info+"\n即将前往首页","确定",function(){
                        window.location.href = "index.html";
                    })
                }else{
                    jalert.error(result.info);
                }
            })
        })



        //返回顶部
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
    }


});
