// JavaScript Document

$('.login .login_btn').click(function() {alert('测试')});
$("body").keydown(function() {
             if (event.keyCode == "13") {//keyCode=13是回车键
                 $(".login .login_btn").click(function() {alert('测试')});
             }
         });

//banner
$(function() {
	var sWidth = $("#focus").width(); //获取焦点图的宽度（显示面积）
	var len = $("#focus ul li").length; //获取焦点图个数
	var index = 0;
	var picTimer;
	
	//以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
	var btn = "<div class='btnBg'></div><div class='btn'>";
	for(var i=0; i < len; i++) {
		btn += "<span></span>";
	}
	$("#focus").append(btn);

	//为小按钮添加鼠标滑入事件，以显示相应的内容
	$("#focus .btn span").mouseover(function() {
		index = $("#focus .btn span").index(this);
		showPics(index);
	}).eq(0).trigger("mouseover");

	//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
	$("#focus ul").css("width",sWidth * (len));
	
	//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
	$("#focus").hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
			showPics(index);
			index++;
			if(index == len) {index = 0;}
		},7000); //此7000代表自动播放的间隔，单位：毫秒
	}).trigger("mouseleave");
	
	//显示图片函数，根据接收的index值显示相应的内容
	function showPics(index) { //普通切换
		var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
		$("#focus ul").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
		$("#focus .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
		//$("#focus .btn span").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},300); //为当前的按钮切换到选中的效果
	}
});


$(function(){
	$(".tabbg .tab_header li:eq(0)").addClass("Active");
	$(".tabbg .tab_con:eq(0)").show();
	$(".tabbg .tab_header").after('<div style="clear:both;"></div>');
    //tab切换效果
	$("#zxzx .tab_header li").hover(function(){
		var x = $(this).index();
		    $("#zxzx .tab_header li").eq(x).addClass("Active").siblings().removeClass("Active");
		    $("#zxzx .tab_con").eq(x).show().siblings(".tab_con").hide();
	});	
	
	$("#yxzy .tab_header li:eq(0)").addClass("act");
	$("#yxzy .tab_header li").hover(function(){
		var x = $(this).index();
		    $("#yxzy .tab_header li").eq(x).addClass("act").siblings().removeClass("act");
		    $("#yxzy .tab_con").eq(x).show().siblings(".tab_con").hide();
	});	
});

//弹出层
$(function(){
	$("#yxjt a").click(function(){
		//var x = $(this).index();
		var w =  $("body").width();
		var h =  $("body").height();
		$("#photobg").css({"width":w,"height":h});
		var src = $(this).children("img").attr("src");
		$("#photo").children("img").attr("src",src);
		//var ws = $(this).children("a").children("img").width();
	    //var hs = $(this).children("a").children("img").height();
	    //var w = $("#photo>a>img").width();
	   // var h = $("#photo>a>img").height();
		$("#photo").fadeIn(300);
		$("#photobg").fadeIn(300);
		
	});
	$("#closed").click(function(){
		$("#photo").fadeOut(300);
		$("#photobg").fadeOut(300);
	});
});

//内容图片居中
//$(function(){
//	var classname = 'neirong';//内容class名
//	var bgw = $('.'+classname).width();
//	var imgl = $('.'+classname+' img').length;	
//	for( i=0; i<imgl; i++){
//	    var imgw = $('.'+classname+' img:eq('+i+')').width();
//	    var imgh = $('.'+classname+' img:eq('+i+')').height();
//		if(imgw < bgw){
//			var imgleft = (bgw/2)-(imgw/2); 
//			$('.'+classname+' img:eq('+i+')').attr('style','margin-left:'+imgleft+'px;');	
//		}else{
//			var imgbgw = bgw;
//			var imgbgh = imgh*bgw/imgw;
//			$('.'+classname+' img:eq('+i+')').attr('style','width:'+imgbgw+'px;height:'+imgbgh+'px;');
//		}	
//	}
//});

//服务器列表tab
$(function(){
	$("#severtab .severtab_head li:eq(0)").addClass("acvtiv");
	$("#severtab .severtab_con:eq(0)").show();
	$("#severtab .severtab_head").after('<div style="clear:both;"></div>');
	$("#severtab .severtab_con").append('<div style="clear:both;"></div>');
    //tab切换效果
	$("#severtab .severtab_head li").click(function(){
		var x = $(this).index();
		$("#severtab .severtab_head li").eq(x).addClass("acvtiv").siblings().removeClass("acvtiv");
		$("#severtab .severtab_con").eq(x).show().siblings(".severtab_con").hide();
	});	

//游戏职业
	$("#yxzy .yxzy_header li").eq(0).addClass("acvt");
	$("#yxzy .yxzy_header li").hover(function(){
		var x = $(this).index();
		$("#yxzy .yxzy_header li").eq(x).addClass("acvt").siblings().removeClass("acvt");
		if(x==0){$("#yxzy").css("background","url(images/zs.jpg)");}	
		if(x==1){$("#yxzy").css("background","url(images/fs.jpg)");}
		if(x==2){$("#yxzy").css("background","url(images/yx.jpg)");}	
	});
});


//游戏截图图片处理

$(function(){
	$(".img_list li:odd").css("margin-left","75px");
	$(".img_list .line:last").remove();
	$(".img_list li").hover(function(){
		  $(this).children("a").children("img").css("border","#a3d929 solid 3px");
		  $(this).children("span").css("color","#a3d929");
	},function(){
		  $(this).children("a").children("img").css("border","#fff solid 3px");
	      $(this).children("span").css("color","#111");  
	});
	
});

//激活码点击领取
$(function(){
	$(".libaobtn").click(function(){
		$(this).next().show();
	});
});

