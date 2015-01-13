/**
 * 图片拖动滚动条显示
 * @version 0.1
 * @author xiaodc
 * 20131118 add
 * 
 */
 

(function($){
    $.fn.scrollImgBlock = function(opts){
		var defaults = {
			//相关属性设置	
		};
		
		this.each(function(){
			//合并参数
			var opts = $.extend(defaults, opts);
			
			
			//实现的功能设置
			//整个容器
            var $el = $(this);
            var _elWidth = $el.width();
            
            //图片元素数组及其数量
            var $imgArr, _imgCount = 0;
            //图片容器宽度
            var _sumWidth = 0;
            
            //滚动槽
            var $slideScrollBar = $el.find('.slide-scroll-bar');
            //滚动槽容器宽度
            var _scrollBarWidth = $slideScrollBar.innerWidth();
            //拖动块
            var $slideScrollBlock = $el.find('.slide-scroll-block');
            var _scrollBlockWidth = _scrollBarWidth;
            var _scrollBlockMaxLeft = 0;
            
            //图片显示区域滚动容器
            var $slideBlock = $el.find('.slide-block');
            
            //是否已经初始化基本参数
            var _hasInitWidth = false;
            
            //可视宽度占总图片容器宽度的比率
            var _rate;
            
            /**
             * 设置宽高
             */
            var _initWidth = function(el){
                var $sinSlideImgBlock = $(el).closest('.sin-slide-img-block');
                
                //new一个image对象
                var image = new Image();
                image.src = $(el).attr('src');
                //根据显示高度和图片原始高度的比率计算得图片显示宽度
                //避免发生onload事件后，浏览器对图片进行自适应宽度缩放时取到的width为0的问题
                var _imgShowWidth = image.width * (260/image.height);
                $(el).width(_imgShowWidth);
                $sinSlideImgBlock.width(_imgShowWidth);
                
                _sumWidth = $sinSlideImgBlock.outerWidth() * _imgCount;
                
                $el.find('.slide-block-content').width(_sumWidth + _imgCount);
                
                var _imgWidth = $(el).width();
                
                return _imgWidth;
            };
            
            var _setScrollEvent = function(){
                //获取可是区域宽度与图片总长度的比率
                _rate = _elWidth/_sumWidth;
                
                //设置拖动块长度
                _scrollBlockWidth = _scrollBarWidth * _rate;
                $slideScrollBlock.width(_scrollBlockWidth);
                
                _scrollBlockMaxLeft = _scrollBarWidth - $slideScrollBlock.outerWidth();
                
                
                _setScrollBlockEvent();
                _setScrollBarEvent();
                _setScrollButtonEvent();
                
            };
            
            //设置拖动块的事件
            var _setScrollBlockEvent = function(){
                        
                var _startPosX = 0;
                
                //拖动块拖动事件
                var moveEvent = function(e){
                    var posX = e.pageX;
                    
                    _scrollBlockMove(posX - _startPosX);
                    
                    _startPosX = posX;
                };
                
                $slideScrollBlock.on('mousedown', function(e){
                    _startPosX = e.pageX; 
                    
                    $('body').on('mousemove', moveEvent);
                    
                });
                
                $('body').on('mouseup mouseleave', function(e){
                    $(this).off('mousemove', moveEvent);
                });
            };
            
            //设置滚动槽事件
            var _setScrollBarEvent = function(){
                var aniTime = 20;
                var aniMoveDis = 2;
                
                //var _scrollBarPosLeft = $slideScrollBar.offset().left;
                var _scrollBlockPosLeft;
                
                //保存setTimeout事件
                var _scrollThreadEvent = null;
                
                //用于滚动槽按下后定时调用
                var _scrollThread = function(_slideScrollBar, e){
                    if(_slideScrollBar !== e.target){
                        return;
                    }
                    
                    var posX = e.pageX;
                    _scrollBlockPosLeft = $slideScrollBlock.offset().left;
                    
                    if(posX < _scrollBlockPosLeft){
                        _scrollBlockMove(-aniMoveDis);
                    } else if(posX > (_scrollBlockPosLeft + _scrollBlockWidth)){
                        _scrollBlockMove(aniMoveDis);
                    }
                    
                    
                    _scrollThreadEvent = setTimeout(function(){
                        _scrollThread(_slideScrollBar, e);
                    }, aniTime);
                };
                
                //mouse down
                var  _slideScrollBarMousedown = function(e){
                	clearTimeout(_scrollThreadEvent);
                	
                    var _slideScrollBar = this;
                    
                    _scrollThread(_slideScrollBar, e);
                    
                    //mouse move
                    var bodyMousemove = function(e){
                        clearTimeout(_scrollThreadEvent);
                        _scrollThread(_slideScrollBar, e);
                    };
                    
                    $('body').on('mousemove', bodyMousemove);
                    
                    //mouse up
                    var bodyMouseup = function(e){
                        clearTimeout(_scrollThreadEvent);
                        $('body').off('mousemove', bodyMousemove);
                        $('body').off('mouseup mouseleave', bodyMouseup);
                    };
                    
                    $('body').on('mouseup mouseleave', bodyMouseup);
                };
                
                //绑定滚动槽鼠标按键下按事件
                $slideScrollBar.on('mousedown', _slideScrollBarMousedown);
                
            };
            
            
            //设置滚动按钮事件
            var _setScrollButtonEvent = function(){
            	
            	var $scrollButton = $el.find('.slide-block-button-left, .slide-block-button-right');
            	
                var aniTime = 30;
                var aniMoveDis = 5;
                
                var _scrollBlockPosLeft;
                
                //保存setTimeout事件
                var _scrollThreadEvent = null;
                
                //用于滚动按钮按下后定时调用
                var _scrollThread = function(_slideScrollButton, e){
                    
                    var posX = e.pageX;
                    _scrollBlockPosLeft = $slideScrollBlock.offset().left;
                    
                    if($(_slideScrollButton).hasClass('left-button')){
                        _scrollBlockMove(-aniMoveDis);
                    } else if($(_slideScrollButton).hasClass('right-button')){
                        _scrollBlockMove(aniMoveDis);
                    }
                    
                    _scrollThreadEvent = setTimeout(function(){
                        _scrollThread(_slideScrollButton, e);
                    }, aniTime);
                };
                
                //mouse down
                var  _slideScrollButtonMousedown = function(e){
                    var _slideScrollButton = this;
                    
                    _scrollThread(_slideScrollButton, e);
                    
                    //mouse up
                    var buttonMouseup = function(e){
                        clearTimeout(_scrollThreadEvent);
                        $scrollButton.off('mouseup mouseleave', buttonMouseup);
                    };
                    
                    $scrollButton.on('mouseup mouseleave', buttonMouseup);
                };
                
                //绑定滚动槽鼠标按键下按事件
                $scrollButton.on('mousedown', '.left-button, .right-button', _slideScrollButtonMousedown);
                
            };
            
            /**
             * 用于滚动图片显示区域
             */
            var _slideBlockScroll = function(scrollBlockLeft){
                //$slideBlock.scrollLeft(scrollBlockLeft / _rate);
            	$slideBlock.find('.slide-block-content').css({'margin-left': -(scrollBlockLeft / _rate)});
            };
            
            /**
             * 用于拖动块事件
             */
            var _scrollBlockMove = function(moveDist){
                var _left = $slideScrollBlock.position().left||0;
                
                var _newLeft = _left + moveDist;
                
                _newLeft = _newLeft > 0 ? _newLeft : 0;
                
                if(_newLeft > _scrollBlockMaxLeft){
                    _newLeft = _scrollBlockMaxLeft;
                }
                $slideScrollBlock.css({'left': _newLeft});
                
                //图片显示跟随滚动
                _slideBlockScroll(_newLeft);
                
            };
            
            
            
            //初始化类
            var _init = function(){
                $imgArr = $el.find('img');
                _imgCount = $imgArr.length;
                
                var _imgWidth = 0;
                
                $imgArr.on('load', function(){
                    var $img = $(this);
                    
                    //只在第一个完成加载的图片加载完后触发
                    if(!_hasInitWidth){
                        _imgWidth = _initWidth($img);
                        _hasInitWidth = true;
                        
                        //设置滚动槽和拖动块事件
                        _setScrollEvent();
                        //_setScrollBarEvent();
                        //_setScrollBlockEvent();
                        //_showImg(true, '');
                    }
                    
                    $img.closest('.sin-slide-img-block').width(_imgWidth);
                    
                });
                
                    
                $imgArr.each(function(){
                    var $img = $(this);
                    var lazyloadSrc = $.trim($img.attr('lazyload'));
                    if('' != lazyloadSrc){
                        $img.attr('src', lazyloadSrc);  
                    }
                });
            };
            
            _init();
			
            return $el;
		});
	};
})(jQuery);