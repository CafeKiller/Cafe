/**
  * @file: 页面 移动端核心容器对象相关
  */

if (isMobile()) {
    $('#content').fullpage({
        touchSensitivity: 30, // 控制移动端页面滑动阻力
        afterLoad: function (anchorLink, index) {
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
        onLeave: function (index, direction) {
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