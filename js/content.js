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


    timeBox.addEventListener('click', () => {

        bgBox.style.transform = 'scale(1.1)';
        // 点击模糊
        bgBox.style.filter = 'blur(10px)';

        searchBox.style.opacity = '1'; //点击的时候先让这个显示
        console.log(sentenceBox);
        timeBox.style.display = 'none' //将这个元素不显示,方式对输入栏干扰
        sentenceBox.style.opacity = '1'; //点击的时候显示一言部分
        searchBoxVisible = true; //将可见性变为0
        searchInput.focus(); //点击的时候让输入框自动获取焦点
        


    })
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

    // 输入框中图标元素
    let searchIcon = document.querySelector('.searchIcon')
    let searchIconsBox = document.querySelector('#searchIconsBox')
    let sIBVis = false; //searchIconsBox的可见性
    //展示图标框
    function searchIconBoxVisible() {
        searchIconsBox.style.height = 18 + 'rem';
        searchIconsBox.style.opacity = '1';
    }

    //隐藏图标框
    function searchIconBoxHidden() {
        searchIconsBox.style.height = '0rem';
        searchIconsBox.style.opacity = '0';
    }

    //添加点击事件
    searchIcon.addEventListener('click', (event) => {

        if (!sIBVis) {
            event.stopPropagation() //阻止时事件冒泡
            searchIconBoxVisible();
            sIBVis = true; //表示图标框可见
        }
    })



    //body dom对象
    let body = document.querySelector('body');

    //隐藏图标框
    body.addEventListener('click', () => {
        if (sIBVis) {
            searchIconBoxHidden();
            sIBVis = false
        }
    })

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
    searchIconsBox.addEventListener('click', (e) => {
        let name = e.target.getAttribute('sName');
        sName = searchs[name]
        // console.log(sName)
        sIcon = sName.icon;
        // console.log(sIcon)
        if (sName) {
            searchIcon.innerHTML = `<span class="iconfont ${sIcon}"></span>`
        }
    })

    let subBtn = document.querySelector('.submit');

    //搜索功能
    function subSearch() {
        let s = searchInput.value;
        //跳转
        location.href = sName.url + s;
    }

    body.addEventListener('keyup',(e)=>{
        if ((e.key==='Enter')&&searchInput.value&&searchInput.value!==''){
           subSearch();
        }
    })

    subBtn.addEventListener('click',()=>{
        subSearch()
    })


    //生成一句话
    fetch('https://v1.hitokoto.cn')
        .then(function (res) {
            //成功返回json数据
            return res.json();
        }).then(function (data) {


        //数据渲染到页面
        document.getElementById('hitokoto-text').innerHTML = data.hitokoto;

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

    let logoBox = document.querySelector('#logoBox');
    let weatherInfo = document.querySelector('#weatherInfo')
    let weatherInfoVisible = false
    logoBox.addEventListener('click',()=>{
        if (searchBoxVisible&&!weatherInfoVisible){
            weatherInfo.style.width = '12rem'
            weatherInfo.style.opacity = '1';
            logoBox.style.transform = 'translateX(-100%)'
            weatherInfoVisible = true
        }else{
            logoBox.style.transform = 'translateX(-50%)'
            weatherInfo.style.width = '0rem';
            weatherInfo.style.opacity = '0';
            weatherInfoVisible = false;
        }
    })


})()


