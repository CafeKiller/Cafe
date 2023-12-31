/**
  * @file 主要函数文件
  */

/**
  * @description: 检测当前页面是否为移动端
  * @return: {boolean} true:移动端 false:PC端
  * @author: Coffee_Killer
  */
function isMobile(){
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

/**
  * @description: 初始化技术栈页面
  * @param: {array} stack_list 
  * @author: Coffee_Killer
  */
function initStack(stack_list){
    let _html = ``
    stack_list.forEach((item) => {
        _html += `
        <div class="part3-item">
            <span class="tips" style="color:${item.color}">${item.title}</span>
            <div class="progress-outer">
                <div class="progress-inner" style="width:${0}%; background-color:${item.color}; filter: drop-shadow(0px 0px 5px ${item.color}">
                    <span class="progress-number">${item.progress_number}%</span>
                </div>
            </div>
            <div class="tags">如: ${item.tags}</div>
        </div>
        `
    })
    $(".part3-list").html(_html)
}

/**
  * @description: 技术栈进度条加载(进入状态)
  * @param: {array} progress_list
  * @author: Coffee_Killer
  */
function stackProgressLoad(progress_list){
    progress_list.forEach((item,idx)=>{

        /* numberLinearChange(0, item, 20, function(changeNum) {
            $(`.part3-item:eq(${idx}) .progress-number`).html(`${changeNum}%`)
        }) */

        $(`.part3-item:eq(${idx}) .progress-inner`).css({
            "width": `${item}%`,
            "transition": "width 0.85s ease-in"
        })
    })
}

/**
  * @description: 技术栈进度条加载(离开状态)
  * @author: Coffee_Killer
  */
function stackProgressBack(){
    $(`.part3-item .progress-inner`).css({
        "width": `0%`,
        "transition": "width .15s ease-in"
    })
}

/**
  * @description: 初始化Part4-Swiper模块函数
  * @param: {array} story_list
  * @author: Coffee_Killer
  */
function init_Part4_Swiper(story_list){

    if(!story_list) {
        Qmsg.error('数据异常, [STORY模块]渲染失败') 
        return
    }
    // 渲染Part4 SwiperSlide标签
    story_list.forEach((item,idx)=>{
        p4swiper.appendSlide(`
            <div class="swiper-slide">
                <div class="story-box story-box-num${idx}" date-idx="${idx}">
                    <h3>${ item.title ? item.title.toUpperCase() : ""}</h3>
                    <img src="${item.title ? item.cover : "" }" alt="StoryCover_${item.title}">
                    <span class="timer">${item.timer}</span>
                </div>
            </div>
        `)
    })

    // 遍历Part4 SwiperSlide标签, 并为其绑定点击事件
    // 点击事件: 点击后在Story故事弹窗渲染对应的数据
    $('.story-box').on('click',function(){
        let idx = $(this).attr('date-idx')
        let _tempHtml = `
            <h3 class="title">${story_list[idx].sub_title}</h3>
            <p class=content>${story_list[idx].content}</p>
            <a class="pop-close" href="javascript:closePop('pop-story')">×</a>
        `
        $('.pop-story-cont').html(_tempHtml).css({
            "background-image":`url(${story_list[idx].image})`
        })
        _tempHtml = ``;
        showPop("pop-story")
    })
      
}

/**
  * @description: 初始化 Part5-Item 的鼠标事件
  * @author: Coffee_Killer
  */
function init_Part5Item_MouseEvent(){
    const p5_Len =  $(".part5-cont-item").length
    $(`.part5-cont-item:lt(${ p5_Len-1 })`).on("mouseover",function(){
        $(this).addClass("active").siblings().removeClass('active')
    })
}

/**
  * @description: 通用开启弹窗函数
  * @param: {string} id: DOC_id
  * @author: Coffee_Killer
  */
function showPop(id){
    // 添加弹窗样式
    $(`.pop-model#${id}`).addClass("active")

    // 判断是否为Story故事模块, 如果是Story模块则添加相对应的动画
    if(id === "pop-story"){
        gsap.to(".pop-story-cont", 0.5, {opacity: 1,y: -100,delay:0.5}, 0.15)
    }
}

/**
  * @description: 通用关闭弹窗函数
  * @param: {string} id: DOC_id
  * @author: Coffee_Killer
  */
function closePop(id = undefined){
    // 判断关闭的是否为Story故事模块, 如果是Story模块则移除相对应的动画
    // 如果不是Story模块,则移除弹窗样式
    if(id === "pop-story"){
        gsap.to(".pop-story-cont", 0.3, {opacity: 0,y: 100,delay:0.2, stagger: 0.15, 
                                        onCompleta:()=>{
                                        $('.pop-model').removeClass('active')}})
    } else {
        $('.pop-model').removeClass('active')
    }
}

/**
  * @description: 让初始数字进行线性增长到最终数字
  * @param: {number} initNum: 初始数字
  * @param: {number} finaNum: 最终数字
  * @param: {number} speed: 速度控制
  * @param: {Function} callback: 回调函数
  * 
  * @author: Coffee_Killer
  * @timer: 2023-09-09 22:11:44
  */
function numberLinearChange(initNum, finaNum, speed, callback){
    let interval;
    if(initNum <= finaNum){
        interval = setInterval(
            () => {
                if(typeof callback === 'function'){
                    callback(initNum)
                }
                clearInterval(interval)
                return numberLinearChange(++initNum, finaNum, speed, callback)
            }, speed); 
    }
    
}

/**
  * @description: 响应式适配函数
  * @author: Coffee_Killer
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
  * @author: Coffee_Killer
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
  * @author: Coffee_Killer
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
  