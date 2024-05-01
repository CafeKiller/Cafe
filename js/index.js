/**
  * @file 主要函数文件
  */


/* =================================== VARIABLE ================================= */
const $ = JQ = JQuery = jQuery.noConflict()
let part_typed_obj = undefined
let part3Swiper = undefined
let imageSwiper = undefined
/* =================================== VARIABLE ================================= */



/* =================================== INIT ===================================== */

// 页面初始化
$(function () {
    console.log(`%c
        +=================================================================+
        |                                                                 |
        |        >=>                   >=>>    >=>>                       |
        |     >=>   >=>              >>      >>                           |
        |    >=>           >=<     >=>> >> >=>> >>   >==>      >==>       |
        |    >=>         <=>  <=>    >=>     >=>   >>   >=>  >>   >=>     |
        |    >=>        <=>    <=>   >=>     >=>   >>===>>=> >>===>>=>    |
        |     >=>   >=>  <=>  <=>    >=>     >=>   >>        >>           |
        |       >===>      >=<       >=>     >=>    >====>    >====>      |
        |                                                                 |
        |     >=>   >=>        >=>  >=>                                   |
        |     >=>  >=>     >>  >=>  >=>                                   |
        |     >=> >=>          >=>  >=>   >==>    >> >==>                 |
        |     >>=>>       >=>  >=>  >=> >>   >=>   >=>                    |
        |     >=>  >=>    >=>  >=>  >=> >>===>>=>  >=>                    |
        |     >=>   >=>   >=>  >=>  >=> >>         >=>                    |
        |     >=>     >=> >=> >==> >==>  >====>   >==>                    |
        |                                                                 |
        |     => Powered by @Fengm Studio/Coffee_Killer <=                |
        +=================================================================+ 
    `, `color:#8b4513; font-size: 20px; font-weight:800;`);

    // 在window对象上绑定resize监听函数

    IERender()
    initUserInfoDOM()
    initDetailListDOM()

    // 初始化"个人简单介绍"模块DOM
    $(".self-intro").html(selfIntro)

    // 初始化 项目经历(part3) 的swiper
    part3Swiper = new Swiper(".part3-swiper",{
        slidesPerView: "auto",
        spaceBetween: 30,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
    })

    imageSwiper = new Swiper('.image-swiper', {
        slidesPerView: "auto",
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
    })

    renderProjectExperienceDOM(project_experience_arr)
});

// 页面结构&文本相关加载
$(document).ready(function () {
    $(".part1-desc").html(part1_cont)
})
/* =================================== INIT ===================================== */



/* =================================== FUNCTION ================================= */

/**
 * @description 文字写入(typed)模块初始化
 * @param {Object} typed_obj 用于保存typed的对象, 建议为空
 * @param {string} dom_name dom名称
 * @param {Array<string>} str_arr 需要写入的文字的数组
 * @param {Object} options 可选项, 扩展参数
 * */
function typedInit(typed_obj, dom_name, str_arr, options = {}) {
    typed_obj = new Typed(dom_name, {
        strings: str_arr,
        ...options,
        preStringTyped: (arrayPos, self) => {
            if (arrayPos == 0) { document.querySelector(dom_name).innerText = "" }
        },
    })
    return typed_obj
}
/**
 * @description 初始化"当前基本信息"模块DOM
 * */
function initUserInfoDOM() {
    let _dom = ``
    for (const item in myData) {
        _dom += `<div class="user-item user-${item}"> <span>${myData[item].key} :</span> ${myData[item].value}</div>`
    }
    $(".user-info").html(_dom)
}

/**
 * @description 初始化"联系&基本信息"模块DOM
 * */
function initDetailListDOM() {
    let _dom = ``
    for (const item in detailData) {
        _dom += `
        <div class="detail-item ${item}">
            <span class="text-key">${detailData[item].key} :</span>
            <div class="center-mask"></div>
            <p class="text-value">${detailData[item].value}</p>
        </div>
        `
    }
    $(".detail-list").html(_dom)
}

/**
 * @description 渲染项目经历的DOM结构
 * @param {Array} dataArr
 * */
function renderProjectExperienceDOM(dataArr) {
    // 将数组进行倒序排列,让近期的项目排在前面
    let reversedArr = dataArr.slice().reverse();
    let _html = ``
    reversedArr.forEach((item) => {
        _html += `
            <div class="swiper-slide">
                <h1 class="title">${item.title}</h1>
                <p class="time">${item.time}</p>
                <p class="remit">负责：${item.remit}</p>
                <ul class="entry">
                    <li class="first">主要职责</li>
                    ${ (() => {
                        let _html_in = ``
                        item.entry.forEach((_item)=>{
                            _html_in += `<li>${_item}</li>`
                        })
                        return _html_in
                    })() }
                    <li class="last">项目链接：<a target="_blank" href="${item.link}">${item.link}</a></li>
                </ul>
            </div>
        `
    })
    _html += `<div class="swiper-slide"></div>`
    $('.part3-swiper .swiper-wrapper').html(_html)
}

/* =================================== FUNCTION ================================= */



/* =================================== COMMON =================================== */
/**
  * @description: 检测当前页面是否为移动端
  * @return: {boolean} true:移动端, false:PC端
  */
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}


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

/**
  * @description: 防抖函数
  * @param: {Function} fn: 回调函数
  * @param: {number} delay: 延时
  * @param: {boolean} immediate: 是否立即调用
  */
function debounce(fn, delay, immediate = false) {
    let timer = null
    let isInvoke = false

    const _debounce = function (...args) {
        return new Promise((resolve, reject) => {
            if (timer) clearTimeout(timer)

            if (immediate && !isInvoke) {
                const result = fn.apply(this, args)
                resolve(result)
                isInvoke = true
            } else {
                timer = setTimeout(() => {
                    const result = fn.apply(this, args)
                    resolve(result)
                    isInvoke = false
                    timer = null
                }, delay)
            }
        })
    }

    _debounce.cancel = function () {
        if (timer) clearTimeout(timer)
        timer = null
        isInvoke = false
    }

    return _debounce
}

/**
  * @description: 节流函数
  * @param: {Function} fn: 回调函数
  * @param: {number} interval: 时间间隔
  * @param: {object} options: 可选参数 { leading首次触发, trailing最后触发 }
  */
function throttle(fn, interval, options = { leading: true, trailing: false }) {
    const { leading, trailing, resultCallback } = options
    let lastTime = 0
    let timer = null

    const _throttle = function (...args) {
        return new Promise((resolve, reject) => {
            const nowTime = new Date().getTime()
            if (!lastTime && !leading) lastTime = nowTime

            const remainTime = interval - (nowTime - lastTime)
            if (remainTime <= 0) {
                if (timer) {
                    clearTimeout(timer)
                    timer = null
                }

                const result = fn.apply(this, args)
                resolve(result)
                lastTime = nowTime
                return
            }

            if (trailing && !timer) {
                timer = setTimeout(() => {
                    timer = null
                    lastTime = !leading ? 0 : new Date().getTime()
                    const result = fn.apply(this, args)
                    resolve(result)
                }, remainTime)
            }
        })
    }

    _throttle.cancel = function () {
        if (timer) clearTimeout(timer)
        timer = null
        lastTime = 0
    }
    return _throttle
}

/**
 * @description: 移动端适配
 * @param: {Window} win: 全局对象
 * @param: {Document} doc: 全局DOM对象
 * @param: {string} mode: 单位选择,px或rem
 *
 * @author: Coffee_Killer
 */
(function (win, doc, mode) {
    let std = 750;
    if (/(iPhone|iPad|iPod|iOS|Android|Windows Phone|BlackBerry|SymbianOS)/i.test(navigator.userAgent)) {
        let h = document.getElementsByTagName("head")[0];
        h.insertAdjacentHTML('beforeEnd', '<meta name="apple-mobile-web-app-capable" content="yes">');
        h.insertAdjacentHTML('beforeEnd', '<meta name="apple-mobile-web-app-status-bar-style" content="black">');
        h.insertAdjacentHTML('beforeEnd', '<meta name="format-detection" content="telephone=no">');
        h.insertAdjacentHTML('beforeEnd', '<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui" />');
        if (mode == 'px') {
            if (!win.addEventListener) return;
            let html = document.documentElement;
            function setFont() {
                function adaptVP(a) { function c() { var c, d; return b.uWidth = a.uWidth ? a.uWidth : 750, b.dWidth = a.dWidth ? a.dWidth : window.screen.width || window.screen.availWidth, b.ratio = window.devicePixelRatio ? window.devicePixelRatio : 1, b.userAgent = navigator.userAgent, b.bConsole = a.bConsole ? a.bConsole : !1, a.mode ? (b.mode = a.mode, void 0) : (c = b.userAgent.match(/Android/i), c && (b.mode = "android-2.2", d = b.userAgent.match(/Android\s(\d+.\d+)/i), d && (d = parseFloat(d[1])), 2.2 == d || 2.3 == d ? b.mode = "android-2.2" : 4.4 > d ? b.mode = "android-dpi" : d >= 4.4 && (b.mode = b.dWidth > b.uWidth ? "android-dpi" : "android-scale")), void 0) } function d() { var e, f, g, h, c = "", d = !1; switch (b.mode) { case "apple": f = (window.screen.availWidth * b.ratio / b.uWidth) / b.ratio; c = "width=" + b.uWidth + ",initial-scale=" + f + ",minimum-scale=" + f + ",maximum-scale=" + f + ",user-scalable=no"; break; case "android-2.2": a.dWidth || (b.dWidth = 2 == b.ratio ? 720 : 1.5 == b.ratio ? 480 : 1 == b.ratio ? 375 : .75 == b.ratio ? 240 : 480), e = window.screen.width || window.screen.availWidth, 375 == e ? b.dWidth = b.ratio * e : 750 > e && (b.dWidth = e), b.mode = "android-dpi", d = !0; case "android-dpi": f = 160 * b.uWidth / b.dWidth * b.ratio, c = "target-densitydpi=" + f + ", width=" + b.uWidth + ", user-scalable=no", d && (b.mode = "android-2.2"); break; case "android-scale": c = "width=" + b.uWidth + ", user-scalable=no" }g = document.querySelector("meta[name='viewport']") || document.createElement("meta"), g.name = "viewport", g.content = c, h = document.getElementsByTagName("head"), h.length > 0 && h[0].appendChild(g) } function e() { var a = ""; for (key in b) a += key + ": " + b[key] + "; "; alert(a) } if (a) { var b = { uWidth: 0, dWidth: 0, ratio: 1, mode: "apple", userAgent: null, bConsole: !1 }; c(), d(), b.bConsole && e() } }; adaptVP({ uWidth: 750 });
            }
            win.addEventListener('resize', setFont, false)
            setFont();
        }
        else if (mode == 'rem') {
            let docEl = doc.documentElement,
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function () {
                    let clientWidth = docEl.clientWidth;
                    if (!clientWidth) return;
                    docEl.style.fontSize = 100 * (clientWidth / std) + 'px';
                };
            if (!doc.addEventListener) return;
            recalc();
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
        }
    }
})(window, document, 'px');


/**
 * @description: 判断浏览器版本是否为IE
 *
 * @author: Coffee_Killer
 * @timer: 2023-10-14 10:58:19
 */
function IEVersion() {
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    let isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        IERender()
    } else if (isIE11) {
        IERender()
    }
}

/**
 * @description: 针对IE进行渲染, 全面禁止适配IE
 *
 * @author: Coffee_Killer
 * @timer: 2023-10-14 10:58:19
 */
function IERender() {
    let iePOP = document.getElementById("ie-pop");
    iePOP.style.display = "block"
    iePOP.innerText = "检查到您当前使用的是IE浏览器, 网站无法提供服务"
}
/* =================================== COMMON =================================== */