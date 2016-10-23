/**
 * 在checkbox上加上属性data-id
 *
 * options
 * url: 后台请求路径
 * onDataLoad
 * queryParams
 * onBeforeDataLoad
 * onSelected: 选中或者取消的时候的处理事件
 *
 * 发送到后台，自动带上 page=&rows=
 * 后台发送给前端, {data: ,totalPage: }
 *
 * return
 *  getSelected@function 返回选中的条目
 */
define(function (require, exports, module) {
    var jQuery = require('jquery');
    (function($) {
        $.fn.extend({
            pcPage: function(data) {
                var options = data.options || {};
                var renderData = data.renderData || function() {},
                    beforeDataLoad = data.onBeforeDataLoad || function(){},
                    pageChange = data.pageChange || function() {},
                    dataLoad = data.onDataLoad || function(){};

                var $this = $(this);

                var $pagination = $(this).on('click', 'a', function() {
                    var $this = $(this);pageChange(this);
                    if($this.hasClass('next')) {
                        if(options.currPage < options.totalPage) {
                            loadData(++options.currPage);
                        }else {
                            //totalPage 为NaN
                            loadData(options.currPage);
                        }
                    }else if($this.hasClass('pre')){
                        if(options.currPage > 1) {
                            loadData(--options.currPage);
                        }else {
                            //totalPage 为NaN
                            loadData(options.currPage);
                        }
                    }else{
                        var page = $this.data('page');
                        page && loadData(options.currPage = parseInt(page));
                    }

                    return false;
                });

                function init() {

                    options = $.extend({
                        currPage: 1,
                        rows: 10,
                        totalPage: 1,
                        totalNumber: -1,
                        paginationNum: 6 //显示分页的个数
                    }, options);

                }

                function loadData() {
                    beforeDataLoad();
                    loadQueryData({
                        rows: options.rows,
                        page: options.currPage
                    });
                }

                function loadQueryData(query, isReset) {
                    if(isReset) init();
                    query = $.extend(data.queryParams, query);
                    $.ajax({
                        url: data.url,
                        data: query,
                        cache: false,
                        type: data.type || 'get'
                    }).done(function(sData) {
                        options.totalPage = Math.ceil(sData.size / options.rows);
                        renderData(sData);
                        renderPagination();
                        dataLoad()
                    })
                }

                function renderPagination() {
                    var prev = '<li><a href="#" class="pre" title="上一页">上一页</a></li>',
                        next = '<li><a href="#" class="next" title="下一页">下一页</a></li>',
                        prev_disabled ='<li><a href="#" class="pre disabled" title="上一页">上一页</a></li>',
                        next_disabled = '<li><a href="#" class="next disabled" title="下一页">下一页</a></li>';


                    var pages = '';

                    // 总页数比需要分数的数目大
                    if(options.totalPage > options.paginationNum) {
                        // 当前页数在前一半
                        if(options.currPage <= options.paginationNum/2) {
                            for(var i = 1; i < options.paginationNum; i++) {
                                if(options.currPage == i)
                                    pages += '<li class="active"><a href="#"  class="disabled"  data-page="'+i+'">'+i+'</a></li>'
                                else
                                    pages += '<li><a href="#" data-page="'+i+'">'+i+'</a></li>'
                            }
                            pages += '<li><a>...</a>';
                            pages += '<li><a data-page="'+options.totalPage+'">'+options.totalPage+'</a>';
                        }else if(options.currPage >= options.totalPage - options.paginationNum/2) {
                            // 当前页在后面
                            pages += '<li><a data-page="1">1</a>';
                            pages += '<li><a>...</a>';

                            for(var i = options.totalPage - options.paginationNum + 2; i <= options.totalPage; i++) {
                                if(options.currPage == i)
                                    pages += '<li class="active"><a href="#"  class="disabled"  data-page="'+i+'">'+i+'</a></li>'
                                else
                                    pages += '<li><a href="#" data-page="'+i+'">'+i+'</a></li>'
                            }
                        }else{
                            // 当前页在中间
                            pages += '<li><a data-page="1">1</a>';
                            pages += '<li><a>...</a>';

                            for(var i = options.currPage - Math.floor(options.paginationNum/2) + 1; i < options.currPage + Math.floor(options.paginationNum/2) - 1; i++) {
                                if(options.currPage == i)
                                    pages += '<li class="active"><a href="#"  class="disabled"   data-page="'+i+'">'+i+'</a></li>';
                                else
                                    pages += '<li><a href="#" data-page="'+i+'">'+i+'</a></li>';

                            }

                            pages += '<li><a>...</a>';
                            pages += '<li><a data-page="'+options.totalPage+'">'+options.totalPage+'</a>';
                        }
                    }else{
                        for(var i = 1; i <= options.totalPage; i++) {
                            if(options.currPage == i)
                                pages += '<li class="active"><a href="#" class="disabled"  data-page="'+i+'">'+i+'</a></li>'
                            else
                                pages += '<li><a href="#" data-page="'+i+'">'+i+'</a></li>'
                        }
                    }
                    if(options.totalPage <= 1 || isNaN(options.totalPage) ){
                        $pagination.html("<span class='hide'></span>");
                    }else{
                        if(options.currPage == 1){
                            prev = prev_disabled;
                        }
                        if(options.currPage == options.totalPage){
                            next = next_disabled;
                        }
                        $pagination.html(prev + pages + next);
                    }
                }

                init();
                loadData();

                return $.extend(this, {
                    extendsOption: function(opts) {
                        options = $.extends(options, opts);
                    },
                    query: function(params) {
                        loadQueryData(params, true);
                    },
                    reload: function() {
                        loadData();
                    }
                })
            }
        });
    })(jQuery);

})