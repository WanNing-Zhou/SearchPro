(function () {
    //timeBox的元素
    let timeBox = document.querySelector('#timeBox')
    // console.log(timeBox)
    //searchBox元素
    let searchBox = document.querySelector('#searchBox')
    // searchBox是否可见?
    let searchBoxVisible = false;

    // 输入框元素
    let searchInput = document.querySelector('.inputArea');

    let sentenceBox = document.querySelector('.sentencebox');

    let bgBox = document.querySelector('#backImgBox');


    //body dom对象
    let body = document.querySelector('body');
    // 输入框中图标元素
    let searchIcon = document.querySelector('.searchIcon')
    let searchIconsBox = document.querySelector('#searchIconsBox')
    let sIBVis = false; //searchIconsBox的可见性
    /**
     * 这个监听器会监听timeBox的鼠标点击事件,
     * 如果点击的时候会将元素隐藏,并将主体内容显示出来
     * 后期会将里面的内容分装成函数
     * 来控制主体内容的显示与隐藏
     */

    let logoBox = document.querySelector('#logoBox');
    let weatherInfo = document.querySelector('#weatherInfo')
    let weatherInfoVisibleFlag = false

    let subBtn = document.querySelector('.submit');

    let hitokotoText =  document.getElementById('hitokoto-text')



    /*
        //设置模糊
        function filterSet (){

            searchInput.addEventListener("click",function(){
                bgBox.style.filter = 'blur(10px)';
                searchBox.style.opacity = '1';
                searchBoxVisible = true;
                sentenceBox.style.opacity = '1';
            });
            searchInput.addEventListener("blur",function(){

                bgBox.style.filter = "none";
                timeBox.style.display = 'block';
                searchBox.style.opacity = '0';
                sentenceBox.style.opacity = '0';

            });
        }
        filterSet();
        */

    let contentVisibleFlag = false; //主体内容是否可见

    //将搜索引擎封装再一个对象里
    const searchs = {
        baidu: {
            icon: 'icon-baidu',
            url: 'https://www.baidu.com/s?ie=utf-8&wd='
        },
        Bing: {
            icon: 'icon-bing',
            url: 'https://cn.bing.com/search?q='
        },
        Google: {
            icon: 'icon-guge',
            url: 'http://www.google.cn/search?q=',
        },
        San60: {
            icon: 'icon-icon-test',
            url: 'https://www.so.com/s?ie=utf-8&shb=1&src=noscript_home&q=',
        },
        SouGou: {
            icon: 'icon-sogou',
            url: 'https://www.sogou.com/sogou?query=',
        }
    };

    //默认使用bing搜索引擎
    let sName = searchs.Bing;
    let sIcon = searchs.Bing.icon;

    sentenceBox.addEventListener('click',(even)=>{
        even.stopPropagation()
    })

    //天气内容显示
    function weatherInfoVisible(){
        weatherInfo.style.width = '12rem'
        weatherInfo.style.opacity = '1';
        logoBox.style.transform = 'translateX(-100%)'
        weatherInfoVisibleFlag = true
    }
    //天气内容不显示
    function weatherInfoDisVisible(){
        logoBox.style.transform = 'translateX(-50%)'
        weatherInfo.style.width = '0rem';
        weatherInfo.style.opacity = '0';
        weatherInfoVisibleFlag = false;
    }

    //主体内容显示
    function contentVisible (){
        bgBox.style.transform = 'scale(1.1)';
        // 点击模糊
        bgBox.style.filter = 'blur(10px)';

        searchBox.style.opacity = '1'; //点击的时候先让这个显示
        // console.log(sentenceBox);
        // timeBox.style.display = 'none' //将这个元素不显示,方式对输入栏干扰
        timeBox.style.zIndex = '-1'
        timeBox.style.opacity = '0'
        timeBox.style.width = '72%'
        // timeBox.style.width = '50rem'
        sentenceBox.style.opacity = '1'; //点击的时候显示一言部分
        searchBoxVisible = true; //将可见性变为0
        searchInput.focus(); //点击的时候让输入框自动获取焦点
    }

    //主体内容隐藏
    function contentDisVisible(){

        bgBox.style.transform = 'scale(1)';
        bgBox.style.filter = 'blur(0px)';
        searchBox.style.opacity = '0'; //点击的时候先让这个显示
        // timeBox.style.display = 'block' //将这个元素不显示,方式对输入栏干扰
        timeBox.style.zIndex = '1'
        timeBox.style.opacity = '1'
        timeBox.style.width = '12rem'

        sentenceBox.style.opacity = '0'; //点击的时候显示一言部分
        searchBoxVisible = false; //将可见性变为0
        searchInput.blur(); //点击的时候让输入框自动获取焦点
        searchInput.value = ""; //将内容清空
        weatherInfoDisVisible()
    }


    //展示图标框
    function searchIconBoxVisible() {
        searchIconsBox.style.height = 18 + 'rem';
        searchIconsBox.style.opacity = '1';
    }

    //隐藏图标框
    function searchIconBoxHidden() {
        searchIconsBox.style.height = '0rem';
        searchIconsBox.style.opacity = '0';
        sIBVis = false
    }


    //搜索功能
    function subSearch() {
        let s = searchInput.value;
        //跳转
        location.href = sName.url + s;
    }

    searchBox.addEventListener('click',(event)=>{
        event.stopPropagation()
    })

    //点击显示主体内容
    timeBox.addEventListener('click', (event) => {
        if(!contentVisibleFlag){
            contentVisible()
            contentVisibleFlag = true;
            event.stopPropagation()
        }
    })


    //点击显示图标框
    searchIcon.addEventListener('click', (event) => {

        event.stopPropagation() //阻止时事件冒泡
        if (!sIBVis) {
            searchIconBoxVisible();
            sIBVis = true; //表示图标框可见
        }else{
            searchIconBoxHidden();
            sIBVis = false;
        }
    })



    //隐藏图标框
    body.addEventListener('click', () => {
        if (sIBVis) {
            searchIconBoxHidden();
        }
        else if(contentVisibleFlag){
            contentDisVisible()
            contentVisibleFlag = false;
        }
    })

    //点击切换搜索引擎
    searchIconsBox.addEventListener('click', (e) => {
        let name = e.target.getAttribute('sName');
        sName = searchs[name]
        // console.log(sName)
        sIcon = sName.icon;
        // console.log(sIcon)
        if (sName) {
            searchIcon.innerHTML = `<span class="iconfont ${sIcon}"></span>`
        }
        searchIconBoxHidden();
        e.stopPropagation()//阻止事件冒泡
    })

    // 点击回车会发送请求
    body.addEventListener('keyup',(e)=>{
        if ((e.key==='Enter')&&searchInput.value&&searchInput.value!==''&&contentVisibleFlag){
           subSearch();
        }
    })


    subBtn.addEventListener('click',(event)=>{
        if (searchInput.value&&searchInput.value!==''&&contentVisibleFlag){
            subSearch();
        }
        event.stopPropagation()
    })


    //生成一句话
    fetch('https://v1.hitokoto.cn')
        .then(function (res) {
            //成功返回json数据
            return res.json();
        }).then(function (data) {

        //数据渲染到页面
       hitokotoText.innerHTML = data.hitokoto;

        let from_who = data.from_who;
        let from = data.from;

        //判断作者和来源是否为空
        if (from_who == null) {
            from_who = "";
        }

        if (from == null) {
            from = "";
        }

        //如果都为空就不显示
        if (from || from_who) {
            document.getElementById('hitokoto-author').innerHTML = "—— " + from_who + "    [" + from +
                "]";
        }
    })
        .catch(function (err) {
            //发生错误打印错误信息
            console.error(err);
        })



    logoBox.addEventListener('click',(event)=>{
        if (searchBoxVisible&&!weatherInfoVisibleFlag){
            weatherInfoVisible()
        }else{
            weatherInfoDisVisible();
        }
        event.stopPropagation() //阻止事件冒泡

    })

})()


