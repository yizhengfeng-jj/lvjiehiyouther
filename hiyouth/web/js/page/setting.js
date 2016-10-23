/**
 * Created by eynol on 2016-05-01.
 */
"use strict";
define(function (require, exports, module) {
    var _public = module.exports = {};
    var $ = require('jquery'),
        common = require('lib/common'),
        report = require('business/report'),
        jalert = require('business/jalert'),
        router = require('business/router');

    var _private = {};

    _public.init = function () {
        // todo ...
        _public.dom();
    };
    
    _public.change_pwd = function (data,callback,error) {
        common.send("updpwd",data).done(function (result) {
            if(result && result.code ==1){
                callback(result);
            }else{
                error(result);
            }
        });
    };
    
    _public.set_phone = function (data,callback,error) {
        common.send("setPhone",data).done(function (result) {
            if(result && result.code ==1){
                callback(result);
            }else{
                error(result);
            }
        });
    };
    _public.dom = function () {

       _public.get_settings = function () {
           common.send("getPersonForSet").done(function(result){
               if(result && result.code == 1){
                   _public.settings =result.data;
                   _public.fill_data();
               }
           });
       };

        _public.get_settings();

        //关于绑定配置信息
        _public.settings = {
        };
        _public.fill_data = function () {
            if(_public.settings.account != -2){
                $("#panel-username").html('<h2 class="fl item-l">登录用户名</h2><p class="fl item-m">' + _public.settings.account + '</p><p class="act fl"><a href="javascript:void(0)">修改密码</a></p>')
            }else if(_public.settings.account == -2){
                $("#panel-username").html('<h2 class="fl item-l">登录用户名</h2><p class="fl item-m">' + '您使用的的是第三方登录' + '</p><p class="act fl"><a href="javascript:void(0)"></a></p>')
            }
            if(_public.settings.phone == -1){
                $("#panel-phone").html('<h2 class="fl item-l">绑定手机号</h2><p class="fl item-m">'+'未绑定手机号'+'</p><p class="fl act"><a href="javascript:void(0)">绑定手机</a></p>')

            }else{
                $("#panel-phone").html('<h2 class="fl item-l">绑定手机号</h2><p class="fl item-m">'+ _public.settings.phone +'</p><p class="fl act"><a href="javascript:void(0)">已绑定</a></p>')
            }
            if(_public.settings.email == -1){
                $("#panel-email").html('<h2 class="fl item-l">绑定邮箱</h2><p class="fl item-m">'+ '未绑定邮箱账号' +'</p><p class="fl act"><a href="javascript:void(0)">绑定邮箱</a></p>')
            }else{
                $("#panel-email").html('<h2 class="fl item-l">绑定邮箱</h2><p class="fl item-m">'+ _public.settings.email +'</p><p class="fl act"><a href="javascript:void(0)">已绑定</a></p>')

            }

        };
        //ui controller
        var ui = {
            phone: function (type) {
                $(".menu a").eq(0).addClass("active");
                $(".box .preview").slideUp();
                $(".phone").slideDown();
                $(".phone ."+type).slideDown();
            },
            change_password: function () {
                $(".menu a").eq(2).addClass("active");
                $(".box .preview").slideUp();
                $(".password").slideDown();
            },
            email: function (type) {
                $(".menu a").eq(1).addClass("active");
                $(".email").slideDown();
                $(".email ."+type).slideDown();
            },
            reset: function () {
                $(".menu .active").removeClass("active");
                $(".preview").slideUp();
                $(".phone").slideUp();
                $(".email").slideUp();
                $(".password").slideUp();
                return this;
            }
        };
    
        //header anchor event listener
        $("h1.title a").click(function () {
            ui.reset();
            $(".preview").slideDown();
        });



        //menu event listener
        $(".menu").on("click", "a", function () {
            var text = $(this).text();
            switch (text) {
                case "绑定手机":
                {
                    if(_public.settings.phone == -1){

                        ui.reset().phone("bind");
                    }else{
                        //ui.reset().phone("update");
                        jalert.error("您已绑定手机号");
                    }
                    break;
                }case "绑定邮箱":
                {
                    if(_public.settings.email == -1){
                        ui.reset().email("bind");

                    }else{
                        jalert.error('您已绑定邮箱');
                    }
                    break;
                }case "修改密码":
                {
                    if(_public.settings.account == -2){
                        jalert.error("您是第三方登录,请绑定手机号或者邮箱号码.")
                    }else{
                        ui.reset().change_password();
                    }
                    break;
                }

            }
        });


        //main content event listener
        $(".right").on("click", "a", function () {
            var $a = $(this);
            var text = $a.text();

            switch (text) {
                case "修改密码":
                {
                    $(".menu a:eq(2)").trigger("click");
                    //ui.reset().change_password();
                    break;
                }
                case "绑定邮箱":
                {
                    $(".menu a:eq(1)").trigger("click");
                    break;
                }
                case "绑定手机":
                {
                    $(".menu a:eq(0)").trigger("click");
                    break;
                }
            }


        });

        var $old_pwd = $("#old-password"),
            $new_pwd1 = $("#new-password1"),
            $new_pwd2 = $("#new-password2"),
            $errinfo = $(".password .error-info");
        
        $new_pwd2.on("blur", function () {
            if($new_pwd1.val().trim() != $new_pwd2.val().trim()){
                $errinfo.text("两次密码不一致!").fadeIn();
            }else{
                $errinfo.fadeOut();
            }
        });
        $("#js-change-pwd").click(function () {
            if($old_pwd.val().trim() == ""){
                $errinfo.text("请输入旧密码!").fadeIn();
                return;
            }

            if($new_pwd1.val().trim() == ""){
                $errinfo.text("新密码不能为空!").fadeIn();
                return;
            }else if($new_pwd1.val().trim().length <6){
                $errinfo.text("密码长度至少为6位!").fadeIn();
                return;
            }

            if($new_pwd1.val().trim() != $new_pwd2.val().trim()){
                $errinfo.text("两次密码不一致!").fadeIn();
                return;
            }else {
                $errinfo.fadeOut();
            }

            var nice = function(result){
                jalert.alert(result.info);
                $old_pwd.val("");
                $new_pwd1.val("");
                $new_pwd2.val("");

                $("h1.title a").click();
                _public.get_settings();

            };
            var bad = function (result) {
                jalert.error(result.info);

            };

            _public.change_pwd({oldpwd:$old_pwd.val().trim(),newpwd:$new_pwd1.val().trim()},nice,bad);
           
        });



        var $phone = $("#bind-phone"),
            $send_code = $("#send-phone-code"),
            $verify = $("#verify-code-p"),
            $phone_btn = $("#bind-phone-btn");


        $send_code.click(function () {
            var $this = $(this);

            if($phone.val().trim().length != 11){
                jalert.error("您的手机号码不是11位!");
                return ;
            }

            var ifsuccess  = function(result){
                jalert.alert(result.info);
                $this.addClass("disabled").text("60秒后可再次发送");
                var count = 59;
                var timer = setInterval(function(){
                    if(count != -1){
                        $this.text(count+"秒后可再次发送");
                        count--;
                    }else{
                        clearInterval(timer);
                        $this.removeClass("disabled").text("发送验证码");
                    }
                },1000)
                
            };
            var iferror = function (result) {
                jalert.error(result.info);
            };
            _public.set_phone({phone:$phone.val().trim()},ifsuccess,iferror);
            
            
        });

        $phone_btn.click(function () {
            if($phone.val().trim().length !=11 ){
                jalert.error("手机号码不正确");
                return ;
            }
            if($verify.val().trim().length != 4 ){
                jalert.error("验证码不正确");
                return;
            }

            var ifsuccess = function(result){
                jalert.alert(result.info);
                $("h1.title a").click();
                _public.get_settings();
            };
            var iferror  = function (result) {
                jalert.error(result.info);
            };
           _public.set_phone({phone:$phone.val().trim(),verid:$verify.val().trim()},ifsuccess,iferror);


        })


        var $bind_email = $("#bind-email"),
            $send_email_code = $("#send-email-code"),
            $bd_email_btn = $("#js-bind-email");
        $send_email_code.click(function () {
            var val_email = $bind_email.val().trim();

            if(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(val_email)){

                common.send("setEmail",{email:val_email}).done(function (result) {
                    if(result && result.code ==1){
                        jalert.alert(result.info);
                    }else{
                        jalert.error(result.info);
                    }
                })
            }else{
                jalert.error("邮箱格式不正确!")
            }
        });

        $bd_email_btn.click(function () {
            var val_email = $bind_email.val().trim(),
                verid = $("#verify-email-p").val().trim()
            if(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(val_email)){

               if(verid == ""){
                   jalert.error("请输入验证码");
               }else{

                   common.send("setEmail",{email:val_email,verid:verid}).done(function (result) {
                       if(result && result.code ==1){
                           jalert.alert(result.info);
                           $("h1.title a").click();
                           _public.get_settings();
                       }else{
                           jalert.error(result.info);
                       }
                   })
               }
            }else{
                jalert.error("邮箱格式不正确!")
            }
        })

    }

});
