$(function(){
    // 创建 Jquery.fullPage 对象
    $('#content').fullpage({
        // sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90']
    });
});




const p4swiper = new Swiper(".p4swiper", {
    loop:true,
    slidesPerView: 3,
    spaceBetween:20,
    fadeEffect: {
        crossFade: true,
    },
    pagination: {
        clickable: true,
        el: ".p4swiper-pagination",
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


