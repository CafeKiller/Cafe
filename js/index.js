$(function(){
    
    // 创建 Jquery.fullPage 对象
    $('#content').fullpage({
        // 进入页面 回调函数
        afterLoad: function(anchorLink, index){
            switch (index) {
                case 1:
                    TweenMax.staggerTo(".part1-cont div", 0.3, {opacity: 1,y: 60,delay:0.3},0.3)
                    break
                case 2:
                    $(".part2-icon1, .part2-icon2").addClass("active")
                    break
                case 3:
                    TweenMax.staggerTo(".part3-item", 0.2, {opacity: 1,x: 60,delay:0.15}, 0.1,()=>{
                        stackProgressLoad(stack_progress_list)
                        $('.part3-icon-1').css({ "animation": "MarioJump .2s 3 linear" })
                        $('.part3-icon-2').css({ "animation": "CubeSway .2s 3 linear" })
                    })
                    break
                case 4:
                    TweenMax.staggerTo(".swiper-slide", 0.3, {opacity: 1,y: -20,delay:0.2}, 0.15)
                    TweenMax.staggerTo(".p4swiper-pagination", 0.3, {opacity: 1,y: -20,delay:0.2}, 0.15)
                    $(".p4swiper .swiper-slide").css({"pointer-events":"all"})
                    break
                case 5:
                    TweenMax.staggerTo(".left-model",0.3, {opacity: 1,x: 80,delay:0.2}, 0.15)
                    TweenMax.staggerTo(".btom-model",0.2, {opacity: 1,y: -80,delay:0.2}, 0.15,() => {
                        $(`.part5-cont-item:eq(${part5_current_active})`).addClass("active")
                        init_Part5Item_MouseEvent()
                    })
            }
		},
        // 离开页面 回调函数
		onLeave: function(index, direction){
            switch (index) {
                case 1:
                    TweenMax.staggerTo(".part1-cont div", 0.1, {opacity: 0,y: -60,delay:0.01},0.1)
                    break
                case 2:
                    $(".part2-icon1, .part2-icon2").removeClass("active")
                    break
                case 3:
                    TweenMax.staggerTo(".part3-item", 0.1, {opacity: 0,x: -60,delay:0.01}, 0.1,()=>{
                        stackProgressBack()
                        $('.part3-icon-1, .part3-icon-2').css({ "animation": "none" })
                    })
                    break
                case 4:
                    TweenMax.staggerTo(".swiper-slide", 0.2, {opacity: 0,y: 0,delay:0.01}, 0.15)
                    TweenMax.staggerTo(".p4swiper-pagination", 0.2, {opacity: 0,y: 20,delay:0.01}, 0.15)
                    $(".p4swiper .swiper-slide").css({"pointer-events":"none"})
                    break
                case 5:
                    TweenMax.staggerTo(".left-model",0.2, {opacity: 0,x: -80,delay:0.01}, 0.15)
                    TweenMax.staggerTo(".btom-model",0.2, {opacity: 0,y: 80,delay:0.01}, 0.15,() => {
                        $('.part5-cont-item').removeClass("active")
                    })
            }
		}
    });

    $.getJSON('https://v1.hitokoto.cn/', function(res){
        console.log("data",res);
        $(".kv-cent").html(`
            <p class="text">${res.hitokoto}</p>
            <p class="about">——<span class="about-name">${res.from}</span></p>
        `)
    })

    $.getJSON('./data/stack.json', function (data) {
        initStack(data.stack_list)
        stack_progress_list = data.stack_list.map((item)=>{
            return item.progress_number
        })
    })

    $.getJSON('./data/story.json', function (data) {
        init_Part4_Swiper(data.text_list)
    })

    autoScrolling();

    // 在window对象上绑定resize监听函数
    $(window).resize(function(){
        autoScrolling();
    });

});

let stack_progress_list = {}
let part5_current_active = 0

// Part4Swiper对象
const p4swiper = new Swiper(".p4swiper", {
    loop:true,
    slidesPerView: 3,
    spaceBetween:20,
    pagination: {
        clickable: true,
        el: ".p4swiper-pagination",
    },
    
});

// 初始化技术栈页面
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

// 技术栈进度条加载(进入状态)
function stackProgressLoad(progress_list){
    progress_list.forEach((item,idx)=>{
        $(`.part3-item:eq(${idx}) .progress-inner`).css({
            "width": `${item}%`,
            "transition": "width .55s ease-in"
        })
    })
}
// 技术栈进度条加载(离开状态)
function stackProgressBack(){
    $(`.part3-item .progress-inner`).css({
        "width": `0%`,
        "transition": "width .15s ease-in"
    })
}

// 初始化Part4-Swiper模块函数
function init_Part4_Swiper(story_list){

    // 渲染Part4 SwiperSlide标签
    story_list.forEach((item,idx)=>{
        p4swiper.appendSlide(`
            <div class="swiper-slide">
                <div class="story-box story-box-num${idx}" date-idx="${idx}">
                    <h3>${item.title.toUpperCase()}</h3>
                    <img src="${item.cover}" alt="StoryCover_${item.title}">
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
        $('.pop-story-cont').html(_tempHtml)
        _tempHtml = ``;
        showPop("pop-story")
    })
      
}

// 初始化 Part5-Item 的鼠标事件
function init_Part5Item_MouseEvent(){
    const p5_Len =  $(".part5-cont-item").length
    $(`.part5-cont-item:lt(${ p5_Len-1 })`).on("mouseover",function(){
        $(this).addClass("active").siblings().removeClass('active')
    })
}

// 通用开启弹窗函数
function showPop(id){
    // 添加弹窗样式
    $(`.pop-model#${id}`).addClass("active")

    // 判断是否为Story故事模块, 如果是Story模块则添加相对应的动画
    if(id === "pop-story"){
        TweenMax.to(".pop-story-cont", 0.5, {opacity: 1,y: -100,delay:0.5}, 0.15)
    }
}

// 通用关闭弹窗函数
function closePop(id){
    // 判断关闭的是否为Story故事模块, 如果是Story模块则移除相对应的动画
    // 如果不是Story模块,则移除弹窗样式
    if(id === "pop-story"){
        TweenMax.staggerTo(".pop-story-cont", 0.3, {opacity: 0,y: 100,delay:0.2}, 0.15,function(){
            $('.pop-model').removeClass('active')
        })
    }else{
        $('.pop-model').removeClass('active')
    }
}

// 复制文字函数
function copyText(domNode){
    let text = $(domNode).text()
    const _clipb = navigator.clipboard
    _clipb ? navigator.clipboard.writeText(text) : console.log("当前浏览器无法支持复制");
}

// fullPage 响应式适配函数
function autoScrolling(){
    var $ww = $(window).width();
    /* if($ww < 1024){
        $.fn.fullpage.setAutoScrolling(false);
    } else {
        $.fn.fullpage.setAutoScrolling(true);
    } */
}
