/**
  * @file 主要函数文件
  */


/* =================================== VARIABLE ================================= */
let part_typed_obj = undefined
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
    autoScrolling();
    $(window).resize(function () {
        autoScrolling();
    });

    IERender()
    initUserInfoDOM()
    initDetailListDOM()

    // 初始化"个人简单介绍"模块DOM
    $(".self-intro").html(selfIntro)
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
 * 显示项目介绍容器
 * */
function showProductContainer (event) {
    // 限制页面滚动
    $.fn.fullpage.setAllowScrolling(false);
    $(`.product-item`).css({"pointer-events": "none"})

    let { tag } = event.currentTarget.dataset
    let gtl = gsap.timeline()

    const corpDOM = $(`.product-item[data-tag="corp"]`),
          personDOM = $(`.product-item[data-tag="person"]`),
          communalDOM = $(`.product-item[data-tag="communal"]`),
          contTagName = ".product-item-container"

    switch (tag) {
        case "corp":
            gtl.to(corpDOM, {x: -20, delay:0.1, duration:0.2 })
            gtl.to(communalDOM, {x: 100, opacity: 0, delay: 0.1, duration: 0.3 })
            gtl.to(personDOM, {x: 100, opacity: 0, delay: 0.1, duration: 0.3 })
            gtl.to(contTagName, {y: -155, opacity: 1, delay: 0.1, duration: 0.5, onComplete:() => {
                    $(".product-item").off("click").on("click", closeProductContainer)
                    $(contTagName).toggleClass("on")
                    $(`.product-item`).css({"pointer-events": "auto"})
                }})
            break
        case "person":
            gtl.to(corpDOM, {x: -100, opacity: 0, delay:0.1, duration:0.3 })
            gtl.to(communalDOM, {x: 100, opacity: 0, delay: 0.1, duration: 0.3 })
            gtl.to(personDOM, {x: -320, delay:0.1, duration:0.4 })
            gtl.to(contTagName, {y: -155, opacity: 1, delay: 0.1, duration: 0.5, onComplete:() => {
                    $(".product-item").off("click").on("click", closeProductContainer)
                    $(contTagName).toggleClass("on")
                    $(`.product-item`).css({"pointer-events": "auto"})
                }})
            break
        case "communal":
            gtl.to(corpDOM, {x: -100, opacity: 0, delay: 0.1, duration: 0.3 })
            gtl.to(personDOM, {x: -100, opacity: 0, delay: 0.1, duration: 0.3 })
            gtl.to(communalDOM, {x: -618, delay:0.1, duration:0.6 })
            gtl.to(contTagName, {y: -155, opacity: 1, delay: 0.1, duration: 0.5, onComplete:() => {
                    $(".product-item").off("click").on("click", closeProductContainer)
                    $(contTagName).toggleClass("on")
                    $(`.product-item`).css({"pointer-events": "auto"})
                }})
            break
        default:
            console.log("%c %s not legal.","font-size: 20px;color: red;background: #000;", tag)
    }
}

function closeProductContainer(event){
    // 释放页面滚动
    $.fn.fullpage.setAllowScrolling(true);
    $(`.product-item`).css({"pointer-events": "none"})

    let { tag } = event.currentTarget.dataset
    let gtl = gsap.timeline()

    const corpDOM = $(`.product-item[data-tag="corp"]`),
        personDOM = $(`.product-item[data-tag="person"]`),
        communalDOM = $(`.product-item[data-tag="communal"]`),
        contTagName = ".product-item-container"

    switch (tag) {
        case "corp":
            gtl.to(contTagName, {y: 155, opacity: 0, delay: 0.1, duration: 0.3})
            gtl.to(personDOM, {x: 0, opacity: 1, delay: 0.1, duration: 0.3 })
            gtl.to(communalDOM, {x: 0, opacity: 1, delay: 0.1, duration: 0.3 })
            gtl.to(corpDOM, {x: 0, delay:0.1, duration: 0.3, oncomplete:() => {
                    $(".product-item").off("click").on("click", showProductContainer)
                    $(contTagName).toggleClass("on")
                    $(`.product-item`).css({"pointer-events": "auto"})
                }})
            break
        case "person":
            gtl.to(contTagName, {y: 155, opacity: 0, delay: 0.1, duration: 0.3})
            gtl.to(communalDOM, {x: 0, opacity: 1, delay: 0.1, duration: 0.3 })
            gtl.to(personDOM, {x: 0, delay:0.1, duration: 0.3})
            gtl.to(corpDOM, {x: 0, opacity: 1, delay:0.1, duration:0.3, oncomplete:() => {
                    $(".product-item").off("click").on("click", showProductContainer).toggleClass("on")
                    $(contTagName).toggleClass("on")
                    $(`.product-item`).css({"pointer-events": "auto"})
                }})

            break
        case "communal":
            gtl.to(contTagName, {y: 155, opacity: 0, delay: 0.1, duration: 0.3})
            gtl.to(communalDOM, {x: 0, opacity: 1, delay: 0.1, duration: 0.3 })
            gtl.to(personDOM, {x: 0, opacity: 1, delay: 0.1, duration: 0.3 })
            gtl.to(corpDOM, {x: 0, opacity: 1, delay:0.1, duration:0.3, oncomplete:() => {
                    $(".product-item").off("click").on("click", showProductContainer).toggleClass("on")
                    $(contTagName).toggleClass("on")
                    $(`.product-item`).css({"pointer-events": "auto"})
                }})
            break
        default:
            console.log("%c %s not legal.","font-size: 20px;color: red;background: #000;", tag)
    }
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
  * @description: 响应式适配函数
  */
function autoScrolling() {
    const minWW = 1200
    // 屏幕自适应
    if (!/(iPhone|iPad|iPod|iOS|Android|Windows Phone|BlackBerry|SymbianOS)/i.test(navigator.userAgent)) {
        // 只需要在PC端工作
        $(function () {
            let ww = $(window).width() <= minWW ? minWW : $(window).width()
            let zoom = ww / 1920
            //TODO Firefox浏览器不支持zoom单位, 需要适配
            $('.part-cont').css('zoom', zoom)
        })
        window.onresize = function () {
            let ww = $(window).width() <= minWW ? minWW : $(window).width()
            let zoom = ww / 1920
            $('.part-cont').css('zoom', zoom)
        }
    }
}

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