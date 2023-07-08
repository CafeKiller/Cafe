$(function(){
    $('#content').fullpage({
        sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90']
    });
});

$(window).resize(function(){
    autoScrolling();
});

function autoScrolling(){
    var $ww = $(window).width();
    if($ww < 1024){
        $.fn.fullpage.setAutoScrolling(false);
    } else {
        $.fn.fullpage.setAutoScrolling(true);
    }
}

autoScrolling();


