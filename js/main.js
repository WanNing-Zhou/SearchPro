function  calculationFont(){
    // 获取屏幕宽度
    let screenWidth = document.documentElement.clientWidth;
    //如果屏幕不为移动端,则设置浏览器的默认样式
    let fontSize = 16;
    if (screenWidth < 850) {
        // 计算根元素字体大小，这里假设设计图宽度为750px，根元素字体大小为10px
        fontSize = screenWidth / 42;
    }
// 设置给html标签
    document.documentElement.style.fontSize = fontSize + 'px';
}



