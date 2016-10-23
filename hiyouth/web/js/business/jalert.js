define(function (require, exports, module) {
    var jQuery = require('jquery');
// jQuery Alert Dialogs Plugin
//
// Version 1.0
//
// Cory S.N. LaViska
// A Beautiful Site (http://abeautifulsite.net/)
// 29 December 2008
//
// This is an altered version form Aurélien Malisart <aurelien.malisart@gmail.com>
//
// Visit http://github.com/aurels/jquery.alerts
// Visit http://abeautifulsite.net/notebook/87 for more information
//
    (function($) {

        $.alerts = {
            //define the img that might be use
            img_red:"data:image/png;base64,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",
            img_green:"data:image/png;base64,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",
            // These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time

            verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
            horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
            repositionOnResize: true,           // re-centers the dialog on window resize
            overlayOpacity: .21,                // transparency level of overlay
            overlayColor: '#FFF',               // base color of overlay
            draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
            okButton: '&nbsp;确定&nbsp;',         // text for the OK button (not used anymore in this version)
            cancelButton: '&nbsp;取消&nbsp;',    // text for the Cancel button (not used anymore in this version)
            dialogClass: null,                  // if specified, this class will be applied to all dialogs
            displaying:false,                   //displaying or not
            queue:[],                            //queue for store alert function
            // Public methods
            alert: function(message, ok, callback) {
                var work = (function (message, ok, callback) {
                   return function(){
                        $.alerts._show(message, null, ok, null, 'alert', function(result) {
                            if( callback ) callback(result);
                        });
                   }
                })(message, ok, callback);

                if( $.alerts.displaying == false && $.alerts.queue.length == 0){
                    work();
                }else {
                    $.alerts.queue.push(work);
                }
            },


            timeout: function(message, ok, callback,second) {


                var work = (function (message, ok, callback,second) {
                    return function(){
                        var count = second;
                        var pri_timer = setInterval(function () {
                            "use strict";
                            --count;

                            if (count == -1) {
                                if ($("#popup_ok").length != 0) $("#popup_ok").click();
                                clearInterval(pri_timer);
                            } else {
                                $("#popup_count").text("(" + count + ")");
                            }

                        }, 1000);
                        $.alerts._show(message, null, ok, null, 'timeout', function (result) {
                            if (callback) callback(result);
                            (function () {
                                clearInterval(pri_timer);
                            })();
                        }, second);
                    }
                })(message, ok, callback,second);



                if( $.alerts.displaying == false && $.alerts.queue.length == 0) {
                    work();
                }else {
                    $.alerts.queue.push(work);
                }
            },

            confirm: function(message, ok, cancel, callback) {


                var work = (function (message, ok,cancel, callback) {
                    return function(){
                        $.alerts._show(message, null, ok, cancel, 'confirm', function(result) {
                            if( callback ) callback(result);

                        });

                    }
                })(message, ok,cancel, callback);

                if( $.alerts.displaying == false && $.alerts.queue.length == 0){
                    work();
                }else {
                    $.alerts.queue.push(work);
                }
            },

            prompt: function(message, value, ok, cancel, callback) {


                var work = (function (message,value, ok,cancel, callback) {
                    return function(){
                        $.alerts._show(message, value, ok, cancel, 'prompt', function(result) {
                            if( callback ) callback(result);
                        });

                    }
                })(message,value, ok,cancel, callback);

                if( $.alerts.displaying == false && $.alerts.queue.length == 0){
                    work();
                }else {
                    $.alerts.queue.push(work);
                }
            },

            // Private methods
            _next:function(){
                "use strict";
                $.alerts.displaying = false;
                if($.alerts.queue.length > 0){
                    $.alerts.queue.shift()();
                }
            },
            _show: function(msg, value, ok, cancel, type, callback,count) {
                $.alerts.displaying = true;
                $.alerts._hide();
                $.alerts._overlay('show');

                $("body").append(
                    '<div id="popup_container">' +
                    '<div id="popup_content">' +
                    '<div id="popup_message"></div>' +
                    '</div>' +
                    '</div>');

                if( $.alerts.dialogClass ) $("#popup_container").addClass($.alerts.dialogClass);

                // IE6 Fix
                var pos = ($.browser && $.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed';

                $("#popup_container").css({
                    position: pos,
                    zIndex: 99999,
                    padding: 0,
                    margin: 0
                });

                $("#popup_content").addClass(type);
                $("#popup_message").text(msg);
                $("#popup_message").html( $("#popup_message").text().replace(/\n/g, '<br />') );

                $("#popup_container").css({
                    minWidth: $("#popup_container").outerWidth(),
                    maxWidth: $("#popup_container").outerWidth()
                });

                $.alerts._reposition();
                $.alerts._maintainPosition(true);
                switch( type ) {
                    case 'alert':
                        $("#popup_message").after('<div id="popup_panel"><a id="popup_ok" >' + ok + '</a></div>');
                        $("#popup_ok").click( function() {
                            $.alerts._hide();
                            $.alerts._next();
                            callback(true);
                        });
                        $("#popup_ok").focus().keypress( function(e) {
                            if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
                        });
                        break;
                    case 'timeout':
                        $("#popup_message").after('<div id="popup_panel"><a id="popup_ok" >' + ok + '<span id="popup_count">(' + count + ')</span></a></div>');
                        $("#popup_ok").click( function() {
                            $.alerts._hide();
                            $.alerts._next();
                            callback(true);
                        });
                        $("#popup_ok").focus().keypress( function(e) {
                            if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
                        });
                        break;

                    case 'confirm':
                        $("#popup_message").after('<div id="popup_panel"><a  id="popup_ok" >' + ok + '</a> <a id="popup_cancel" >' + cancel + '</a></div>');
                        $("#popup_ok").click( function() {
                            $.alerts._hide();
                            $.alerts._next();
                            if( callback ) callback(true);
                        });
                        $("#popup_cancel").click( function() {
                            $.alerts._hide();
                            $.alerts._next();

                            if( callback ) callback(false);
                        });
                        // $("#popup_ok").focus();
                        $("#popup_ok, #popup_cancel").keypress( function(e) {
                            if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
                            if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
                        });
                        break;
                    case 'prompt':
                        $("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel"><a id="popup_ok" >' + ok + '</a> <a id="popup_cancel" >' + cancel + '</a></div>');
                       // $("#popup_prompt").width($("#popup_message").width() );
                        $("#popup_ok").click( function() {
                            var val = $("#popup_prompt").val();
                            $.alerts._hide();
                            $.alerts._next();
                            if( callback ) callback( val );
                        });
                        $("#popup_cancel").click( function() {
                            $.alerts._hide();
                            $.alerts._next();
                            if( callback ) callback( null );
                        });
                        $("#popup_prompt, #popup_ok, #popup_cancel").keypress( function(e) {
                            if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
                            if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
                        });
                        if( value ) $("#popup_prompt").val(value);
                        $("#popup_prompt").focus().select();
                        break;
                }

                // Make draggable
                // if( $.alerts.draggable ) {
                // 				try {
                // 					//$("#popup_container").draggable({ handle: $("#popup_title") });
                // 					//$("#popup_title").css({ cursor: 'move' });
                // 				} catch(e) { /* requires jQuery UI draggables */ }
                // 			}
            },

            _hide: function() {
                $("#popup_container").fadeOut().remove();
                $.alerts._overlay('hide');
                $.alerts._maintainPosition(false);

            },

            _overlay: function(status) {
                switch( status ) {
                    case 'show':
                        $.alerts._overlay('hide');
                        $("BODY").append('<div id="popup_overlay"></div>');
                        $("#popup_overlay").css({
                            position: 'absolute',
                            zIndex: 99998,
                            top: '0px',
                            left: '0px',
                            width: '100%',
                            height: $(document).height(),
                            background: $.alerts.overlayColor,
                            opacity: $.alerts.overlayOpacity,
                            display:"none"
                        });
                        break;
                    case 'hide':
                        $("#popup_overlay").remove();

                        break;
                }
            },

            _reposition: function() {


                var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
                var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
                if( top < 0 ) top = 0;
                if( left < 0 ) left = 0;

                // IE6 fix
                if( $.browser && $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window).scrollTop();

                $("#popup_container").css({
                    top: top + 'px',
                    left: left + 'px',
                    display:"none"
                });
                $("#popup_container").fadeIn();
                $("#popup_overlay").height( $(document).height() );
            },

            _maintainPosition: function(status) {
                if( $.alerts.repositionOnResize ) {
                    switch(status) {
                        case true:
                            $(window).bind('resize', function() {
                                $.alerts._reposition();
                            });
                            break;
                        case false:
                            $(window).unbind('resize');
                            break;
                    }
                }
            }

        };

        // Shortuct functions
        var custom_Alert = function(message, ok, callback) {
            $.alerts.alert("<h2><img src='"+$.alerts.img_green+"'/></h2>"+message, ok ||"确定", callback);
        };

         var custom_error = function(message, ok, callback) {
            $.alerts.alert("<h2><img src='"+$.alerts.img_red+"'/></h2>"+message, ok ||"确定", callback);
        };

        var custom_timeout = function(message, ok, callback,second) {
            $.alerts.timeout("<h2><img src='"+$.alerts.img_green+"'/></h2>"+message, ok ||"确定", callback,second);
        };


        var custom_confirm = function(message, ok, cancel, callback) {
            $.alerts.confirm("<h2 style='font-size: 48px;line-height: 94px;color: #16d0d8;'>NOTICE</h2>"+message,  ok, cancel, callback);
        };

        var custom_prompt = function(message, value, ok, cancel, callback)  {
            $.alerts.prompt("<h2 style='font-size: 48px;line-height: 94px;color: #16d0d8;'>NOTICE</h2>"+message, value, ok, cancel, callback);
        };


        var jalert = {
            alert:custom_Alert,
            timeout:custom_timeout,
            confirm:custom_confirm,
            prompt:custom_prompt,
            error:custom_error

        };

        if (typeof module !== 'undefined' && module) {
            module.exports = jalert;
        }
    })(jQuery);


});