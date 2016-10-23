/**
 * Created by xiepengcheng on 16/4/23.
 */
"use strict";
define(function (require, exports, module) {
    var _public = module.exports = {};
    var $ = require('jquery'),
        common = require('lib/common'),
        report = require('business/report'),
        pagination = require('business/pagination'),
        jalert = require("business/jalert"),
        router = require('business/router');

    var _private = {};

    _private.insertHotel = function (params, success) {
        common.sendPost('insertHotel', params).done(function (result) {
            if (result && result.code === 1) {
                success(result.id);
            } else {
                jalert.error(result.info,"确定");
            }
        });
    };
    _private.updateHotel = function (params, success) {
        common.sendPost('updateHotel', params).done(function (result) {
            if (result && result.code === 1) {
                success();
            } else {
                jalert.error(result.info,"确定");
            }
        });
    };
    _public.init = function (text_prov, text_city) {
        // todo ...

        $('#tryhide').hide();
        _public.dom(text_prov, text_city);
    };
    _public.dom = function (text_prov, text_city) {

        var urlInfo = common.parseURL(window.location.href),
            params = urlInfo.params;

        //绑定顶部的历史和收到的简历按钮的事件绑定
        $("#history-btn").click(function () {
          common.skipUri("recruitHistory.html?id=" + params.id  + "&name=" + $("#hostname").val().trim() )
        });
        $("#requests-btn").click(function () {
            common.skipUri("requests.html?id=" + params.id  + "&name=" + $("#hostname").val().trim() )

        });
        $("#to-identifi").click(function () {
            common.skipUri("verify.html?id=" + params.id + "&name=" + $("#hostname").val().trim() )
        });


        //editor
        //需要操作的地方就在每个editor的save和cancel函数里面
        profile_editor();//执行函数体
        function profile_editor() {


            var editor = {
                dom1: {},
                dom2: {},
                hid: null,
                bid: null,
                edit_btn: $("#recruit-edit-btn"),
                save_btn: $("#recruit-save-btn"),
                cancel_btn: $("#recruit-cancel-btn"),
                plus_btn: $("#recruit-plus-btn"),
                edit: edit,
                save: save,
                cancel: cancel,
                get_data: get_data,
                reset: reset //删除事件 恢复最初的状态
            };
            var tag = {
                new_btn: $("#new-tag-btn"),
                new_tag_input: $("#new-tag"),
                on: function () {

                    this.new_btn = $("#new-tag-btn");
                    this.new_tag_input = $("#new-tag");
                    this.new_tag_input.show();
                    this.new_btn.removeClass("hide");

                    //添加已有的标签的点击事件;
                    $("#js-tag-dest").on("click",".t-del",function () {

                        $(this).fadeOut();//删除标签隐藏
                        $("#js-tag-pool").append($(this).parent().remove());//添加到目标区域

                    });

                    $("#js-tag-pool").on("click",".t", function () {
                        $(this).next().fadeIn();//删除标签显示
                        $("#js-tag-dest").append($(this).parent().remove());
                    });

                    $("#js-tag-dest .t-del").fadeIn();
                    this.new_tag_input.keydown(function (e) {
                        if (e.keyCode == 13) {
                            tag.new_tag();
                        }
                    });

                    var $dest_t = $("#js-tag-dest .t"),
                        $pool_t = $("#js-tag-pool .t");

                    $dest_t.each(function(index1,el1){
                        $pool_t.each(function (index2,el2) {
                            if($(el1).text() == $(el2).text()){
                                $(el2).parent().empty();
                            }
                        })
                    });

                    $(".tag-pane").slideDown();

                },
                off: function () {

                },
                new_tag: function () {
                    var name = this.new_tag_input.val(),
                        a = document.createElement("a"),
                        li = document.createElement("li"),
                        span = document.createElement("span")


                    if (name.trim() == "") return;
                    this.new_tag_input.val("");
                    var namespace = ["tag-theme", "tag-pink", "tag-yellow", "tag-red", "tag-green"];
                    var len = namespace.length;
                    var random = Math.floor(Math.random() * len);
                    //随机分配tag名称

                    a.className = "t " + namespace[random];
                    a.innerHTML = name;
                    li.appendChild(a);

                    span.className = "t-del";
                    span.innerHTML = "x";
                    li.appendChild(span);


                    $("#js-tag-dest").append(li);


                    tag.on();
                },
                get_tags: function () {
                    var $alist = $("#js-tag-dest li>a");
                    var text = [];

                    $alist.each(function (index, el) {
                        //obj.class.push(el.className);
                        text.push(el.innerHTML);
                    });

                    return text;
                }
            };

            //检测页面类型 修改editor的bid(boss's id) hid(hotel's id) ,注意
            //新建客栈时 params.id是bid 更新客栈时 params.id 是hid
            if (urlInfo.file.substr(-3, 3) == "jsp") {
                //在更新页面
                editor.update = true;
                editor.hid = params.id;
                $("#js-new-recruit,#js-new-recruit2").click(function (e) {

                    common.skipUri("recruit.html?id=" + params.id + "&name=" + $("#hostname").val().trim());
                    e.preventDefault();
                    e.stopPropagation();
                })
                editor.reset();//初始化
            } else {
                //新建客栈
                editor.update = false;
                editor.bid = params.id;
                editor.reset();//初始化
                tag.on();
            }


            function reset() {
                editor.edit_btn.removeClass("disabled");


                if(!editor.update){
                    tag.new_btn.removeClass("hide");
                    tag.new_btn.one("click", function () {
                        tag.new_tag_input.fadeIn();
                        tag.new_btn.click(function () {
                            tag.new_tag()
                        })
                    });

                    editor.edit();
                }else{
                    editor.edit_btn.one("click", function () {
                            $('#tryhide').show();
                            tag.new_btn.removeClass("hide");
                            tag.new_btn.one("click", function () {
                                tag.new_tag_input.fadeIn();
                                tag.new_btn.click(function () {
                                    tag.new_tag()
                                })
                            });

                            editor.edit();
                        }
                    );
                    $(".option").slideUp();
                    tag.off();
                    tag.new_btn.addClass("hide").off();
                    $(".edit-display .e-s").addClass("disabled");

                    tag.new_tag_input.hide();
                    editor.save_btn.off();
                    editor.cancel_btn.off();
                    editor.plus_btn.off();
                }

            }

            function edit() {

                this.dom1 = $("#js-half-1").clone(true);
                this.dom2 = $("#js-half-2").clone(true);
                //设置显示
                this.edit_btn.addClass("disabled");
                $(".e-s").removeClass("disabled");
                $(".option").slideDown();
                editor.save_btn.on("click", function () {
                        editor.save(false);
                        $('#tryhide').hide();
                    }
                );
                editor.cancel_btn.on("click", function () {
                        editor.cancel();
                        $('#tryhide').hide();
                    }
                );
                editor.plus_btn.click(function () {
                    //执行保存
                    editor.save(true);
                    $('#tryhide').hide();
                });

                //添加标签有关的事件
                tag.on();
            }

            function save(plus) {
                //todo check
                if($("#hostname").val().trim() == ""){
                    jalert.error("请输入客栈名字","确定");
                    return false;
                }
                if($("#location").val().trim() == ""){
                    jalert.error("请输入能够在电子地图上准确定位的地址(不用加省/市)","确定");
                    return false;
                }
                if($("#js-r-phone").val().trim() == "" && $("#js-r-weixin").val().trim() == "" && $("#js-r-qq").val().trim()==""){
                    jalert.error("请至少输入一个联系方式","确定");
                    return false;
                }
                //
                //    obj.name = $("#hostname").val().trim();
                //obj.address = $("#province").val() + "-" + $("#city").val() + "-" + $("#location").val();
                //obj.synopsis = $('#synopsis').val().trim();
                //
                //phone.sj = $("#js-r-phone").val();
                //phone.sjs = ($("#js-r-phone-s").val()=="公开"?true:false);
                //phone.wx = $("#js-r-weixin").val();
                //phone.wxs = ($("#js-r-weixin-s").val()=="公开"?true:false);
                //phone.qq = $("#js-r-qq").val();
                //phone.qqs = ($("#js-r-qq-s").val()=="公开"?true:false);


                var that = this;
                var data = editor.get_data();
                var ifsuccess = function (hid) {
                    that.dom1.empty();
                    that.dom2.empty();
                    editor.reset();
                    that.edit_btn.removeClass("disabled");
                    $(".profile-edit .e-s").addClass("disabled");
                    if (!plus) {

                        if (!editor.update) {
                            //不是更新,是新增客栈
                            //不跳转
                            jalert.alert("嗨~亲爱的老柚看这里~我们在首页展示的是招聘,不是店铺哦~招聘相当于是店铺的一篇文章,背景图片是用的店铺的封面图.<br>哦,对了,马上跳转后您就可以添加图片咯~","知道了",function(){common.skipUri("../../api/hostelJSP?id="+hid);});

                        } else {
                            //更新客栈
                            common.skipUri("../../api/hostelJSP?id="+ params.id);
                        }


                    } else {
                        //点击保存并跳转
                        if (!editor.update) {
                            //不是更新,是新增客栈
                            jalert.alert("嗨~亲爱的老柚看这里~我们在首页展示的是招聘,不是店铺哦~招聘相当于是店铺的一篇文章,背景图片是用的店铺的封面图.<br>待会儿是新增招聘的页面,要上传图片的话,请到个人中心的店铺详情里面添加哦~","知道了", function () {
                                common.skipUri("recruit.html?id=" + params.id + "&name=" + $("#hostname").val().trim());
                            });
                        } else {
                            //更新客栈
                            ;
                            common.skipUri("recruit.html?id=" + params.id + "&name=" + $("#hostname").val().trim());
                        }



                    }

                };


                if (!editor.update) {
                    //不是更新,是新增客栈
                    data.id = editor.bid;
                    _private.insertHotel(data, ifsuccess);
                } else {
                    //更新客栈
                    data.id = editor.hid;
                    _private.updateHotel(data, ifsuccess);
                }

            }

            function get_data() {
                var obj = {},
                    phone = {};

                obj.name = $("#hostname").val().trim();
                obj.address = $("#province").val() + "-" + $("#city").val() + "-" + $("#location").val();
                obj.synopsis = $('#synopsis').val().trim();

                phone.sj = $("#js-r-phone").val();
                phone.sjs = ($("#js-r-phone-s").val()=="公开"?true:false);
                phone.wx = $("#js-r-weixin").val();
                phone.wxs = ($("#js-r-weixin-s").val()=="公开"?true:false);
                phone.qq = $("#js-r-qq").val();
                phone.qqs = ($("#js-r-qq-s").val()=="公开"?true:false);


                obj.phone = JSON.stringify(phone);
                obj.tag = tag.get_tags();

                return obj;
            }

            function cancel() {
                if(!editor.update){
                    window.close();
                    return;
                }
                //还原dom
                $("#js-half-1").replaceWith(this.dom1);
                $("#js-half-2").replaceWith(this.dom2);

                editor.reset()

            }
        }


        //图片上传
        $(".photo-list").on("click", "li>a,p>span", function (e) {

            if (e.currentTarget.tagName.toLowerCase() == "span") {
                if (e.currentTarget.innerHTML == "重选") {
                    $(e.target).parent().parent().find("input").click();

                } else {
                    //删除;
                    var $li = $(e.target).parent().parent();

                    var $input = $li.find("input");

                    common.send("deleteHotelPicture",{pid:$input.data("pid")}).done(function(result){
                        if(result && result.code){
                            $li.find("img").addClass("vhide");
                            $li.find("img").attr("src", "");
                            $li.find("a").removeClass("hide");
                            $input.val("");
                            $input.data("pid","")
                        }else {
                            jalert.error(result.info,"确定");
                        }
                    })
                }
            } else {

                var input = $(e.target).parent().find("input");
                     input.click();

            }
        });

        $(".photo-list input").each(function (index, el) {
            $(el).on("change", function (e) {

                var $input = $(e.target);

                var pid = $input.data("pid")
                var number = $input.data("number");
                ///type 新增
                var file = $input.get(0).files[0];
                var name = file.name;
                var size = file.size;

                var formdata = new FormData();

                formdata.append("photo",file.slice(0,size));
                formdata.append("number",number);
                if(pid){
                    formdata.append("pid",pid);
                    formdata.append("type",1);

                }else{
                    formdata.append("type",0);

                }
                formdata.append("name",name);
                formdata.append("hid",params.id);
                var data = {
                    url:router.getUrl("changeHotelPicture"),
                    type: "POST",
                    data: formdata,
                    async: true, //异步
                    processData: false, //很重要，告诉jquery不要对form进行处理
                    contentType: false, //很重要，指定为false才能形成正确的Content-Type
                    success: function(result){
                        if(result &&result.code ==1){
                            $input.data("pid",result.pid);
                            //        fileReader.readAsDataURL(file);
                            //        var url = fileReader.result;
                            var $a = $input.prev();
                            $a.prev().get(0).src = result.img;
                            $a.addClass("hide");
                            $a.prev().removeClass("vhide");
                        }else {
                            jalert.error(result.info);
                        }

                    }
                };
                $.ajax(data);

            })
        });

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


        //省份二级联动原生js 初始化在下面调用的initSelect("重庆市","南岸区")//若无参数就是默认的北京北京
        var list1 = [];
        var list2 = [];
        list1[list1.length] = "北京市";
        list1[list1.length] = "天津市";
        list1[list1.length] = "河北省";
        list1[list1.length] = "山西省";
        list1[list1.length] = "内蒙古";
        list1[list1.length] = "辽宁省";
        list1[list1.length] = "吉林省";
        list1[list1.length] = "黑龙江省";
        list1[list1.length] = "上海市";
        list1[list1.length] = "江苏省";
        list1[list1.length] = "浙江省";
        list1[list1.length] = "安徽省";
        list1[list1.length] = "福建省";
        list1[list1.length] = "江西省";
        list1[list1.length] = "山东省";
        list1[list1.length] = "河南省";
        list1[list1.length] = "湖北省";
        list1[list1.length] = "湖南省";
        list1[list1.length] = "广东省";
        list1[list1.length] = "广西自治区";
        list1[list1.length] = "海南省";
        list1[list1.length] = "重庆市";
        list1[list1.length] = "四川省";
        list1[list1.length] = "贵州省";
        list1[list1.length] = "云南省";
        list1[list1.length] = "西藏自治区";
        list1[list1.length] = "陕西省";
        list1[list1.length] = "甘肃省";
        list1[list1.length] = "青海省";
        list1[list1.length] = "宁夏回族自治区";
        list1[list1.length] = "新疆维吾尔自治区";
        list1[list1.length] = "香港特别行政区";
        list1[list1.length] = "澳门特别行政区";
        list1[list1.length] = "台湾省";
        list1[list1.length] = "其它";

        list2[list2.length] = ["北京", "东城区", "西城区", "崇文区", "宣武区", "朝阳区", "丰台区", "石景山区", " 海淀区（中关村）", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "密云县", "延庆县", " 其他"];
        list2[list2.length] = ["和平区", "河东区", "河西区", "南开区", "红桥区", "塘沽区", "汉沽区", "大港区",
            "西青区", "津南区", "武清区", "蓟县", "宁河县", "静海县", "其他"];
        list2[list2.length] = ["石家庄市", "张家口市", "承德市", "秦皇岛市", "唐山市", "廊坊市", "衡水市",
            "沧州市", "邢台市", "邯郸市", "保定市", "其他"];
        list2[list2.length] = ["太原市", "朔州市", "大同市", "长治市", "晋城市", "忻州市", "晋中市", "临汾市",
            "吕梁市", "运城市", "其他"];
        list2[list2.length] = ["呼和浩特市", "包头市", "赤峰市", "呼伦贝尔市", "鄂尔多斯市", "乌兰察布市",
            "巴彦淖尔市", "兴安盟", "阿拉善盟", "锡林郭勒盟", "其他"];
        list2[list2.length] = ["沈阳市", "朝阳市", "阜新市", "铁岭市", "抚顺市", "丹东市", "本溪市", "辽阳市",
            "鞍山市", "大连市", "营口市", "盘锦市", "锦州市", "葫芦岛市", "其他"];
        list2[list2.length] = ["长春市", "白城市", "吉林市", "四平市", "辽源市", "通化市", "白山市", "延边朝鲜族自治州", "其他"];
        list2[list2.length] = ["哈尔滨市", "七台河市", "黑河市", "大庆市", "齐齐哈尔市", "伊春市", "佳木斯市",
            "双鸭山市", "鸡西市", "大兴安岭地区(加格达奇)", "牡丹江", "鹤岗市", "绥化市　", "其他"];
        list2[list2.length] = ["黄浦区", "卢湾区", "徐汇区", "长宁区", "静安区", "普陀区", "闸北区", "虹口区",
            "杨浦区", "闵行区", "宝山区", "嘉定区", "浦东新区", "金山区", "松江区", "青浦区", "南汇区", "奉贤区", "崇明县", "其他"];
        list2[list2.length] = ["南京市", "徐州市", "连云港市", "宿迁市", "淮安市", "盐城市", "扬州市", "泰州市",
            "南通市", "镇江市", "常州市", "无锡市", "苏州市", "其他"];
        list2[list2.length] = ["杭州市", "湖州市", "嘉兴市", "舟山市", "宁波市", "绍兴市", "衢州市", "金华市",
            "台州市", "温州市", "丽水市", "其他"];
        list2[list2.length] = ["合肥市", "宿州市", "淮北市", "亳州市", "阜阳市", "蚌埠市", "淮南市", "滁州市",
            "马鞍山市", "芜湖市", "铜陵市", "安庆市", "黄山市", "六安市", "巢湖市", "池州市", "宣城市", "其他"];
        list2[list2.length] = ["福州市", "南平市", "莆田市", "三明市", "泉州市", "厦门市", "漳州市", "龙岩市", "宁德市", "其他"];
        list2[list2.length] = ["南昌市", "九江市", "景德镇市", "鹰潭市", "新余市", "萍乡市", "赣州市", "上饶市",
            "抚州市", "宜春市", "吉安市", "其他"];
        list2[list2.length] = ["济南市", "聊城市", "德州市", "东营市", "淄博市", "潍坊市", "烟台市", "威海市",
            "青岛市", "日照市", "临沂市", "枣庄市", "济宁市", "泰安市", "莱芜市", "滨州市", "菏泽市", "其他"];
        list2[list2.length] = ["郑州市", "三门峡市", "洛阳市", "焦作市", "新乡市", "鹤壁市", "安阳市", "濮阳市",
            "开封市", "商丘市", "许昌市", "漯河市", "平顶山市", "南阳市", "信阳市", "周口市", "驻马店市", "其他"];
        list2[list2.length] = ["武汉市", "十堰市", "襄樊市", "荆门市", "孝感市", "黄冈市", "鄂州市", "黄石市",
            "咸宁市", "荆州市", "宜昌市", "随州市", "恩施土家族苗族自治州", "仙桃市", "天门市", "潜江市", "神农架林区", "其他"];
        list2[list2.length] = ["长沙市", "张家界市", "常德市", "益阳市", "岳阳市", "株洲市", "湘潭市", "衡阳市",
            "郴州市", "永州市", "邵阳市", "怀化市", "娄底市", "湘西土家族苗族自治州", "其他"];
        list2[list2.length] = ["广州市", "清远市市", "韶关市", "河源市", "梅州市", "潮州市", "汕头市", "揭阳市",
            "汕尾市", " 惠州市", "东莞市", "深圳市", "珠海市", "中山市", "江门市", "佛山市", "肇庆市", "云浮市",
            "阳江市", "茂名市", "湛江市", " 其他"];
        list2[list2.length] = ["南宁市", "桂林市", "柳州市", "梧州市", "贵港市", "玉林市", "钦州市", "北海市",
            "防城港市", "崇左市", "百色市", "河池市", "来宾市", "贺州市", "其他"];
        list2[list2.length] = ["海口市", "三亚市", "其他"];
        list2[list2.length] = ["渝中区", "大渡口区", "江北区", "沙坪坝区", "九龙坡区", "南岸区", "北碚区",
            "万盛区", "双桥区", "渝北区", "巴南区", "万州区", "涪陵区", "黔江区", "长寿区", "合川市", "永川市",
            "江津市", "南川市", "綦江县", "潼南县", "铜梁县", "大足县", "璧山县", "垫江县", "武隆县", "丰都县",
            "城口县", "开县", "巫溪县", "巫山县", "奉节县", "云阳县", "忠县", "石柱土家族自治县", "彭水苗族土家族自治县",
            "酉阳土家族苗族自治县", "秀山土家族苗族自治县", "其他"];
        list2[list2.length] = ["成都市", "广元市", "绵阳市", "德阳市", "南充市", "广安市", "遂宁市",
            "内江市", "乐山市", "自贡市", "泸州市", "宜宾市", "攀枝花市", "巴中市", "资阳市", "眉山市", "雅安",
            "阿坝藏族羌族自治州", "甘孜藏族自治州", "凉山彝族自治州县", "其他"];
        list2[list2.length] = ["贵阳市", "六盘水市", "遵义市", "安顺市", "毕节地区", "铜仁地区",
            "黔东南苗族侗族自治州", "黔南布依族苗族自治州", "黔西南布依族苗族自治州", "其他"];
        list2[list2.length] = ["昆明市", "曲靖市", "玉溪市", "保山市", "昭通市", "丽江市", "普洱市",
            "临沧市",  "德宏傣族景颇族自治州", "怒江傈僳族自治州", "楚雄彝族自治州", "红河哈尼族彝族自治州",
            "文山壮族苗族自治州", "大理白族自治州", "迪庆藏族自治州", "西双版纳傣族自治州", "其他"];
        list2[list2.length] = ["拉萨市", "那曲地区", "昌都地区", "林芝地区", "山南地区", "日喀则地区", "阿里地区", "其他"];
        list2[list2.length] = ["西安市", "延安市", "铜川市", "渭南市", "咸阳市", "宝鸡市", "汉中市", "安康市", "商洛市", "其他"];
        list2[list2.length] = ["兰州市 ", "嘉峪关市", "金昌市", "白银市", "天水市", "武威市", "酒泉市",
            "张掖市", "庆阳市", "平凉市", "定西市", "陇南市", "临夏回族自治州", "甘南藏族自治州", "其他"];
        list2[list2.length] = ["西宁市", "海东地区", "海北藏族自治州", "黄南藏族自治州", "玉树藏族自治州",
            "海南藏族自治州", "果洛藏族自治州", "海西蒙古族藏族自治州", "其他"];
        list2[list2.length] = ["银川市", "石嘴山市", "吴忠市", "固原市", "中卫市", "其他"];
        list2[list2.length] = ["乌鲁木齐市", "克拉玛依市", "喀什地区", "阿克苏地区", "和田地区", "吐鲁番地区",
            "哈密地区", "塔城地区", "阿勒泰地区", "克孜勒苏柯尔克孜自治州", "博尔塔拉蒙古自治州",
            "昌吉回族自治州伊犁哈萨克自治州", "巴音郭楞蒙古自治州", "河子市", "阿拉尔市", "五家渠市", "图木舒克市", "其他"];
        list2[list2.length] = ["香港", "其他"];
        list2[list2.length] = ["澳门", "其他"];
        list2[list2.length] = ["台湾", "其他"];

        var ddlProvince = document.getElementById("province");
        var ddlCity = document.getElementById("city");
        ddlProvince.onchange = function (e) {
            selectprovince(e.target)
        };
        if (text_prov) {
            initSelect(text_prov, text_city);
        } else {
            initSelect();
        }
        function initSelect(pvovince, city) {
            var p_frag = document.createDocumentFragment();
            var book = 0;
            for (var i = 0, p_length = list1.length; i < p_length; i++) {
                var option = document.createElement("option");
                option.appendChild(document.createTextNode(list1[i]));
                option.value = list1[i];
                if (option.value == pvovince) {
                    option.selected = true;
                    book = i;
                }
                p_frag.appendChild(option);
            }
            ddlProvince.appendChild(p_frag);
            p_frag = null;

            var initprovince = list2[book];
            var fp_frag = document.createDocumentFragment();
            for (var j = 0, fp_length = initprovince.length; j < fp_length; j++) {
                var optioncity = document.createElement("option");
                optioncity.appendChild(document.createTextNode(initprovince[j]));
                optioncity.value = initprovince[j];
                if (optioncity.value == city) {
                    optioncity.selected = true;
                }
                fp_frag.appendChild(optioncity);
            }
            ddlCity.appendChild(fp_frag);
            fp_frag = null;

        }

        function indexof(obj, value) {

            for (var k = 0, length = obj.length; k < length; k++) {
                if (obj[k] == value)
                    return k;
            }
            return k;
        }

        function selectprovince(obj) {
            ddlCity.options.length = 0;//clear
            var index = indexof(list1, obj.value);
            var list2element = list2[index];
            var frag = document.createDocumentFragment();
            for (var i = 0, li2_length = list2element.length; i < li2_length; i++) {
                var option = document.createElement("option");
                option.appendChild(document.createTextNode(list2element[i]));
                option.value = list2element[i];
                frag.appendChild(option);
            }
            ddlCity.appendChild(frag)
        }

    }

});
