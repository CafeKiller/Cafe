let storyList;

$(function(){
    // 创建 Jquery.fullPage 对象
    $('#content').fullpage({
        // sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90']
        afterLoad: function(anchorLink, index){
			if(index == 2){
				// console.log("进入2页面");
			}
			if(index == 3){
				// TweenMax.staggerTo(".swiper-slide", 0.6, {opacity: 1,y: -20,delay:0.3}, 0.15)
			}
			if(index == 4){
                // 进入页面4
				TweenMax.staggerTo(".swiper-slide", 0.3, {opacity: 1,y: -20,delay:0.01}, 0.15)
                $(".p4swiper .swiper-slide").css({"pointer-events":"all"})
			}
		},
		onLeave: function(index, direction){
			if(index == '2'){
				// console.log("离开2页面");
			}
			if(index == '3'){
				// TweenMax.staggerTo(".swiper-slide", 0.3, {opacity: 1,y: -20,delay:0.01}, 0.15)
			}
			if(index == '4'){
                // 离开页面4
				TweenMax.staggerTo(".swiper-slide", 0.3, {opacity: 0,y: 0,delay:0.01}, 0.15)
                $(".p4swiper .swiper-slide").css({"pointer-events":"none"})
			}
		}
    });

    $.getJSON('./data/story.json', function (data) {
        console.log("story.json", data);
        storyList = data.text_list
    })

    $.getJSON('./data/stack.json', function (data) {
        console.log("stack.json", data);
        initStack(data.stack_list)
        
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

// 初始化技术栈页面
function initStack(stack_list){
    let _html = ``
    stack_list.forEach((item)=>{
        _html += `
        <div class="part3-item">
            <span class="tips" style="color:${item.color}">${item.title}</span>
            <div class="progress-outer">
                <div class="progress-inner" style="width:${item.progress_number}%; background-color:${item.color}; filter: drop-shadow(0px 0px 5px ${item.color}">
                    <span class="progress-number">${item.progress_number}%</span>
                </div>
            </div>
            <div class="tags">如: ${item.tags}</div>
        </div>
        `
    })
    $(".part3-list").html(_html)
}


// 经历标签点击事件
let _tempHtml = ``
$('.story-box').on('click',function(){
    
    let idx = $(this).attr('date-idx')
    
    _tempHtml = `
        <h3 class="title">${storyList[idx].sub_title}</h3>
        <p class="content">${storyList[idx].content}</p>
        <a class="pop-close" href="javascript:closePop()">×</a>
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
    // console.log("showPop",$(id));
    $(`.pop-model#${id}`).addClass("active")
    // $(`#${id}`).css({
    //     display:'flex'
    // })
}

// 关闭弹窗
function closePop(){
    $('.pop-model').removeClass('active')
}
