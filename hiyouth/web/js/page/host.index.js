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
        router = require('business/router'),
        jalert = require('business/jalert'),
        upload = require('../business/upload');

    var _private = {};



    _public.init = function (txt1, txt2) {
        $('#validating').click(function() {
            var url = $(this).attr('href');
            common.send('getcomfirm', {}).done(function(res) {
                if(res && res.boss && (res.boss.code == 1 || res.boss.code == -1)) {
                    window.location.href = url;
                }else{
                    jalert.error(res.boss.info)
                }
            });
            return false;
        })
        _public.dom(txt1, txt2);
    };
    _public.dom = function (text_prov, text_city) {

        common.send("modhost_index",{}).done( function (file) {
            $("body").append(file);
            // 渲染我的旅店
            $('.pagination-wrapper ul').pcPage({
                url: router.getUrl('getBossData'),
                queryParams: {},
                options: {
                    rows: 5,
                    page: 1
                },
                pageChange: function (dom) {
                    $('#cardList').html('<div class="loading"><img src="../../img/loading.gif" alt="loading"/></div>')
                },
                renderData: function (data) {
                    common.template('card-template', data, $('#cardList'))
                }
            });

        });


        //
        //// 得到签名
        //function getSign(url, params) {
        //    return common.send(url, params)
        //}
        //
        //// 得到名字
        //function getName(uri, bossId) {
        //    if (bossId) return common.send(url, {hotelId: bossId})
        //    return common.send(uri, {})
        //}


        //editor
        //需要操作的地方就在每个editor的save和cancel函数里面
        //profile_editor();//执行函数体
        //function profile_editor() {
        var editor = {
            dom: $("#form-profile"),
            edit_btn: $("#profile-edit-btn"),
            save_btn: $("#profile-save-btn"),
            cancel_btn: $("#profile-cancel-btn"),
            edit: edit,
            save: save,
            cancel: cancel,
            get_data: get_data,
            reset: reset //删除事件 恢复最初的状态
        };

        editor.reset();//初始化
        function reset() {
            editor.edit_btn.removeClass("disabled");
            editor.edit_btn.one("click", function () {
                    editor.edit();
                }
            );
            $(".profile-option").slideUp();
            $(".edit-display .e-s").addClass("disabled");
            editor.save_btn.off();
            editor.cancel_btn.off();
        }

        function edit() {
            this.dom = $("#form-profile").clone(true);
            //设置显示
            this.edit_btn.addClass("disabled");
            $(".profile-edit .e-s").removeClass("disabled");
            $(".profile-option").slideDown();
            editor.save_btn.on("click", function () {
                editor.save();
            });
            editor.cancel_btn.on("click", function () {
                editor.cancel();
            });

            $(".woman").show();
            $(".man").show();
        }

        function save() {


            if($("#nickname-input").val().trim()==""){
                jalert.error("请输入您的昵称","知道了");
                return false;
            }



            $(".profile-edit .e-s").addClass("disabled");
            this.edit_btn.removeClass("disabled");
            var data = this.get_data();
            console.log(JSON.stringify(data));
            common.sendPost("updateBossData", data).then(function (data) {
                editor.reset();
                common.skipUri("../../api/bossJSP");
            });
        }

        function get_data() {
            var obj = {};
            obj.bid = 1;
            //obj.img = "http://www.baidu.com";
            obj.name = $("#nickname-input").val();
            obj.sex = $(".profile-edit :radio:checked").val();
            obj.address = $("#province").val() + "-" + $("#city").val() ;
            obj.sign = $("#slogan").val();
            return obj;
        }

        function cancel() {
            //再次渲染一次页面.
            $("#form-profile").replaceWith(this.dom);
            editor.reset();
        }

        //}
        //
        //var option = {
        //    url: 'updateTouxiang',
        //    nameUrl: 'getcomfirm',
        //    param: {
        //        //realname: $('#p-name').val(),
        //        //idcard_num: $('#p-idcard').val()
        //    }
        //};

        //uploadHeadImg();
        //function uploadHeadImg() {
        //    // 头像上传
        //    var uploader1 = upload.getUploader();
        //    uploader1.init({
        //        btns: ['portrait'],
        //        done: function (data) {
        //           common.skipUri("../../api/bossJSP");       // 刷新页面数据显示头像。
        //        },
        //        progress: function () {
        //        },
        //        error: function () {
        //        },
        //        add: function (up, files) {
        //            //console.log(JSON.stringify($.extend(option.param, get_data() ,{
        //            //    touxiang: files[0].name
        //            //})));
        //            getSign('updateTouxiang', $.extend(option.param, {
        //                touxiang: files[0].name
        //            })).done(function (result) {
        //                console.log(JSON.stringify(result));
        //                uploader1.send(result);
        //            })
        //        }
        //    });
        //}


        //更换头像

        $("#portrait").on("change", function (e) {

            var formdata = new FormData(),
                file = $(this).get(0).files[0],
                $this = $(this);

            formdata.append("touxiang",file.name);
            formdata.append("file",file);
            var data = {
                url:router.getUrl("updateTouxiang"),
                type: "POST",
                data: formdata,
                async: true, //异步
                processData: false, //很重要，告诉jquery不要对form进行处理
                contentType: false, //很重要，指定为false才能形成正确的Content-Type
                success: function(result){
                    if(result &&result.code ==1){
                        common.skipUri(router.getUrl("bossJSP"));
                    }else {
                        jalert.error(result.info,"确定");
                    }

                }
            };
            $.ajax(data);

        });

        $("#js-changeImg").click(function () {
            $(this).prev().val("").click();
        });

        //新增客栈
        $("#new-hotel-btn").click(function () {
            var bid = $("#js-boss-bid").data("bid");
            window.open("profile.html?id=" + bid)
        });


        //底部的cardlist的事件委托
        $(".card-list").on("click", "a", function () {
            var $a = $(this);
            var text = $a.text();
            var name = $a.parent().parents("li").find(".name").text();
            var bid = $("#js-boss-bid").data("bid");
            var hid = $a.parent().parent().parent().data("hid");
            var hid2 = $a.parent().parent().parent().parent().data("hid");
            switch (text) {
                case "简历汇总":
                {

                    if (bid) {
                        window.open("requests.html?id=" + hid2 + "&name=" + name);
                    }
                    break;
                }
                case "发布招聘":
                {
                    window.open("recruit.html?id=" + hid2  + "&name=" + name);
                    break;

                }
                case "发布历史":
                {

                    window.open("recruitHistory.html?id=" + hid2  + "&name=" + name);
                    break;

                }
                case "商家认证":
                {

                    common.send('getcomfirm', {
                        hotelid: hid2
                    }).done(function(res) {
                        if(res.hostel.code == 1 || res.hostel.code == -1) {
                            window.location.href = "verify.html?id=" + hid2  + "&name=" + name;
                        }else{
                            jalert.error(res.hostel.info,"确定")
                        }
                    })
                    break;
                }
                case "详情":
                {
                    window.open("../../api/hostelJSP?id=" + hid);
                    break;

                }
                case "删除":
                {
                    var yes =   function(ok) {
                        if(!ok){return;}
                        common.send('deleteHotel', {id:hid,bcancel:-1}).done(function (result) {
                            if (result && result.code === 1) {
                                jalert.alert(result.info,"确定");
                                $a.parent().parent().parent().remove();
                            } else {
                                jalert.error(result.info,"确定");
                            }
                        });

                    };
                    jalert.confirm("确定删除?","删除","取消",yes);
                    break;
                }
            }

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
            "临沧市", "德宏傣族景颇族自治州", "怒江傈僳族自治州", "楚雄彝族自治州", "红河哈尼族彝族自治州",
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
