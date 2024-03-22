/**
  * @file: 页面 PC端核心容器对象相关
  */
if (!isMobile()) {
    $('#content').fullpage({
        anchors: ['part1', 'part2', 'part3', 'part4'],
        scrollingSpeed: 1000, //设置滚动速度，单位毫秒，默认700
        easing: 'easeOutBack', //定义页面section滚动的动画方式，若修改此项需引入jquery.easing插件
        // afterRender: function () {
        //
        // },
        afterLoad: (anchorLink, index) => {
            switch (index) {
                case 1:
                    // $.fn.fullpage.setAllowScrolling(false)
                    if (part_typed_obj === undefined) {
                        part_typed_obj = typedInit(part_typed_obj,
                            ".head-text",
                            part1_arr,
                            { typeSpeed: 10, backSpeed: 10, showCursor: false })
                    }
                    break
                case 2:

                    break
                case 3:
                    let glt = gsap.timeline()
                    glt.to(".product-item", {y:40, opacity:1, delay:0.1, stagger:0.2, duration:1})
                    break
                case 4:

                    break
                case 5:

            }
        },
        onLeave: function (index, nextIndex, direction) {
            console.log(nextIndex, index, )
            switch (index) {
                case 1:
                    break
                case 2:

                    break
                case 3:
                    let glt = gsap.timeline()
                    if (direction === "down") {
                        glt.to(".product-item", {y:80, opacity:0, delay:0.1, stagger:0.2, duration:0.3})
                    } else {
                        glt.to(".product-item", {y:0, opacity:0, delay:0.1, stagger:0.2, duration:0.3})
                    }
                    break
                case 4:

                    break
                case 5:

            }
        }
    });

}
