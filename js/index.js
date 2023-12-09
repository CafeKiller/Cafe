/**
  * @file 主要函数文件
  */

/* =================================== INIT =================================== */
$(function(){

    console.log(`
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
    `);

    // 在window对象上绑定resize监听函数
    autoScrolling();
    $(window).resize(function(){
        autoScrolling();
    });

    // 复制文字函数
    const clipboard = new ClipboardJS('.copy-allowed');
    clipboard.on('success', function(e) {
        Qmsg.success('复制成功')
        e.clearSelection();
    });
    clipboard.on('error', function(e) {
        Qmsg.error('复制失败')
        console.error(e);
    });

});
/* =================================== INIT =================================== */



/* =================================== COMMON =================================== */
/**
  * @description: 检测当前页面是否为移动端
  * @return: {boolean} true:移动端 false:PC端
  */
function isMobile(){
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}


/**
  * @description: 响应式适配函数
  */
function autoScrolling(){
    const minWW = 1200
    // 屏幕自适应
    if (!/(iPhone|iPad|iPod|iOS|Android|Windows Phone|BlackBerry|SymbianOS)/i.test(navigator.userAgent)) {
        // 只需要在PC端工作
        $(function(){
            let ww = $(window).width() <= minWW ? minWW : $(window).width()
            let zoom = ww/1920
            $('.part-cont').css('zoom', zoom)
        })
        window.onresize=function(){
            let ww = $(window).width() <= minWW ? minWW : $(window).width()
            let zoom = ww/1920
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

    const _debounce = function(...args) {
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

    _debounce.cancel = function() {
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
  
    const _throttle = function(...args) {
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
            lastTime = !leading ? 0: new Date().getTime()
            const result = fn.apply(this, args)
            resolve(result)
          }, remainTime)
        }
      })
    }
  
    _throttle.cancel = function() {
      if(timer) clearTimeout(timer)
      timer = null
      lastTime = 0
    }
    return _throttle
}
/* =================================== COMMON =================================== */