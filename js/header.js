// 这个js的延迟加载,在渲染后执行代码
(function () {
    //逆地理定位接口
    const regeoUrl = 'https://restapi.amap.com/v3/geocode/regeo'
    //天气信息接口
    const weatherInfoUrl = 'https://restapi.amap.com/v3/weather/weatherInfo'

    const WEATHERS = {
        wind:{
            icon:'icon-feng',
            weatherArr:['有风','微风','和风','清风','强风/劲风','强风','劲风','疾风','大风','烈风','风暴','狂爆风','飓风','热带风暴','平静']
        },
        sunny:{
            icon: 'icon-lieri',
            weatherArr: ['晴','未知']
        },
        smog:{
            icon: 'icon-tianqitianqi',
            weatherArr: ['霾','中度霾','重度霾','严重霾','雾','浓雾','强浓雾','轻雾','大雾','特强浓雾']
        },
        rain:{
            icon: 'icon-dayu',
            weatherArr: ['阵雨','雷阵雨','雷阵雨并伴有冰雹','小雨','中雨','大雨','大雨','大暴雨','特大暴雨','强阵雨','强雷阵雨','极端降雨','毛毛雨/细雨','雨','小雨-中雨','中雨-大雨','大雨-暴雨','暴雨-大暴雨','大暴雨-特大暴雨','雨雪天气','冻雨',]
        },
        snow:{
            icon: 'icon-zhongxue',
            weatherArr: ['雨雪天气','雨夹雪','阵雨夹雪','雪','阵雪','小雪','中雪','大雪','暴雪','小雪-中雪','中雪-大雪','大雪-暴雪']
        },
        sandStorm: {
            icon: 'icon-weather-21',
            weatherArr: ['浮尘', '扬沙', '沙尘暴', '强沙尘暴', '龙卷风']
        },
        cloudy:{
            icon: 'icon-duoyun',
            weatherArr: ['多云','阴','沙尘暴','晴间多云',]
        }
    }

    function getWeatherIcon(weather='晴天'){
        let res = null;
        let icon = null;
        for (let key in WEATHERS){
            let weatherArr = WEATHERS[key].weatherArr;
            res = weatherArr.find(el=>el===weather)
            if (res === weather){
                icon = WEATHERS[key].icon;
                break;
            }
        }
        if (!icon){
            icon='icon-duoyun'
        }
        return icon;
    }

    // console.log('res前')
    console.log(getWeatherIcon('多云'));

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getAddress);
        } else {
            console.log('不支持定位')
        }
    }


    //根据地理坐标获取地址
    async function getAddress(position) {
        // console.log('latitude',position.coords.latitude)//维度
        // console.log('longitude',position.coords.longitude)//经度
        const latitude = position.coords.latitude;//维度
        const longitude = position.coords.longitude;//经度
        let url = `${regeoUrl}?key=5a06876973eeb9493cd323e8bf1baf90&location=${longitude},${latitude}&poitype=&radius=100&extensions=all&batch=false&roadlevel=0`
        let city
        let cityCode
        await fetch(url, {
            method: 'GET',
        }).then((response) => response.json())
            .then(json => {
                city = json.regeocode.addressComponent.city
                cityCode = json.regeocode.addressComponent.adcode
                console.log(json.regeocode)
                // console.log('city',city)
                // console.log(json)
                console.log(cityCode)
            }).catch(error => {
                // console.log(error)
            })
        await getWeather(city, cityCode)
    }

    //获取天气信息
    async function getWeather(city, cityCode) {
        if (!cityCode) {
            cityCode = '230110'
        }

        let url = `${weatherInfoUrl}?city=${cityCode}&key=5a06876973eeb9493cd323e8bf1baf90`
        let weatherInfo
        await fetch(url, {
            method: 'GET'
        }).then(response => response.json())
            .then(json => {
                console.log(json)
               weatherInfo = json.lives[0]
                // console.log(weatherInfo)
            }).catch(error => {
                console.log(error)
            })

        console.log('weatherInfo',weatherInfo)
        if (!weatherInfo){

            weatherInfo={
                weather:"晴天",
                temperature:"30"
            }
        }

        if (!city||city === ''){
            city='哈尔滨'
        }
        drawWeatherInfo(city,weatherInfo)
    }

    //将信息绘制到页面
    function drawWeatherInfo(city,weatherInfo) {
        document.querySelector('.city').innerHTML =   city;
        document.querySelector('.weather').innerHTML =   weatherInfo.weather;
        let weaIcon = getWeatherIcon(weatherInfo.weather)
        document.querySelector('.weaIco').innerHTML = `<span class="iconfont ${weaIcon}"></span>`
        document.querySelector('.temperature').innerHTML =  weatherInfo.temperature+'℃';
    }

    function addZero(num){
        num = parseInt(num);
        if (num<10){
            num  = '0' + num;
        }
        return num;
    }
    //获取时间
    function getDate() {
        let date = new Date();
        let YY = date.getFullYear();
        let MM = date.getMonth() + 1;
        let DD = date.getDate();

        MM = addZero(MM)
        DD = addZero(DD)

        let d = `${YY}年${MM}月${DD}日`

        let HH = date.getHours();
        HH = addZero(HH)
        let mm = date.getMinutes();
        mm = addZero(mm)
        let time = `${HH}:${mm}`;
        return {
            day: d,
            YY,
            MM,
            DD,
            HH,
            mm,
            time
        }
    }
    function drawInfo(){
        let date = getDate()
        setInterval(()=>{
            date = getDate()
            // console.log(date)
            document.querySelector('.headerDate').innerHTML = date.day;
            document.querySelector('.headerTime').innerHTML = date.time;
            document.querySelector('.Atime').innerHTML = date.time
        },1000)
        drawWeatherInfo('哈尔滨',{
            weather:"晴天",
            temperature:"30"
        })
        //获取地理位置
        getLocation()
    }
    drawInfo()

})();


