/**
 * @file: 初始化相关
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

    // 请求首页名言
    $.getJSON('https://v1.hitokoto.cn/', function(res){
        $(".kv-cent").html(`
            <p class="text">${res.hitokoto}</p>
            <p class="about">——<span class="about-name">${res.from}</span></p>
        `)
    })

    // 请求个人简历模块数据
    $.getJSON('./data/my.json', function (data) {
        intro_info = data ? data.intro_info : undefined
        let html = template('intro_info', intro_info)
        $("#part2-wrap").html(html)
    })

    // 请求技术栈模块数据
    $.getJSON('./data/stack.json', function (data) {
        initStack(data.stack_list)
        stack_progress_list = data.stack_list.map((item)=>{
            return item.progress_number
        })
    })

    // 请求故事模块数据
    $.getJSON('./data/story.json', function (data) {
        init_Part4_Swiper(data.text_list)
    })

    // 在window对象上绑定resize监听函数
    autoScrolling();
    $(window).resize(function(){
        autoScrolling();
    });

    // 复制文字函数
    const clipboard = new ClipboardJS('.copy-allowed');
    clipboard.on('success', function(e) {
        Qmsg.success('复制成功')
        e.clearSelection();
    });
    clipboard.on('error', function(e) {
        Qmsg.error('复制失败')
        console.error(e);
    });

});