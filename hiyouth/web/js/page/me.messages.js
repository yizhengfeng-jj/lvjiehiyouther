/**
 * Created by xiepengcheng on 16/4/23.
 */
"use strict";
define(function(require, exports, module) {
    var _public = module.exports = {};
    var $ = require('jquery'),
        common = require('lib/common'),
        report = require('business/report'),
        jalert = require("business/jalert"),
        pagination = require('business/pagination'),
        router = require('business/router');

    var _private = {};

    _public.init = function() {


        _public.tabRender($("#comment"), "comment-tpl", "getMcomment", 1);
        //console.log(1);
        //_public.tabRender($("#question"),"question-tpl","getMcomment",1);


        _public.dom();
        _public.bindEvent();
    };
    _public.tabRender = function(container, tpl, url, type) {
        var $all = container;
        var looked_push =(url == "getPush");
        $('.pagination-wrapper ul').pcPage({
            url: router.getUrl(url),
            queryParams: {
                type: type
            },
            options: {
                rows: 5,
                page: 1
            },
            pageChange: function(dom) {
                $all.html('<div class="loading"><img src="../../img/loading.gif" alt="loading"/></div>')
            },
            renderData: function(result) {
                if(looked_push){
                    if(result && result.data){
                        var arr = [];
                        var ok = function () {
                            var cu = parseInt($(".message-new-vk").text())-arr.length;
                            if(cu>0){
                                $(".message-new-vk").text(cu);
                                $("#delegate .tab-new:eq(2)").text("+"+cu).fadeIn();
                            }
                        };
                        var bad = function () {

                        };

                        for(var i = 0,len =result.data.length;i <len;i++) {
                            if(result.data[i].iflook ==0){
                                arr.push(result.data[i].id)
                            }
                        }

                        _public.isLooked(arr,ok,bad)
                    }
                }
                common.template(tpl, result, $all);

            }
        })

    };

    _public.isLooked = function (list,callback,error) {
        common.sendPost("isLooked",{id:list}).done(function (result) {
            if(result && result.code ==1){
                if(callback)callback();
                console.log(result.info);
            }else{
                if(error)error();
                console.log(result.info);
            }
        })
    }
    _public.bindEvent = function() {
        //tab ajax loading
        $(".tab").on("click", function(e) {
            e.preventDefault();
            var $this = $(this);
            if ($this.text().indexOf("评论") != -1) {
                _public.tabRender($("#comment"), "comment-tpl", "getMcomment", 1);

            } else if ($this.text().indexOf("问答") != -1) {
                _public.tabRender($("#question"), "question-tpl", "getMcomment", 0);

            } else if ($this.text().indexOf("系统消息") != -1) {
                _public.tabRender($("#system"), "system-tpl", "getPush",0);

            }

        });




    };
    _public.dom = function() {
        var tab = {
            index: 0,
            tab: ["评论", "问答", "系统消息"],
            id: ["comment", "question", "system"],
            new_list: $(".tab-new"), //tab上的数字的list
            to: function(text) {
                //hide
                $(".tab").eq(this.index).removeClass("tab-active")
                $('#' + this.id[this.index]).hide();
                //show
                this.index = this.tab.indexOf(text);
                $(".tab").eq(this.index).addClass("tab-active")
                $('#' + this.id[this.index]).show();
            },
            click: function(el) {
                this.to(el.text.replace(/[+]?\d+/, ""));
            }
        };
        $(".tab-group").on("click", "a", function() {
            tab.click($(this).get(0));
        });


        $(".card-list").on("click", "a", function(e) {
            //利用class来判断是什么类型的按钮
            var $this = $(this);
            var hotel = $this.hasClass("hotel");
            var recruit = $this.hasClass("recruit");
            var closebtn = $this.hasClass("close-btn");
            var delallbtn = $this.hasClass("del-all-btn");
            var replybtn = $this.hasClass("reply-btn");
            var $li = $this.parent().parent();
            if (hotel) {

                window.open(router.getUrl("infoJSP")+"?id="+$li.data("rid"))
            } else if (recruit) {

                window.open(router.getUrl("infoJSP")+"?id="+$li.data("rid"))
            } else if (closebtn) {

                //ajax
                var sendData={
                    id:$(this).parents("li").data("id")
                };
               // console.log(sendData);
              common.sendPost("deletePush", sendData).done(function(result) {

                    if (result && result.code == 1) {
                        
                          $li.hide();

                    } else {
                        jalert.error(result.info);

                    }

                });

                

              
                //system 消息数减一
                var number = parseInt(tab.new_list.eq(2).text(), 10)
                tab.new_list.eq(2).text("+" + --number);
               // alert("点击关闭按钮 删除该系统消息");
            } else if (delallbtn) {
                //设置系统消息为0;
               // $("#system-info-count").text("0")
                    //修改tab上的数字
                //tab.new_list.eq(2).text("");
                
               // alert("点击全部删除按钮 删除全部系统消息");
               // 
               // 

                var del_list = [];
                $("#system li").each(function (index,el){
                    del_list.push($(el).data("id"));
                });
                // alert("点击全部删除按钮 删除全部系统消息");
                //
                //

                //ajax
                var sendData={
                    id: del_list
                };
                
              common.sendPost("deletePush", sendData).done(function(result) {

                    if (result && result.code == 1) {
                        $(".pagination .disabled").not(".pre,.next").click();
                    } else {
                        jalert.error(result.info);

                    }

                });



            } else if (replybtn) {
                reply($this);
            } else {
                var img = "";
                var $children = $this.children();
                if ($children.length != 0) {
                    img = $children.get(0).nodeName.toLowerCase();
                    if (img == "img") {
                        //点击的是商家头像跳转到[商家详情]
                        window.open(router.getUrl("infoJSP")+"?id="+$li.data("rid"))
                    }
                }
            }
        });


        function reply($a) {
            var $div = $a.next().show();
            $a.addClass("disabled");
            $div.on("click", "a", function() {
                var $this = $(this);
                var cancel = $this.hasClass("btn-neg");
                var reply = $this.hasClass("btn-primary");
                if (reply) {
                    //回复
                    var time = new Date();
                    var retext = $this.parent().prev().val();
                    var $ul = $this.parent().parent().parent().parent();
                    var hotelname = $ul.find("h1.title").text();
                    var rep_type = ($ul.parent().attr("id") == "comment" ? "评论" : "回答");
                    var rep_type_post = ($ul.parent().attr("id") == "comment" ? 1 : 0);//评论是1 问答是0
                    //todo
                    //拼接 html



                    //ajax
                    var sendData = {
                        lid: $(this).parents("li").data("aid"),
                        cid:$(this).parents("li").data("cid"),
                        answer: $(this).parents("li").children().find("textarea").val(),
                        type:rep_type_post
                    };
                    console.log(sendData);
                  common.sendPost("insertanswer", sendData).done(function(result) {
                        //console.log(result);
                    if (result && result.code == 1) {
                             var img=result["img"];
                             var html = '<div class="comment comment-right">' + '<div class="portrait-70 bdr-227">' + '<a href="javascript:void(0);" title="点击查看详情"><img src='+img+' alt="头像"/></a>' + '</div>' + '<div class="comment-area">' + '<p>我:</p>' + '<p><span class="time">' + time.toLocaleDateString() + '</span><span class="time">'+common.getDateFormat()+'</span></p>' + '<p>' + sendData.answer + '</p>' + '</div>' + '</div>';

                             $(html).insertBefore($div.parent());
                             $this.parent().prev().val("");
                             $div.off().hide();
                             $a.removeClass("disabled");
                         

                    } else {
                        jalert.error(result.info);

                    }

                });
                  
                   /*
                     var img=result["img"];
                             var html = '<div class="comment comment-right">' + '<div class="portrait-70 bdr-227">' + '<a href="javascript:void(0);" title="点击查看详情"><img src='+img+' alt="头像"/></a>' + '</div>' + '<div class="comment-area">' + '<p>我回复了<a href="javascript:void(0);" class="text-theme hotel">' + hotelname + '</a>的' + rep_type + ':</p>' + '<p><span class="time">' + time.toLocaleDateString() + '</span><span class="time">12:43</span></p>' + '<p>' + retext + '</p>' + '</div>' + '</div>';

                              $(html).insertBefore($div.parent());
                             $this.parent().prev().val("");
                             $div.off().hide();
                             $a.removeClass("disabled");
                    */

                   
                } else if (cancel) {
                    $this.parent().prev().val("");
                    $div.off().hide();
                    $a.removeClass("disabled");

                }

            })
        }
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
