
(function () {
	$.extend({
		changeQQ:function(){
            var QQDom="<a href='http://b.qq.com/webc.htm?new=0&sid=800089273&eid=2188z8p8p8p8z808K8y8P&o=&q=7' target='_blank'>800089273</a>";
            $("#qqcontact").html(QQDom);
            var getfar=$("#qqcontact").parent();
            var getStr=$("#qqcontact").remove();
            getfar.html("客服QQ：");
            getfar.append(getStr);
			

		}
	});
	$.changeQQ();
})(jQuery);
