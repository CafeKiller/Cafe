$(function(){
    // 创建 Jquery.fullPage 对象
    $('#content').fullpage({
        // sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90']
    });
});


let tecStack = {
    java:["JavaSE","JavaWeb","JavaGUI","JavaFX","Spring","SpringMVC","MyBatisPlus","SpringBoot","SpringCloud","JVM虚拟机","Maven"],
    web:["HTML5","CSS3","JavaScript","ES 6","微信小程序","Uni-App","Nodejs","TypeScript","Express","Vue全家桶","ThreeJS","WebPack"],
    other:["Python","C","C sharp","Unity3D","RPG Maker","LuaScript","Php","Golang","Android"],
    Extend:["MySQL","MongoDB","Linux","Nginx","Redis","RabbitMQ","Docker","设计模式","数据结构与算法","计算机网络"]
}


const p3swiper = new Swiper(".p3swiper", {

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


