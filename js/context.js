/*
 * Js_Desc: 页面核心容器对象相关
 */



let p4swiper = null
if(isMobile()){
    console.log(`>>>>>>>>>>>> Mobile Fullpage init Data: ${Date.now()}`);

    // 移动端 fullpage 容器初始化
    $('#content').fullpage({
        touchSensitivity: 30, // 控制移动端页面滑动阻力
        afterLoad: function(anchorLink, index){
            switch (index) {
                case 1:
                    gsap.to(".part1-cont div", 0.3, {opacity: 1,y: 60,delay:0.3, stagger:0.3})
                    break
                case 2:
                    $(".part2-icon1, .part2-icon2").addClass("active")
                    break
                case 3:
                    gsap.to(".part3-title",0.45, {opacity: 1,y: -130,delay:0.25})
                    gsap.to(".part3-item", 0.2, { opacity: 1,y: 50,delay:0.15 }, 0.1,
                        ()=>{
                        stackProgressLoad(stack_progress_list)
                        $('.part3-icon-1').css({ "animation": "MarioJump .1s 3 linear" })
                        $('.part3-icon-2').css({ "animation": "CubeSway .1s 3 linear" })
                    })
                    break
                case 4:
                    gsap.to(".swiper-slide", 0.3, {opacity: 1,y: -20,delay:0.2}, 0.15)
                    gsap.to(".p4swiper-pagination", 0.3, {opacity: 1,y: -20,delay:0.2}, 0.15)
                    $(".p4swiper .swiper-slide").css({"pointer-events":"all"})
                    break
                case 5:
                    /*gsap.to(".left-model",0.3, {opacity: 1,x: 80,delay:0.2}, 0.15)
                    gsap.to(".btom-model",0.2, {opacity: 1,y: -80,delay:0.2}, 0.15,() => {
                        $(`.part5-cont-item:eq(${part5_current_active})`).addClass("active")
                        // init_Part5Item_MouseEvent()
                    })
                    gsap.to(".part5-cont-item.cont-model .title",0.5, {opacity: 1,x: -150,delay:0.65})
                    gsap.to(".part5-cont-item.cont-model .content",0.5, {opacity: 1,y: -50,delay:0.65})*/
            }
        },
        // 离开页面 回调函数
        onLeave: function(index, direction){
            switch (index) {
                case 1:
                    gsap.to(".part1-cont div", 0.1, {opacity: 0,y: -60,delay:0.01},0.1)
                    break
                case 2:
                    $(".part2-icon1, .part2-icon2").removeClass("active")
                    break
                case 3:
                    gsap.to(".part3-title",0.15, {opacity: 0,y: 0,delay:0.05})
                    gsap.to(".part3-item", 0.05, {opacity: 0, y: 0,delay:0.01}, 0.1,()=>{
                        stackProgressBack()
                        $('.part3-icon-1, .part3-icon-2').css({ "animation": "none" })
                    })
                    break
                case 4:
                    gsap.to(".swiper-slide", 0.2, {opacity: 0,y: 0,delay:0.01}, 0.15)
                    gsap.to(".p4swiper-pagination", 0.2, {opacity: 0,y: 20,delay:0.01}, 0.15)
                    $(".p4swiper .swiper-slide").css({"pointer-events":"none"})
                    break
                case 5:
                    /*gsap.to(".left-model",0.2, {opacity: 0,x: -80,delay:0.01}, 0.15)
                    gsap.to(".btom-model",0.2, {opacity: 0,y: 80,delay:0.01}, 0.15,() => {
                        $('.part5-cont-item').removeClass("active")
                    })
                    gsap.to(".part5-cont-item.cont-model .title",0.2, {opacity: 0,x: 150,delay:0.01})
                    gsap.to(".part5-cont-item.cont-model .content",0.2, {opacity: 0,y: 30,delay:0.01})*/
            }
        }
    });

    // 移动端 Part4Swiper对象
    p4swiper = new Swiper(".p4swiper", {
        loop:true,
        slidesPerView: 1,
        spaceBetween:20,
        pagination: {
            el: ".p4swiper-pagination",
        },
    });

}else{
    console.log(`>>>>>>>>>>>> PC Fullpage init Data: ${Date.now()}`);

    // PC端 fullpage 容器初始化
    $('#content').fullpage({
        scrollingSpeed: 1000, //设置滚动速度，单位毫秒，默认700
        easing: 'easeOutBack', //定义页面section滚动的动画方式，若修改此项需引入jquery.easing插件
        // 进入页面 回调函数
        afterLoad: function(anchorLink, index){
            switch (index) {
                case 1:
                    /* 首页元素加载动画 */
                    gsap.to(".part1-cont div", 0.3, {opacity: 1,y: 60,delay:0.3, stagger:0.3})
                    break
                case 2:
                    /* 简介页bef元素加载动画 */
                    $(".part2-icon1, .part2-icon2").addClass("active")
                    break
                case 3:
                    /* 技术栈进入动画 */
                    gsap.to(".part3-item", 0.2, {opacity: 1,x: 60,delay:0.15,stagger:0.1,
                                                onCompleta:()=>{
                                                    /* 技术栈进度图加载 */
                                                    stackProgressLoad(stack_progress_list)
                                                    $('.part3-icon-1').css({ "animation": "MarioJump .2s 3 linear" })
                                                    $('.part3-icon-2').css({ "animation": "CubeSway .2s 3 linear" })
                                                }})
                    break
                case 4:
                    /* 轮播slide 渐渐上浮显示 */
                    gsap.to(".swiper-slide", 0.3, {opacity: 1, y: -20, delay:0.2, stagger:0.15,
                                                    onCompleta:()=>{
                                                        /* 允许点击 */
                                                        $(".p4swiper .swiper-slide").css({"pointer-events":"all"})
                                                    }})
                    /* 轮播pagination 渐渐上浮显示 */
                    gsap.to(".p4swiper-pagination", 0.3, {opacity: 1, y: -20, delay:0.75})
                    break
                case 5:
                    /* 底部模块加载 */
                    gsap.to(".left-model",0.3, {opacity: 1, x: 80, delay:0.2, stagger:0.15})
                    gsap.to(".btom-model",0.2, {opacity: 1, y: -80, delay:0.2, stagger:0.15, 
                                               onCompleta:()=>{
                                                    /* 为首个元素添加进入动画 */
                                                    $(`.part5-cont-item:eq(${part5_current_active})`).addClass("active")
                                                    // init_Part5Item_MouseEvent()
                                                }})
                    /* 内容加载 */
                    gsap.to(".part5-cont-item.cont-model .title",0.5, {opacity: 1,x: -150,delay:0.65})
                    gsap.to(".part5-cont-item.cont-model .content",0.5, {opacity: 1,y: -50,delay:0.65})
            }
        },
        // 离开页面 回调函数
        onLeave: function(index, nextIndex, direction){
            switch (index) {
                case 1:
                    /* 首页元素离开动画 */
                    gsap.to(".part1-cont div", 0.1, {opacity: 0, y: -60, delay:0.01, stagger:0.01 })
                    break
                case 2:
                    $(".part2-icon1, .part2-icon2").removeClass("active")
                    break
                case 3:
                    /* 技术栈页面离开动画 */
                    gsap.to(".part3-item", 0.1, {opacity: 0,x: -60,delay:0.01, stagger:0.01, 
                                                onCompleta:()=>{
                                                    /* 技术栈进度条回退 */
                                                    stackProgressBack()
                                                    $('.part3-icon-1, .part3-icon-2').css({ "animation": "none" })
                                                }})
                    break
                case 4:
                    /* 轮播页面离开动画 */
                    gsap.to(".swiper-slide", 0.2, {opacity: 0, y: 0, delay:0.01, swagger:0.01})
                    gsap.to(".p4swiper-pagination", 0.2, {opacity: 0, y: 20, delay:0.01, swagger:0.01})
                    $(".p4swiper .swiper-slide").css({"pointer-events":"none"})
                    break
                case 5:
                    gsap.to(".left-model", 0.2, {opacity: 0,x: -80,delay:0.01}, 0.01)
                    gsap.to(".btom-model", 0.2, {opacity: 0,y: 80,delay:0.01, swagger:0.01, 
                                                onCompleta:() => {
                                                    $('.part5-cont-item').removeClass("active")
                                                }})
                    gsap.to(".part5-cont-item.cont-model .title", 0.2, {opacity: 0,x: 150,delay:0.01})
                    gsap.to(".part5-cont-item.cont-model .content", 0.2, {opacity: 0,y: 30,delay:0.01})
            }
        }
    });


    // PC端 Part4Swiper对象
    p4swiper = new Swiper(".p4swiper", {
        loop:true,
        slidesPerView: 3,
        spaceBetween:20,
        pagination: {
            clickable: true,
            el: ".p4swiper-pagination",
        },
    });


}
