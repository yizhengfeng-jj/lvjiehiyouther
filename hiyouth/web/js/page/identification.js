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

        //tab内容切换
        var Tab = {
            index: 0,
            tab: ["身份认证", "商家认证"],
            id: ["person", "hotel"],
            to: function(text) {
                //hide
                if (this.index == this.tab.indexOf(text)) {
                    return;
                }
                $(".tab").eq(this.index).removeClass("tab-active")
                $('#' + this.id[this.index]).slideUp();
                //show
                this.index = this.tab.indexOf(text);
                $(".tab").eq(this.index).addClass("tab-active")
                $('#' + this.id[this.index]).slideDown();
            },
            click: function(el) {
                this.to(el.text.replace(/\+\d*/, ""));
            }
        };
        //$("#person,#hotel").on("click", "td>a,.display span", function(e) {
        //    if (e.currentTarget.tagName.toLowerCase() == "span") {
        //        $(e.target).parent().parent().find("input").click();
        //    } else {
        //        $(e.target).parent().find("input").click();
        //    }
        //});
        //图片上传
        //$("#person,#hotel").on("click", "td>a,.display span", function(e) {
        //    if (e.currentTarget.tagName.toLowerCase() == "span") {
        //        $(e.target).parent().parent().find("input").click();
        //    } else {
        //        $(e.target).parent().find("input").click();
        //    }
        //});

        var id = common.parseURL(window.location.href).params.id;

        $('#p-submit').click(function() {
            var idcard = $('#p-idcard').val(),
                name = $('#p-name').val();


            if(idcard.trim() == ""){
                jalert.error("请输入正确的身份证id");
                return ;
            }
            if(name.trim() == ""){
                jalert.error("请输入正确的身份证id");
                return ;
            }
            if($("#img-face").attr("src").trim()=="" && $("#img-back").attr("src").trim()=="" &&  $("#img-hand").attr("src").trim()=="" ){
                jalert.error("您还有照片没有上传");
                return ;
            }

            if($("#p-idcard").parent().hasClass("wrong")){
                jalert.error("您身份证号码不正确,请检查(如有错误,请联系我们)");
                return ;
            }
            if($("#p-name").parent().hasClass("wrong")){
                jalert.error("您姓名不对");
                return ;
            }

            common.send('subidval', {idcard_num: idcard, realname: name, type: 'all'}).done(function(res) {
                if(res.code == 1){
                    jalert.alert('已提交信息');
                    common.skipUri(router.getUrl(res.api+"JSP"));

                }
                else jalert.error(res.info)
            })
        });






        $('#upload1, #upload2, #upload3,#h-upload1, #h-upload2, #h-upload3, #h-upload4').click(function() {
            var $this = $(this);
            $this.next('input').trigger('click')
        });




        //$('#p-photo-front, #p-photo-back, #p-photo-life').change(function() {
        //    upload.addFile(this, $(this).val())
        //})
        //ie8 ie9
        $("#p-photo-back,#p-photo-front,#p-photo-life,#h-photo-front,#h-photo-back,#h-photo-life,#h-photo-business").on("change", function(e) {
            var $form = $(this).parents('form'),
                type = $form.data('type');
            var funKey = 'funKey' + parseInt(100000 * Math.random());
            $form.find('[name="funKey"]').val(funKey);
            $form.find('[name="type"]').val(type);

            if(id) $form.append('<input type="hidden" name="hide" value="' + id + '"/>');

            $form.submit();
            window[funKey] = function(res) {
                if(res.code == -1) jalert.error(res.info)
                else $form.find('img').attr('src', res).parent().removeClass('vhide');
            }

        });
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

        //somewhere copied
        var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子
        var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X
        function IdCardValidate(idCard) {
            idCard = trim(idCard.replace(/ /g, "")); //去掉字符串头尾空格
            if (idCard.length == 15) {
                return isValidityBrithBy15IdCard(idCard); //进行15位身份证的验证
            } else if (idCard.length == 18) {
                var a_idCard = idCard.split(""); // 得到身份证数组
                if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) { //进行18位身份证的基本验证和第18位的验证
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
        /**
         * 判断身份证号码为18位时最后的验证位是否正确
         * @param a_idCard 身份证号码数组
         * @return
         */
        function isTrueValidateCodeBy18IdCard(a_idCard) {
            var sum = 0; // 声明加权求和变量
            if (a_idCard[17].toLowerCase() == 'x') {
                a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
            }
            for (var i = 0; i < 17; i++) {
                sum += Wi[i] * a_idCard[i]; // 加权求和
            }
            var valCodePosition = sum % 11; // 得到验证码所位置
            if (a_idCard[17] == ValideCode[valCodePosition]) {
                return true;
            } else {
                return false;
            }
        }
        /**
         * 验证18位数身份证号码中的生日是否是有效生日
         * @param idCard 18位书身份证字符串
         * @return
         */
        function isValidityBrithBy18IdCard(idCard18) {
            var year = idCard18.substring(6, 10);
            var month = idCard18.substring(10, 12);
            var day = idCard18.substring(12, 14);
            var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
            // 这里用getFullYear()获取年份，避免千年虫问题
            if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
                return false;
            } else {
                return true;
            }
        }
        /**
         * 验证15位数身份证号码中的生日是否是有效生日
         * @param idCard15 15位书身份证字符串
         * @return
         */
        function isValidityBrithBy15IdCard(idCard15) {
            var year = idCard15.substring(6, 8);
            var month = idCard15.substring(8, 10);
            var day = idCard15.substring(10, 12);
            var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
            // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
            if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
                return false;
            } else {
                return true;
            }
        }
        //去掉字符串头尾空格
        function trim(str) {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }
        //输入框身份证验证
        //状态加在input上面的td  相同class
        $("#p-idcard,#h-idcard").on("input", function(e) {
            var $input = $(e.target);
            var $td = $input.parent();
            var val = $input.val();
            if (val == "" || (!IdCardValidate(val))) {
                $td.removeClass("pass");
                $td.addClass("wrong");
                return;
            } else {
                $td.removeClass("wrong");
                $td.addClass("pass");
            }
        })
        //输入框姓名验证
        $("#p-name,#h-name").on("input", function(e) {
            var $input = $(e.target);
            var $td = $input.parent();
            var val = $input.val();
            var reg = /^[\u2E80-\u9FFF]+$/g; //Unicode编码中的汉字范围
            if (val == "" || !reg.test(val)) {
                $td.removeClass("pass");
                $td.addClass("wrong");
                return;
            } else {
                $td.removeClass("wrong");
                $td.addClass("pass");
            }
        })
    }

});