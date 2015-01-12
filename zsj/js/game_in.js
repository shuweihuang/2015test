 //js调用

 //banner轮播
var sWidth = $("#kv").width(); //获取焦点图的宽度（显示面积）
var len = $("#kv .kv-img li").length; //获取焦点图个数
var index = 0;
var picTimer;
  
//为小按钮添加鼠标滑入事件，以显示相应的内容
$("#kv .kv-num li").mouseover(function() {
    index = $("#kv .kv-num li").index(this);
    showPics(index);
}).eq(0).trigger("mouseover");

//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
$("#kv .kv-img").css("width",sWidth * (len));

//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
$("#kv").hover(function() {
    clearInterval(picTimer);
},function() {
    picTimer = setInterval(function() {
        showPics(index);
        index++;
        if(index == len) {index = 0;}
    },5000); //此7000代表自动播放的间隔，单位：毫秒
}).trigger("mouseleave");

//显示图片函数，根据接收的index值显示相应的内容
function showPics(index) { //普通切换
    var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
    $("#kv .kv-img").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
    $("#kv .kv-num li").removeClass("focus").eq(index).addClass("focus"); //为当前的按钮切换到选中的效果
    //$("#focus .btn span").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},300); //为当前的按钮切换到选中的效果
}

// 戒指展示 切换效果
var x = 0;
var z = $(".jz-show a").length;
var y = setInterval(function () {
    x++;
    if(x>z){x=0;}
    $(".jz-show").children('a').eq(x).fadeIn(200).siblings('a').fadeOut(200);
    
},1000);


//tab 切换
$("#news-tab ul li").hover(function() {
    var x = $(this).index();
    if(x==0){$("#news-label").animate({left:"0px"}, 100);}else if(x==1){$("#news-label").animate({left:"120px"}, 100);}    
    $("#news-list ul").eq(x).show().siblings('ul').hide();  
});

//tab 切换2
$(".zy-nav li").click(function() {
    var x = $(this).index();
    $(this).addClass("on").siblings().removeClass("on");  
    $(".zy-fig").eq(x).addClass("show-fig").removeClass("hide-fig").siblings('.zy-fig').removeClass("show-fig").addClass("hide-fig");  
    $(".zy-text").eq(x).addClass("show-text").removeClass("hide-text").siblings('.zy-text').removeClass("show-text").addClass("hide-text"); 
});

//合作媒体
$(".media").hover(function() {
    $(this).addClass("show");
},function () {
    $(this).removeClass("show");
})

//合作媒体 滚动
$(".media-scroll").jCarouselLite({
    auto:800,
    speed:1000,
    vertical:true
})