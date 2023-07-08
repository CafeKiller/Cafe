
var $ = JQ = jQuery.noConflict(true);
// 屏幕自适应
var adaptViewport = (function () {
	function detectIE() {
		var ua = window.navigator.userAgent;
		var msie = ua.match(/MSIE (\d+)/g);
		if (msie != null) {
			return parseInt(msie[0].match(/\d+/g)[0]);
		}
		// IE 11
		var trident = ua.indexOf("Trident/");
		if (trident > 0) {
			var rv = ua.indexOf("rv:");
			return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
		}
		return false;
	}

	var minWidth = 750; // 最小宽度
	var designWidth = 1920; // 设计稿宽度
	var isFirefox = navigator.userAgent.indexOf("Firefox") != -1;
	var ieVersion = detectIE();
	var zoom = 1;

	function resize() {
		// doc.clientWidth不包含滚动栏宽度
		var ww = document.documentElement.clientWidth || window.innerWidth;
		var realWid = Math.max(ww, minWidth);
		zoom = realWid / designWidth;
		if (ieVersion && ieVersion < 9) {
			return;
		}
		// firefox不支持zoom. ie9,10,11 zoom表现奇怪
		if (isFirefox || ieVersion >= 9) {
			if (zoom !== 1) {
				if (!$(".wrap").parent().hasClass("wrap-scale")) {
					$(".wrap").wrap('<div class="wrap-scale"></div>');
					$(".wrap-scale").css("position", "relative");
					$(".wrap").data("originHeight", $(".wrap").outerHeight());
				}
				var transformOrigin = "0% 0%";
				$(".wrap").css({
					width: designWidth,
					transform: "scale(" + zoom + ")",
					"transform-origin": transformOrigin,
					"margin-left": 0,
				});
				$('.dialog').css({
					transform: "scale(" + zoom + ")",
					"transform-origin": transformOrigin,
				})
				$(".wrap-scale").css({
					width: realWid > minWidth ? "auto" : minWidth,
					height: $(".wrap").data("originHeight") * zoom,
					overflow: "hidden",
				});
			}
		} else {
			$(".wrap").css({
				width: designWidth,
				zoom: zoom,
			});
			$('.dialog').css({zoom: zoom})
		}
	}

	resize();
	window.onresize = resize;
})();