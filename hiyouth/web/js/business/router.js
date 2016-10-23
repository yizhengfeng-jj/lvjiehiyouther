"use strict";
define(function (require, exports, module) {
    var _public = module.exports,
        //prefix = _public.prefix = '/api';
        prefix = _public.prefix = 'http://www.hiyouther.cn/api';

    _public.getAllHoste = prefix + '/getAllHotel';
    _public.getHotel = prefix + '/getHotel';
    _public.getTag = prefix + '/getTag';
    _public.insertBossreport = prefix + '/insertBossreport';
    _public.insertsuggest = prefix + '/insertsuggest';

    // 招聘详情
    _public.getInfo = prefix + '/getInfo';
    _public.apply = prefix + '/apply';
    _public.collect = prefix + '/collect';
    _public.cancelcollect = prefix + '/cancelcollect';
    _public.getcomment = prefix + '/getcomment';
    _public.insertcomment = prefix + '/insertcomment';
    _public.insertanswer = prefix + '/insertanswer';
    _public.insertreport = prefix + '/insertreport';
    _public.getRComment = prefix + '/getRcomment'; // 得到评论
    _public.getRQuestion = prefix + '/getRQuestion'; // 当前旅店的所有招聘

    _public.insertRecruit = prefix + '/insertRecruit'; // 新增招聘信息
    _public.updateRecruit = prefix + '/updateRecruit'; // 更新招聘信息
    _public.getApply = prefix + '/getApply'; // 获取申请表信息列表
    _public.changeApplyByBoss = prefix + '/changeApplyByBoss'; // 修改申请表
    _public.getRecruit = prefix + '/getRecruit'; // 获取招聘历史信息列表
    _public.insertHotel = prefix + '/insertHotel';//新增客栈
    _public.updateHotel = prefix + '/updateHotel'; // 更新旅店信息
    _public.deleteHotel = prefix + '/deleteHotel';//删除旅店
    _public.getBossData = prefix + '/getBossData'; // 得到旅店信息列表
    _public.updateBossData = prefix + '/updateBossData'; // 更新老板信息资料


    // 登录注册
    _public.register = prefix + '/Register';
    _public.login = prefix + '/Login';

    //义工JSON
    _public.getdata = prefix + '/getdata';
    _public.insertdata = prefix + '/insertdata';
    _public.insertcv = prefix + '/insertcv';
    _public.gethistory = prefix + '/gethistory';
    _public.cancel = prefix + '/cancel';
    _public.getcollect = prefix + '/getcollect';
    _public.cancelcollect = prefix + '/cancelcollect';
    _public.insertcomment = prefix + '/insertcomment';

    //老板
    _public.bossOne = prefix + '/boss/One';
    _public.qualify = prefix + '/qualify';
    _public.getBcomment = prefix + '/getBcomment';

    
    // 个人中心
    _public.insertdata = prefix + '/insertdata';
    _public.insertcv= prefix + '/insertcv';
    _public.conceal= prefix + '/conceal'; 
    _public.concealcollect= prefix + '/concealcollect';
    _public.getdata= prefix + '/getdata';
    _public.insertcomment= prefix + '/insertcomment';
    _public.submitConfir=prefix+'/submitConfir';
    _public.insertHead=prefix+'/insertHead';
    _public.getcomfirm=prefix+'/getcomfirm';
    _public.getHcomment = prefix + '/getHcomment';
    _public.getMcomment = prefix + '/getMcomment';
    _public.getPush = prefix + '/getPush';
    _public.deletePush = prefix + '/deletePush';
    _public.deleteAllPush = prefix + '/deleteAllPush';
    _public.insertanswer = prefix + '/insertanswer';
    _public.deleteApply = prefix + '/deleteApply';
    _public.changeApply = prefix + '/changeApply';


    _public.getUserInfo = prefix + '/getUserInfo';
    _public.cancelLogin = prefix + '/cancelLogin';


    _public.getPersonForSet = prefix + '/getPersonForSet';
    _public.updpwd = prefix + '/updpwd';
    _public.setPhone = prefix + '/setPhone';
    _public.setEmail = prefix + '/setEmail';



    _public.updateTouxiang = prefix + '/updateTouxiang'; // 更新头像信息
    _public.submitHotelConfir = prefix + '/submitHotelConfir'; // 更新旅店信息

    _public.insertapply = prefix + '/insertapply'; // 更新旅店信息


    _public.busval = prefix + '/busval'; // 更新旅店信息
    _public.idval = prefix + '/idval'; // 更新旅店信息


    _public.subidval = prefix + '/subidval'; // 更新旅店信息



    //第二版登录注册窗口
    _public.mod_login_v2 = prefix + '/../html/mod/login0607.html';
    _public.mod_register_v2 = prefix + '/../html/mod/register0607.html';


    _public.modlogin = prefix + '/../html/mod/login.html';
    _public.modhost_index = prefix + '/../html/mod/host.index_tpl.html';
    _public.modme_index = prefix + '/../html/mod/me.index_tpl.html';
    _public.recruitedetail = prefix + '/../html/mod/recruitedetail_tpl.html';
    _public.forget_pwd = prefix + '/../html/forget_pwd.html';


    _public.me_message = prefix + '/../html/me/messages.html';
    _public.host_message = prefix + '/../html/host/messages.html';

     _public.contract = prefix + '/../html/contract.html';

    _public.changeMemberPicture = prefix + "/changeMemberPicture";



    _public.insertHotelPicture = prefix + '/insertHotelPicture';
    _public.changeHotelPicture = prefix + '/changeHotelPicture';
    _public.deleteHotelPicture = prefix + '/deleteHotelPicture';


    _public.getApplyDetail = prefix + '/getApplyDetail';


    _public.memberJSP = prefix + '/memberJSP';
    _public.bossJSP = prefix + '/bossJSP';
    _public.infoJSP = prefix + '/infoJSP';

    _public.index = prefix + '/../html/index/html';
    _public.makeScore = prefix +  '/makeScore';


    _public.qqLink = prefix + '/qqLink';
    _public.EmailVer = prefix + '/EmailVer';



    _public.getcomfirm = prefix + '/getcomfirm';

    _public.allRefuse = prefix + '/allRefuse';
    _public.isLooked = prefix + '/isLooked';

    _public.findpwd = prefix + '/findpwd';

    exports.getUrl = function(name, param) {
        return _public[name] ? exports[name].replace('{id}', param) : null;
    };

});