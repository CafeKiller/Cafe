/**
  * @file 主要函数文件
  */


/* =================================== VARIABLE ================================= */
const $ = JQ = JQuery = jQuery.noConflict()
let part_typed_obj = undefined
let part3Swiper = undefined
let imageSwiper = undefined
/* =================================== VARIABLE ================================= */



/* =================================== INIT ===================================== */

// 页面初始化
$(function () {
    console.log(`%c
        +=================================================================+
        |                                                                 |
        |        >=>                   >=>>    >=>>                       |
        |     >=>   >=>              >>      >>                           |
        |    >=>           >=<     >=>> >> >=>> >>   >==>      >==>       |
        |    >=>         <=>  <=>    >=>     >=>   >>   >=>  >>   >=>     |
        |    >=>        <=>    <=>   >=>     >=>   >>===>>=> >>===>>=>    |
        |     >=>   >=>  <=>  <=>    >=>     >=>   >>        >>           |
        |       >===>      >=<       >=>     >=>    >====>    >====>      |
        |                                                                 |
        |     >=>   >=>        >=>  >=>                                   |
        |     >=>  >=>     >>  >=>  >=>                                   |
        |     >=> >=>          >=>  >=>   >==>    >> >==>                 |
        |     >>=>>       >=>  >=>  >=> >>   >=>   >=>                    |
        |     >=>  >=>    >=>  >=>  >=> >>===>>=>  >=>                    |
        |     >=>   >=>   >=>  >=>  >=> >>         >=>                    |
        |     >=>     >=> >=> >==> >==>  >====>   >==>                    |
        |                                                                 |
        |     => Powered by @Fengm Studio/Coffee_Killer <=                |
        +=================================================================+ 
    `, `color:#8b4513; font-size: 20px; font-weight:800;`);

    // 在window对象上绑定resize监听函数

    IERender()
    initUserInfoDOM()
    initDetailListDOM()

    // 初始化"个人简单介绍"模块DOM
    $(".self-intro").html(selfIntro)

    // 初始化 项目经历(part3) 的swiper
    part3Swiper = new Swiper(".part3-swiper",{
        slidesPerView: "auto",
        spaceBetween: 30,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
    })

    imageSwiper = new Swiper('.image-swiper', {
        slidesPerView: "auto",
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
    })

    renderProjectExperienceDOM(project_experience_arr)
});

// 页面结构&文本相关加载
$(document).ready(function () {
    $(".part1-desc").html(part1_cont)
})
/* =================================== INIT ===================================== */



/* =================================== FUNCTION ================================= */

/**
 * @description 文字写入(typed)模块初始化
 * @param {Object} typed_obj 用于保存typed的对象, 建议为空
 * @param {string} dom_name dom名称
 * @param {Array<string>} str_arr 需要写入的文字的数组
 * @param {Object} options 可选项, 扩展参数
 * */
function typedInit(typed_obj, dom_name, str_arr, options = {}) {
    typed_obj = new Typed(dom_name, {
        strings: str_arr,
        ...options,
        preStringTyped: (arrayPos, self) => {
            if (arrayPos == 0) { document.querySelector(dom_name).innerText = "" }
        },
    })
    return typed_obj
}
/**
 * @description 初始化"当前基本信息"模块DOM
 * */
function initUserInfoDOM() {
    let _dom = ``
    for (const item in myData) {
        _dom += `<div class="user-item user-${item}"> <span>${myData[item].key} :</span> ${myData[item].value}</div>`
    }
    $(".user-info").html(_dom)
}

/**
 * @description 初始化"联系&基本信息"模块DOM
 * */
function initDetailListDOM() {
    let _dom = ``
    for (const item in detailData) {
        _dom += `
        <div class="detail-item ${item}">
            <span class="text-key">${detailData[item].key} :</span>
            <div class="center-mask"></div>
            <p class="text-value">${detailData[item].value}</p>
        </div>
        `
    }
    $(".detail-list").html(_dom)
}

/**
 * @description 渲染项目经历的DOM结构
 * @param {Array} dataArr
 * */
function renderProjectExperienceDOM(dataArr) {
    // 将数组进行倒序排列,让近期的项目排在前面
    let reversedArr = dataArr.slice().reverse();
    let _html = ``
    reversedArr.forEach((item) => {
        _html += `
            <div class="swiper-slide">
                <h1 class="title">${item.title}</h1>
                <p class="time">${item.time}</p>
                <p class="remit">负责：${item.remit}</p>
                <ul class="entry">
                    <li class="first">主要职责</li>
                    ${ (() => {
                        let _html_in = ``
                        item.entry.forEach((_item)=>{
                            _html_in += `<li>${_item}</li>`
                        })
                        return _html_in
                    })() }
                    <li class="last">项目链接：<a target="_blank" href="${item.link}">${item.link}</a></li>
                </ul>
            </div>
        `
    })
    _html += `<div class="swiper-slide"></div>`
    $('.part3-swiper .swiper-wrapper').html(_html)
}

/* =================================== FUNCTION ================================= */



