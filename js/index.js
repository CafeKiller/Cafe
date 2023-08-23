$(function(){
    // 创建 Jquery.fullPage 对象
    $('#content').fullpage({
        // sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90']
    });
});




const p3swiper = new Swiper(".p3swiper", {
    effect : 'fade',
    fadeEffect: {
        crossFade: true,
    },
    pagination: {
        clickable: true,
        el: ".p3swiper-pagination",
    },
    
});

$(window).resize(function(){
    autoScrolling();
});

// fullPage 响应式适配函数
function autoScrolling(){
    var $ww = $(window).width();
    if($ww < 1024){
        $.fn.fullpage.setAutoScrolling(false);
    } else {
        $.fn.fullpage.setAutoScrolling(true);
    }
}
autoScrolling();


