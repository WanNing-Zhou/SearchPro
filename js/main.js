//主要是用来设置跟标签的font-size
function  calculationFont(){
    // 获取屏幕宽度
    let screenWidth = document.documentElement.clientWidth;
    let backImgBox = document.querySelector('#backImgBox');

    // background-image: url("../imgs/bgimg2.png");

    let MUrl = './imgs/Mbgimg.jpg'
    let PCUrl = './imgs/bgimg2.png'

    //如果屏幕不为移动端,则设置浏览器的默认样式
    let fontSize = 16;
    if (screenWidth < 450) {
        // console.log(screenWidth)
        // 计算根元素字体大小，这里假设设计图宽度为750px，根元素字体大小为10px
        fontSize = screenWidth/34;
        backImgBox.style.backgroundImage = `url('${MUrl}')`

    }else if(screenWidth<850){
        fontSize = screenWidth/52
        backImgBox.style.backgroundImage = `url('${PCUrl}')`
    }
    else if(screenWidth > 1920){
        fontSize = 24;
        backImgBox.style.backgroundImage = `url('${PCUrl}')`
    }
    else if(screenWidth > 2100){
        fontSize = screenWidth / 79
        backImgBox.style.backgroundImage = `url('${PCUrl}')`
    }else{
        backImgBox.style.backgroundImage = `url('${PCUrl}')`
    }
    // console.log('这是一段代码',backImgBox.style)
// 设置给html标签
    document.documentElement.style.fontSize = fontSize + 'px';
    // console.log(fontSize)
}
//这是个同步函数,需要在渲染之前执行
calculationFont();


