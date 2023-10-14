/*
 * Js_Desc: 初始化相关
 */



let stack_progress_list = {}
let part5_current_active = 0
let intro_info = {}

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
        |     => Powered by @Fengm Studio/Coffee_Killer <=                |
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

    $.getJSON('./data/my.json', function (data) {
        intro_info = data ? data.intro_info : undefined
        let html = template('intro_info', intro_info)
        $("#part2-wrap").html(html)
    })

    $.getJSON('./data/story.json', function (data) {
        init_Part4_Swiper(data.text_list)
    })


    // console.log();

    autoScrolling();

    // 在window对象上绑定resize监听函数
    $(window).resize(function(){
        autoScrolling();
    });

    
    
    // template.render(source, data, options);
});