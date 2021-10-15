//圖片輪播
let timer = null,
    index = 0,
    bannerImg = byId("banner").getElementsByTagName("div"),
    dots = byId("dots").getElementsByTagName("li"),
    imgLen = bannerImg.length,
    dotsLen = dots.length,
    prev = document.getElementById("prev"),
    next = document.getElementById("next");
function byId(id){  //id是個字串型別，先判斷，封裝獲取元素
    return typeof(id)==="string"?document.getElementById(id):id;
}
function stopAutoPlay() { 
    if(timer) {
        clearInterval(timer); //清除定時
    }
}

function startAutoPlay(){
    timer = setInterval(function(){
        index++;
        if(index>=imgLen){
            index=0;
        }
        changeImg();
    },3000)
}
function changeImg() {
    for(let i=0;dotsLen>i;i++){
        dots[i].className = "";
        bannerImg[i].style.display = "none";
    }
    dots[index].className = "active";
    bannerImg[index].style.display = "block";
}

function slideImg() {
    let container = byId("container");
    container.onmouseover = function(){ //滑鼠進去停止輪播
        stopAutoPlay();
    }
    container.onmouseout = function(){  //滑鼠離開自動播放
        startAutoPlay();
    }
    container.onmouseout();  //自動播放
    
    for(let i=0;dotsLen>i;i++) {
        dots[i].id = i ;
        dots[i].onclick = function (){
            index = this.id;
            changeImg();
        }
    }

    next.onclick = function(){
        index++;
        if(index>=imgLen)
        index=0;
        changeImg();    
    }

    prev.onclick = function(){
        index--;
        if(index<0)index = imgLen-1;
        changeImg();
    }
}

slideImg();

//倒數計時
//整理會重置
function getTimeRemaining(endtime) { 
    const total = Date.parse(endtime) - Date.parse(new Date()); //創造變數 total，表示剩餘時間，Date.parse() 將時間字串轉為毫秒值
    const seconds = Math.floor((total / 1000) % 60); //將毫秒轉換為秒
    const minutes = Math.floor((total / 1000 / 60) % 60); //將毫秒轉換為分
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24); //將毫秒轉換為秒小時
    const days = Math.floor(total / (1000 * 60 * 60 * 24)); //將毫秒轉換為天
    return { //將數據返回
        total, days, hours, minutes, seconds 
    }; 
}

function initializeClock(id, endtime) { 
    const clock = document.getElementById(id); 
    const daysSpan = clock.querySelector('.days'); 
    const hoursSpan = clock.querySelector('.hours'); 
    const minutesSpan = clock.querySelector('.minutes'); 
    const secondsSpan = clock.querySelector('.seconds'); 
    function updateClock() { 
        const t = getTimeRemaining(endtime); 
        daysSpan.innerHTML = t.days; 
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2); 
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2); 
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2); 
        if (t.total <= 0) { 
            clearInterval(timeinterval); 
        } 
    } 
    updateClock(); 
    const timeinterval = setInterval(updateClock, 1000); 
}

const deadline = new Date(Date.parse(new Date()) + 4 * 24 * 60 * 60 * 1000); initializeClock('countdownTimer', deadline);













