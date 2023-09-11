/*
 * Js_Desc: 初始化相关
 */

let stack_progress_list = {}
let part5_current_active = 0

$(function(){

    console.log(`
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
        |     = Powered by @Fengm Studio/Coffee_Killer                    |
        +=================================================================+
    `);

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