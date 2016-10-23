"use strict";

define(function (require, exports, module) {
    var $ = require('jquery'),
        template = require('lib/template'),
        router = require('business/router');

    var _public = module.exports = {},
        _private = {};

    _private.errorCode = {};

    _public.getVersion = function() {
        var agent = navigator.userAgent.toLowerCase();
        var regStr_ie = /msie [\d.]+;/gi;
        var regStr_ff = /firefox\/[\d.]+/gi
        var regStr_chrome = /chrome\/[\d.]+/gi;
        var regStr_saf = /safari\/[\d.]+/gi;

        if (agent.indexOf("msie") > 0) {
            return agent.match(regStr_ie);
        }else if (agent.indexOf("firefox") > 0) {
            return agent.match(regStr_ff);
        }else if (agent.indexOf("chrome") > 0) {
            return agent.match(regStr_chrome);
        }else if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
            return agent.match(regStr_saf);
        }else{
            return false;
        }
    }

    _public.sendRequest = function(params) {
        return $.ajax(params)
    }
    _public.sendPost = function(urlName, params) {
        return this.sendRequest($.extend({data: params}, {url: router.getUrl(urlName), type: 'post'}))
    }
    _public.send = function(urlName, params) {
        var url = '', self = this;
        if( url = router.getUrl(urlName) ) {
            return self.sendRequest($.extend({data: params}, {url: url}));
        }else{
            return null;
        }
    }
    _public.template = function(id, data, container, isAppend) {
        var $con = container,
            html = template(id, data);

        if(!(container instanceof jQuery)) $con = $(container);
        if(isAppend) $con.append(html);
        else $con.html(html)
    }
    _public.skipUri = function(url) {
        window.location.href = url
    }

    /**
     * @description 获取当前日期
     */
    _public.getDateStr = function(){
        var date = new Date();
        var day = String(date.getDay());
        var month = String(date.getMonth() + 1);
        var year = String(date.getFullYear());

        return year + month + day;
    };

    /**
     * @description 获取当前日期
     * @param ts 时间戳
     * @param format 时间格式 默认 YYYY-MM-DD hh:mm:ss
     */
    _public.getDateFormat = function(ts,format){
        function addZero(num){
            return num > 9 ? num : '0' + num;
        }
        var d = typeof ts == 'undefined' ? new Date() : new Date(ts);
        typeof format == 'undefined' && (format = 'YYYY-MM-DD hh:mm:ss');
        var date = String( addZero(d.getDate()) );
        var month = String( addZero(d.getMonth() + 1) );
        var year = String(d.getFullYear());
        var hour = String( addZero(d.getHours()) );
        var minute = String( addZero(d.getMinutes()) );
        var second = String( addZero(d.getSeconds()) );
        var str = format.replace(/YYYY/g,year).replace(/MM/g,month).replace(/DD/g,date).replace(/hh/g,hour).replace(/mm/g,minute).replace(/ss/g,second);
        return str;
    };

    _public.parseURL = function(url) {
        var a =  document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':',''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function(){
                var ret = {},
                    seg = a.search.replace(/^\?/,'').split('&'),
                    len = seg.length, i = 0, s;
                for (;i<len;i++) {
                    if (!seg[i]) { continue; }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
            hash: a.hash.replace('#',''),
            path: a.pathname.replace(/^([^\/])/,'/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
            segments: a.pathname.replace(/^\//,'').split('/')
        };
    };

    /**
     * 异步加载css
     * @param  {string} src css地址
     */
    _public.loadCss = function(src){
        $("<link>").attr({type:"text/css", rel:"stylesheet", href:src}).appendTo("head");
    };
});