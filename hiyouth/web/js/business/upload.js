/**
 * {
            host: obj['host'];
            policyBase64: obj['policy'];
            accessid: obj['accessid'];
            signature: obj['signature'];
            expire: parseInt(obj['expire']);
            callbackbody: obj['callback'];
            key: obj['dir'];
        }

 param: {
            realname: '真实姓名',
            idcard_num: '省份证',
            idcar_pic: '3张图片名字'
        }
 */
"use strict";

define(function (require, exports, module) {

    var $ = require('jquery'),
        common = require('lib/common');

    var _public = module.exports;
    var _private = {};

    var option = {
        btns: [], // 触发上传按钮
        error: function() {},
        done: function() {},
        add: function() {},
        progress: function() {}  // 上传进度控制
    };

    _private.init = function(options) {
        var _this = this;
        _this.option = options;
        _this.uploader = new plupload.Uploader({
            runtimes: 'html5,flash,silverlight,html4',
            //multi_selection: false,
            flash_swf_url: '../util/plupload-2.1.2/js/Moxie.swf',
            silverlight_xap_url: '../util/plupload-2.1.2/js/Moxie.xap',
            container: document.body,
            browse_button: _this.option.btns,
            url: 'http://oss.aliyuncs.com',

            filters: {
                mime_types: [ //只允许上传图片和zip,rar文件
                    {title: "Image files", extensions: "jpg,gif,png,bmp"},
                ],
                max_file_size: '10mb', //最大只能上传10mb的文件
                prevent_duplicates: true //不允许选取重复文件
            },
            init: {
                PostInit: function () {
                    console.log('init')
                },
                FilesAdded: function(up, files) {
                    _this.option.add(up, files);
                },
                FileUploaded: function (up, files, info) {
                    //plupload.each(files, function (file) {});
                    _this.option.done(info);
                },
                UploadProgress: function (up, file) {
                    //$("label." + file.id).html(file.percent + '%');
                    // 更新上传进度
                    _this.option.progress(file);
                },
                Error: function (up, err) {
                    _this.option.error(err)
                }
            }
        });
        _this.uploader.init();
    };

    _private.send = function(si) {
        var _this = this;
        _this.uploader.setOption({
            'url': si.alioss.host,
            'multipart_params': {
                'key': si.alioss.dir + si.name,
                'policy': si.alioss.policy,
                'OSSAccessKeyId': si.alioss.accessid,
                'success_action_status': '200', //让服务端返回200,不然，默认会返回204
                'signature': si.alioss.signature
            }
        });
        _this.uploader.start();
    }

    _public.getUploader = function() {
        function uploader() {
            this.init = _private.init;
            this.send = _private.send;
        }

        return new uploader()
    }
});