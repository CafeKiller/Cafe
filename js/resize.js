/**
 * 屏幕自适应适配处理; 注意! 非开箱即用, 需要更具实际需求进行调整;
 * 对于支持 zoom 属性的浏览器如: chrome 建议直接使用 zoom 进行处理
 * 对于不支持 zoom 属性的浏览器如: firefox 建议使用 scale 处理
 * */
const adaptViewport = (function () {
    function detectIE() {
        const ua = window.navigator.userAgent;
        const msie = ua.match(/MSIE (\d+)/g);
        if (msie != null) return parseInt(msie[0].match(/\d+/g)[0]);
        // IE 11
        const trident = ua.indexOf("Trident/");
        if (trident > 0) {
            const rv = ua.indexOf("rv:");
            return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)),
                10);
        }
        return false;
    }

    const minWidth = 800;         // 最小宽度
    const designWidth = 1920;     // 设计稿宽度
    const isFirefox = navigator.userAgent.indexOf("Firefox") != -1;
    const ieVersion = detectIE(); // IE 版本
    let zoom = 1;               // 缩放比例

    // 屏幕尺寸变化时处理函数
    function resize() {
        // doc.clientWidth不包含滚动栏宽度
        const ww = document.documentElement.clientWidth || window.innerWidth;
        const realWid = Math.max(ww, minWidth);   // 当前实际页面宽度
        zoom = realWid / designWidth;           // 当前实际缩放比例
        if (ieVersion && ieVersion < 9) return;

        // firefox不支持zoom. ie9, 10, 11 zoom属性不支持/存在漏洞
        if (isFirefox || ieVersion >= 9) {
            if (zoom !== 1) {
                const transformOrigin = "0% 0%";
                // TODO [1]此处放置不支持 zoom 属性的样式处理, 建议使用 scale 处理
            }
        } else {
            $('.part-outer').css({
                'zoom' : zoom,
            })
        }
        // TODO [3]此处可放置一些通用的样式处理
    }
    resize();
    window.onresize = resize;
})();