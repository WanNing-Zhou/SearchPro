// 这个js的延迟加载,在渲染后执行代码
(function () {
    //逆地理定位接口
    const regeoUrl = 'https://restapi.amap.com/v3/geocode/regeo'
    //天气信息接口
    const weatherInfoUrl = 'https://restapi.amap.com/v3/weather/weatherInfo'

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getAddress);
        } else {
            console.log('不支持定位')
        }
    }

    console.log('你好')

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

        drawWeatherInfo(city,weatherInfo)

    }

    //将信息绘制到页面
    function drawWeatherInfo(city,weatherInfo) {
        document.querySelector('.city').innerHTML =   city;
        document.querySelector('.weather').innerHTML =   weatherInfo.weather;
        document.querySelector('.temperature').innerHTML =  weatherInfo.temperature+'℃';
    }

    //获取时间
    function getDate() {
        let date = new Date();
        let YY = date.getFullYear();
        let MM = date.getMonth() + 1;
        let DD = date.getDate();
        let d = `${YY}年${MM}月${DD}日`

        let HH = date.getHours();
        let mm = date.getMinutes();
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
        //获取地理位置
        getLocation()
    }
    drawInfo()
})();


