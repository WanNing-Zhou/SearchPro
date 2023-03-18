window.onload = function(){
    function show(){
        var now = new Date();
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth()+1;//得到月份
        var date = now.getDate();//得到日期
        // var day = now.getDay();//得到周几
        var hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
        var minute= now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
        var second= now.getSeconds();//得到秒数
        var time = document.querySelector(".class");
        var header = document.querySelector("#header");
        var y = header.querySelector("#y");


        document.getElementById("h").innerHTML  = hour;
        document.getElementById("m").innerHTML = minute;
        // document.getElementById("s").innerHTML = second;
        setTimeout(show,10000);//定时器一直调用show()函数
        return "";
    }
    show();
    function hiddenBlock(){
        let flag = 2;
        let time = document.querySelector(".time");
        let innerTime = document.querySelector(".innertime");
        let logo = document.querySelector("#logo");
        let searchBox = document.querySelector(".searchBox");
        let searching = document.querySelector(".searching");
        logo.addEventListener('click',() =>{
                if(flag % 2 == 0){
                    time.style.width = '40rem'
                    time.style.height = '4rem'
                    innerTime.style.opacity = '0';

                }
                else{
                    time.style.width = '10rem'
                    time.style.height = '7rem'
                    innerTime.style.opacity = '1'
                    // searchBox.style.width = '10rem';
                    // searchBox.style.height = '7rem';
                    // searching.style.opacity = '1';

                }
                flag = flag + 1;
            }

        )
    }
    hiddenBlock();
    function buttonClick(){
        let searchbox = document.querySelector(".searching");
        let btn = document.querySelector("button");
        btn.onclick = () =>{

        }

    }
    buttonClick();

}