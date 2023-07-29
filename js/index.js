$(function(){
    // 创建 Jquery.fullPage 对象
    $('#content').fullpage({
        // sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90']
    });
});


let tecStack = [
    ["JavaSE","JavaWeb","JavaGUI","JavaFX","Spring","SpringMVC","MyBatisPlus","SpringBoot","SpringCloud","JVM虚拟机原理","Maven"],
    ["HTML5","CSS3","JavaScript","ES 6","微信小程序","Uni-App","Nodejs","TypeScript","Express","Vue全家桶","ThreeJS","WebPack"],
    ["Python","C","C sharp","Unity3D","RPG Maker","LuaScript","Php","Golang","Android"],
    ["MySQL","MongoDB","Linux","Nginx","Redis","RabbitMQ","Docker","设计模式","数据结构与算法","计算机网络"]
]

function initTech() {
    let _html = ``
    for (const item in tecStack) {
        _html += `<div class="swiper-slide">`
        for (const key in tecStack[item]) {
            _html += `
                <li class="tech-item">${tecStack[item][key]}</li>
            `
        }
        _html += "</div>"
    }
    $('.swiper-wrapper').html(_html)
}

initTech()


const p3swiper = new Swiper(".p3swiper", {
    pagination: {
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


