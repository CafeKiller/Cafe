const myData = {
    name: { key: "昵称", value: "咖啡" },
    age: { key: "年龄", value: "20" },
    work_exp: { key: "工作年限", value: "11 month" },
    current_job: { key: "当前职位", value: "前端开发" },
    current_city: { key: "现居城市", value: "广东深圳" },
}

const detailData = {
    wx: { key: "微信号", value: "Coffee2333" },
    qq: { key: "Q Q号", value: "1691810090" },
    email: { key: "邮箱", value: "zaiqiao2481@163.com" },
    phone: { key: "手机号", value: "17336668888" },
    lang: { key: "擅长语言", value: "Java、JavaScript、Python" },
    school: { key: "教育背景", value: "2023届潮汕职业技术学院(专科)" },
}

const selfIntro = `嗨！ 你好, 我是来自广东梅州的咖啡，一位客家人；目标是成为一个有趣的全栈开发工程师，目标很大但道阻且长、行则将至， 所以一起努力吧；我的话不多但我性格开朗、善于沟通，虚心学习、吃苦耐劳、具有顽强的抗压能力。`

const story = {
    "text_list": [
        {
            "title": "Lesson-1",
            "sub_title": "第一年",
            "image": "./images/lesson1.jpg",
            "cover": "./images/lesson-small1.jpg",
            "timer": "2020YearEnd",
            "content": "在高三时学习成绩非常糟糕，那时我感觉自己不是一块学习的料；但也不知为何，当时却意外的对一些杂七杂八的知识非常感兴趣。同时也因为同学的介绍，接触了Java语言。那时高三的寒假（20年疫情）多了很多空闲，人一闲下来就喜欢胡思乱想，想到自己将来学历肯定不高，想找安稳工作肯定难，就思量着要学一门能吃混的上一口饭的技术，可我们家也没资源找师傅啥的，传统手艺肯定是没戏了。不知何时想起的好友的那句“学Java吗？”，便在B站上找到了杜老师的Java教程，此刻变开始了我的懵懂青涩的Java之路。<br/>记得当时家里没有电脑，而当时为了学习Java只能在手机上下载一个简单的编译器运行Java，多数知识都是靠手写笔记记下的。后来开学了（记得当时一个寒假居然过了两三个月），因为学校高中部整体教学质量一般，老师也管的宽泛，我便时常在晚自习时用手机偷偷看Java教程。后来，高中生涯结束，那年暑假刚过10天我便外出打工了，一直打工到大概9月初（当时疫情原因学校是10月开学）那时我用自己打工赚来的钱组装了一台小体积的ITX主机，高三的暑假最后一个月，我终于敲上了代码。"
        },
        {
            "title": "Lesson-2",
            "sub_title": "第二年",
            "image": "./images/lesson2.jpg",
            "cover": "./images/lesson-small2.jpg",
            "timer": "2021YearBeg",
            "content": "大学时期我选的是计算机中的软件技术方向，主要学习的是Web端开发。大学的第一学期学习的机会并不多，更多的是学校的一些琐事，开学新生会、社团招募会，冬季军训......（记得当时是10月开学，学校是1月中旬放寒假，这些杂七杂八的活动的东西就占了有一个月），中间只有一段时间给我们学习专业相关知识，第一学期的专业课程主要有：计算机基础、Java基础、HTML、CSS、PS那年寒假我并没有选择去打工，而是直接回家过年，其间将JavaSE系统性的学习完了，同时学习了C语言的相关基础（当时是听说当程序员都得学C就去学了）<br/>大概2月末学校终于开学了（当时还处于疫情环境下），第二学期，是比第一学期舒服多了的，少了很多琐事，学习时间也多了不少，第二学期的专业课程主要有：JavaSE、Javascript、Bootstrap这个学期我主要是去学习前端以及Javascript了。同时Java部分则是自己自学到了MySQL数据库以及JDBC连接，还有JavaGUI编程部分。总体而言学校教的不如我自己自学的快（大学便是如此，师傅领进门修行靠个人）大概到了7月份学校开始放暑假了，我和几位同学去了一趟深圳找了一下工作，但是经验太少同时还是暑期工，本专业的工作完全不可能，索性便直接回了家，这年暑假Python大火，那时我便也跟风学了一阵，后面有学习了JavaWeb，以及JavaScript的AJAX以及部分高级玩法，同时将MySQL系统性的学习完成。"
        },
        {
            "title": "Lesson-3",
            "sub_title": "第三年",
            "image": "./images/lesson3.jpg",
            "cover": "./images/lesson-small3.jpg",
            "timer": "2022YearBeg",
            "content": "到了大二，我已开始渐渐地进入状态，开始系统性的学习开发相关的知识，自学Spring，学习JavaMVC框架，前端则是开始接触Vue，还有一些辅助工具如Maven、Git、Postman等这一学期学校开设的相关课程有JavaWeb开发、Jquery、MySQL、移动端适配（虽然这几个我都自学过了，但这会学校是教的挺不错的），同时学校也开始更多的配合着项目对我们进行教学。但是也是从这个时候开始家里频繁出现矛盾，导致我时常感到学习乏力，记得这学期的寒假因为疫情影响我是直接回家了的。寒假在家我开始学习Liunx和Vue2 <br/>到了大二的下学期，我开始自学SpringBoot相关的知识，也在这时接触到了与分布式相关的知识，前端方面我则是开始学习Vue3以及Nodejs的相关知识。而这学期学校开设的专业课程有：JavaMVC框架、Vue2、微信小程序开发（个人认为是学校最好的一次课程）、桌面程序开发；同时，因为有非同专业舍友的缘故，我接触到了同学的PHP，对其有了一定了解；也因为微信小程序我开始学习UniAPP随后有到了七月份，这此我本不想回家，便在期末陪舍友一起去了趟东莞找工作，但刚好碰到了疫情回升时期，即使是东莞工作形势也非常糟糕，四天后我便回了家在家附近找工作，这个暑假我学习了JVM原理、Typescript、MongoDB数据库，设计模式，同时也是在这期间受到一篇文章的影响，我决定将自己的终身目标定为：全栈开发工程师。"
        },
        {
            "title": "Lesson-4",
            "sub_title": "第四年",
            "image": "./images/lesson4.jpg",
            "cover": "./images/lesson-small4.jpg",
            "timer": "2023YearBeg",
            "content": "我的专科是三年制的，最后一学年的第一学期是学习，第二学年则是出校实习；也许是长期的家庭原因也许临近实习了，我居然在这一时期有了很严重的焦虑感，体重也在飙涨需要时常去运动减重，同时也导致了我学习开始有点不专注，这一年学校的课程安排极其混乱：Springboot、软件管理、Uniapp、Vue3、Liunx、色彩管理（这几个课程老师都教的非常不走心，教学效果可以说相当糟糕）还有当时也是一堆考证和比赛，属实是把我的学习效率降到了最低，同时我确认好要找Web开发相关的实习，便开始重新复习Web的相关知识，同时也在那一时期开始学习SpringCloud、Redis、Nginx等与分布式相关的知识。到了12月份学校附近开始爆发大规模疫情我们则是被迫提前离校（过了几天疫情便开始全面解禁了），也正是因为如此我便放弃了年前找实习的打算，决定年后出发。在这期间我调整心态，开始学习SpringCloud、RabbitMQ、MyBatisPlus等进阶知识。"
        }
    ]
}

const part1_arr = [
    "The real talent is resolute aspirations。^3000",
    "All things are difficult before they are easy， and every science。^3000",
    "Great works not by strength， but by insist to complete。^3000",
    "Event is not the size of the power， and can insist on how long。^3000",
]

const part1_cont = `
    嗨~ 你好呀！欢迎来到我的咖啡屋<span>(Cafe)</span>，
    <br>我是Coffee，正在努力成为一个有趣的全栈开发工程师。
`

const project_experience_arr = [
    {
        title: "卡拉彼丘拍卖行",
        time: "2023年12月 —— 2024年1月",
        remit: "前端开发",
        leven: "",
        entry: [
            "负责将设计师提供的原稿转换前端的HTML结构页面，并编写CSS样式的，完成对各类PC设备的适配；并且整合gsap动画组件，完成页面动画的构建；",
            "引入milo组件与腾讯后端业务进行对接，与后端人员进行沟通，制定服务接口，实现实时数据交互；",
            "通过whistle配置测试环境，使用Wireshark或WebDevTool抓取实际后端数据，配合测试人员完成功能测试与bug修复；",
        ],
        link: "https://klbq.qq.com/cp/GloveAuctionHouse/index.html"
    },
    {
        title: "卡拉彼丘长廊复现",
        time: "2023年12月 —— 2024年1月",
        remit: "前端开发",
        leven: "",
        entry: [
            "负责将设计师提供的原稿转换前端的HTML结构页面，并编写CSS样式的，完成对各类PC设备的适配；并且整合gsap动画组件，完成页面动画的构建；",
            "引入milo组件与腾讯后端业务进行对接，与后端人员进行沟通，制定服务接口，实现实时数据交互；",
            "通过whistle配置测试环境，使用Wireshark或WebDevTool抓取实际后端数据，配合测试人员完成功能测试与bug修复；",
        ],
        link: "https://klbq.qq.com/cp/GloveAuctionHouse/index.html"
    },
    {
        title: "卡拉彼丘自定义挑战",
        time: "2023年12月 —— 2024年1月",
        remit: "前端开发",
        leven: "",
        entry: [
            "负责将设计师提供的原稿转换前端的HTML结构页面，并编写CSS样式的，完成对各类PC设备的适配；并且整合gsap动画组件，完成页面动画的构建；",
            "引入milo组件与腾讯后端业务进行对接，与后端人员进行沟通，制定服务接口，实现实时数据交互；",
            "通过whistle配置测试环境，使用Wireshark或WebDevTool抓取实际后端数据，配合测试人员完成功能测试与bug修复；",
        ],
        link: "https://klbq.qq.com/cp/GloveAuctionHouse/index.html"
    },
]

const project_firms_arr = [
    {name: '深圳我蓬科技有限公司', project_num: 3 },
]