let storyList;

$(function(){
    // 创建 Jquery.fullPage 对象
    $('#content').fullpage({
        // sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90']
    });

    $.getJSON('./data/story.json', function (data) {
        console.log(data);
        storyList = data.text_list
    })

});



// 复制文字
function copyText(domNode){
    let text = $(domNode).text()
    const _clipb = navigator.clipboard
    _clipb ? navigator.clipboard.writeText(text) : console.log("当前浏览器无法支持复制");
    
}

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

// 经历标签点击事件
let _tempHtml = ``
$('.story-box').on('click',function(){
    
    let idx = $(this).attr('date-idx')
    
    _tempHtml = `
        <h3 class="title">${storyList[idx].sub_title}</h3>
        <p class="content">${storyList[idx].content}</p>
    `
    $('.pop-story-cont').html(_tempHtml)
    _tempHtml = ``;

    showPop("pop-story")

})


// fullPage 响应式适配函数
function autoScrolling(){
    var $ww = $(window).width();
    // if($ww < 1024){
    //     $.fn.fullpage.setAutoScrolling(false);
    // } else {
    //     $.fn.fullpage.setAutoScrolling(true);
    // }
}
autoScrolling();


// 开启弹窗
function showPop(id){
    console.log($(id));
    $(`#${id}`).css({
        display:'flex'
    })
}

// 关闭弹窗
function closePop(){
    
}
