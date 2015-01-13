
$(document).ready(function(){
    // 幻灯片
    $(function(){
        $("#slide_imgs").kinMaxShow({
            width: 328,
            height: 162,
            intervalTime:2,
            button:{
                showIndex:true,
                normal:{borderRadius: '10px', borderColor: '#fff',color:"#fff", backgroundColor: '#fff', borderColor: '#D1D0F1'},
                focus:{color:"#13b7ff", backgroundColor: '#13b7ff', borderColor: '#D1D0F1'}
            }
        });
        
        $("#slide_imgs .KMSPrefix_slide_imgs_button").css({'right':5, 'bottom':5});

        $('#links-hd').on('click', function(){
            $('#links-wrap').fadeToggle('fast');
        });

    });

    //主页标签页切换
    $('#index_news .tab').on('mouseenter', function(){

        if($(this).hasClass('select')){
            return false;
        }
        
        var dataShow = $(this).attr('data-show');
                
        if('yxjt' === dataShow){
            $('#index_news .select').removeClass('select');         
            $('#index_news .index-news-content').fadeOut(200, function(){
                $('#index_news .index-img-content').fadeIn(300);
            });
        } else{
            
            var el = $('#index_news .'+dataShow);            
            if(el.length > 0){
                $('#index_news .select').removeClass('select');
                $('#index_news .lb').css({'display':'none'});
            }            
            $('#index_news .index-img-content').fadeOut(200, function(){
                $('#index_news .index-news-content').fadeIn(300);
            });
            el.css({'display':'block'});
        }
        
        
        $(this).addClass('select');
    })
    
	/*
    //列表标签页切换
    $('#tab_line .tab').on('mouseenter', function(){

        if($(this).hasClass('select')){
            return false;
        }
        
        var dataShow = $(this).attr('data-show');
                
        $('#tab_line .select').removeClass('select');
        $('#list_news_content .lb').css({'display':'none'});
        
        var el = $('#list_news_content .'+dataShow);
        el.css({'display':'block'});
        
        $(this).addClass('select');
    });
	*/
    
    //文章返回列表按钮
    try{
        var $backListButton = $('#back_list_button');
        if($backListButton.length > 0){
            var urlMatch = (location.href).match(/(.+\/)(.+)/);//console.log(urlMatch);
            if('undefined' !== typeof urlMatch[1]){
                $backListButton.attr('href', ''+urlMatch[1]);
            }
        }
    }catch(e){};
    
        
    $('#index_img_content').scrollImgBlock();
    
});


