/**
  * @file: 页面 PC端核心容器对象相关
  */

if(!isMobile()) {
    $('#content').fullpage({
        scrollingSpeed: 1000, //设置滚动速度，单位毫秒，默认700
        easing: 'easeOutBack', //定义页面section滚动的动画方式，若修改此项需引入jquery.easing插件
        afterLoad: function(anchorLink, index){
            switch (index) {
                case 1:
                    
                    break
                case 2:
                    
                    break
                case 3:
                    
                    break
                case 4:
                    
                    break
                case 5:
                    
            }
        },
        onLeave: function(index, nextIndex, direction){
            switch (index) {
                case 1:
                    
                    break
                case 2:
                    
                    break
                case 3:
                    
                    break
                case 4:
                    
                    break
                case 5:
                    
            }
        }
    });

}
