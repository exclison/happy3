window.onload = function () {

    var spaceWidth = document.body.clientWidth;
    var bodyHeight = document.body.scrollHeight;

    var documentHeight = bodyHeight;
    var documentWidth = spaceWidth;
//音乐
//底部显示区域总宽度
    var footerW = $('.myaudio').width();
//中央显示区域的宽度
    var audioW = $('.myaudio-center').width();

    $('.myaudio-center').css({'left': (footerW - audioW) / 2})
    $('.aud-show').css({'width': audioW - 70})
    $('#Progress').css({'width': audioW - 170})
    var tragc = 0;
    var ii = 0;

    $('#play').click(function () {
        ii++;

        if (ii == 1) {
            $(this).attr('src', 'img/play.png');
            aud_pause();

            return;
        }
        if (ii % 2 != 0) {
            $(this).attr('src', 'img/pause.png');
            aud_play();
        } else {
            $(this).attr('src', 'img/play.png');
            aud_pause();
        }
    });
    var music;
    var auTime = 0;
    var audio = document.querySelectorAll('audio');

    function isChrome() {

        function browser() {
            var explorer = window.navigator.userAgent;
            //判断是否为IE浏览器
            if (explorer.indexOf("MSIE") >= 0) {
                return 'ie';
            }
            //判断是否为Firefox浏览器
            else if (explorer.indexOf("Firefox") >= 0) {
                return 'Firefox';
            }
            //判断是否为Chrome浏览器
            else if (explorer.indexOf("Chrome") >= 0) {
                return 'Chrome';
            }
            //判断是否为Opera浏览器
            else if (explorer.indexOf("Opera") >= 0) {
                return 'Opera';
            }
            //判断是否为Safari浏览器
            else if (explorer.indexOf("Safari") >= 0) {
                return 'Safari';
            }
        }

        var browserType = browser();


        // var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
        // alert(isChrome);
        if (browserType == 'Chrome' || browserType == 'Safari') {
            // alert("是Chrome浏览器");
            ii = 2;
        } else {
            // alert("不是Chrome浏览器");
            aud_play();
            //自动播放
            $('#play').attr('src', 'img/pause.png');


        }
    }

    isChrome();

    function aud_play(q=0) {
        audio[tragc].currentTime = q;
        audio[tragc].play();

        music = setInterval(function () {
            var curtime = audio[tragc].currentTime.toFixed(2);//播放进度
            var durtime = audio[tragc].duration.toFixed(2);//播放时间
            var str = "00:00";

            var time = formatSeconds(curtime);

            var time1 = str.substring(0, str.length - formatSeconds(durtime).length) + formatSeconds(durtime);

            $('#Progress-time').html(time);
            $('#Progress-end').html(time1);
            $width = curtime / durtime * (audioW - 181);
            $('#jin').css({width: $width})
            $('#yuan').css({left: $width})
        }, 100);
    }

    function aud_pause() {
        document.querySelectorAll('audio')[tragc].pause();
        clearInterval(music);
    }

    function formatSeconds(value) {
        var theTime = parseInt(value);// 秒
        var theTime1 = 0;// 分
        var theTime2 = 0;// 小时
        if (theTime > 60) {
            theTime1 = parseInt(theTime / 60);
            theTime = parseInt(theTime % 60);
            if (theTime1 > 60) {
                theTime2 = parseInt(theTime1 / 60);
                theTime1 = parseInt(theTime1 % 60);
            }
        }
        var result = "" + theTime;
        result = (result.length == 1) ? '0' + result : result;
        if (theTime1 > 0) {
            theTime1 = (theTime1.length == 1) ? '0' + theTime1 : theTime1;

            result = "" + theTime1 + ":" + result;
        }
        if (theTime2 > 0) {
            theTime2 = (theTime2.length == 1) ? '0' + theTime2 : theTime2;
            result = "" + theTime2 + ":" + result;
        }
        result = (result.length == 2) ? '00:' + result : result;
        return result;
    }

    for (var i = 0; i < audio.length; i++) {
        audio[i].tragc = i;
        audio[i].addEventListener('ended', function () {
            console.log('结束');
            tragc = parseInt(this.tragc);
            tragc++;
            if (tragc > 2) {
                tragc = 0;
            }
            aud_play();
        })
    }


    document.body.style.visibility = 'visible';

    //主体js代码

    var h1 = document.getElementById('h_1');
    var h2 = document.getElementById('h_2');
    var h3 = document.getElementById('h_3');
    var spaner = document.getElementsByClassName('spaner')[0];

    /*动态改变字体颜色*/
    function colorChange(dom, clas, targ) {
        var str = dom.innerText;
        var domWidth = dom.offsetWidth;
        var domArr = str.split('');
        var len = domArr.length;
        var leen = Math.ceil(len / 2);


        var hwenArr = [];
        dom.innerHTML = '';


        if (spaceWidth < 768 && leen >= 10) {

            var Width = Math.floor(domWidth / leen);
            var s1Arr = [], s2Arr = [];
            for (var i = 0; i < domArr.length; i++) {
                if (i < leen) {
                    s1Arr.push(domArr[i]);
                } else {
                    s2Arr.push(domArr[i]);
                }
            }

            dvbushu(s1Arr, Width);
            dvbushu(s2Arr, Width);

        } else {

            var Width1 = Math.floor(domWidth / len);
            dvbushu(domArr, Width1);
        }

        function dvbushu(Arr, width) {
            var ndvfa = document.createElement('div');
            ndvfa.className = 'clearfix';
            for (var i = 0; i < Arr.length; i++) {
                var ndv = document.createElement('div');
                var h = document.createElement('h' + targ + '');
                ndv.setAttribute('class', clas);
                ndv.style.width = width + 'px';
                ndv.style.height = width + 'px';
                ndv.style.fontSize = width + 'px';
                ndv.style.lineHeight = width + 'px';
                ndv.style.marginTop = width / 2 + 'px';
                ndv.innerHTML = Arr[i];
                ndv.style.color = '#DE57DE';
                h.appendChild(ndv);
                ndvfa.appendChild(h);
                hwenArr.push(ndv);
            }
            dom.appendChild(ndvfa);


            dom.style.width = width * (Arr.length);
        }


        var timeTd = setInterval(function () {
            for (var i = 0; i < hwenArr.length; i++) {
                var color1 = parseInt(Math.random() * 120);
                var color2 = parseInt(Math.random() * 70) + 180;
                hwenArr[i].style.color = 'rgba(255,' + color1 + ',' + color2 + ',1)';
            }

            var pcolor1 = parseInt(Math.random() * 130) + 125;
            var pcolor2 = parseInt(Math.random() * 130) + 125;
            var pcolor3 = parseInt(Math.random() * 130) + 125;
            spaner.style.color = 'rgba(' + pcolor1 + ',' + pcolor2 + ',' + pcolor3 + ',1)';

        }, 250);
    }

    colorChange(h1, 'ndv', 1);
    colorChange(h2, 'ndv1', 2);
    colorChange(h3, 'ndv2', 3);

    window.onresize = function () {

        var h_1 = document.querySelector('#h_1');
        var h_2 = document.querySelector('#h_2');
        var h_3 = document.querySelector('#h_3');


        var ndv = h_1.querySelectorAll('.ndv');
        var ndv1 = h_2.querySelectorAll('.ndv1');
        var ndv2 = h_3.querySelectorAll('.ndv2');

        resetWidth(h_1, ndv);
        resetWidth(h_2, ndv1);
        resetWidth(h_3, ndv2);

        function resetWidth(dom, arr) {
            var domWidth = dom.offsetWidth;

            var len = arr.length;
            var leen = Math.ceil(len / 2);
            spaceWidth = document.body.clientWidth;


            if (spaceWidth < 768 && leen >= 10) {

                var Width = Math.floor(domWidth / leen);
                var s1Arr = [], s2Arr = [];
                for (var i = 0; i < arr.length; i++) {
                    if (i < leen) {
                        s1Arr.push(arr[i]);
                    } else {
                        s2Arr.push(arr[i]);
                    }
                }

                dvbushu(s1Arr, Width);
                dvbushu(s2Arr, Width);

            } else {

                var Width1 = Math.floor(domWidth / len);
                dvbushu(arr, Width1);
            }


            function dvbushu(Arr, width) {
                for (var i = 0; i < Arr.length; i++) {

                    Arr[i].style.width = width + 'px';
                    Arr[i].style.height = width + 'px';
                    Arr[i].style.fontSize = width + 'px';
                    Arr[i].style.lineHeight = width + 'px';
                    Arr[i].style.marginTop = width / 2 + 'px';
                    Arr[i].style.color = '#DE57DE';

                }

                dom.style.width = width * (Arr.length);
            }

        }

        var dvWidth = dv.offsetWidth;
        var dvHeight = dvWidth * 0.75;
        dv.style.height = dvHeight + 'px';

        documentHeight = bodyHeight;
        documentWidth = spaceWidth;
//音乐
//底部显示区域总宽度
        var footerW = $('.myaudio').width();
//中央显示区域的宽度
        var audioW = $('.myaudio-center').width();

        $('.myaudio-center').css({'left': (footerW - audioW) / 2})
        $('.aud-show').css({'width': audioW - 70})
        $('#Progress').css({'width': audioW - 170})

    }

    //轮播图js代码

//获取ul及ul下面的li，及li的宽度
    var myul = document.getElementById('myul');
    var list = myul.children;
    var wid = list[0].offsetWidth;

//获取ol，及ol下的li
    var myol = document.getElementById('myol');
    var olist = myol.children;

//获取dv
    var dv = document.getElementById('dv');
//获取left
    var left = document.getElementById('left');
//获取reight
    var right = document.getElementById('right');

    var index = 0;
//为每个ol下面的li注册鼠标进入事件
    for (var i = 0; i < olist.length; i++) {

        olist[i].index = i;

        olist[i].onmouseenter = function () {
            index = this.index;
            animate(myul, this.index * -wid);

            for (var i = 0; i < olist.length; i++) {
                olist[i].removeAttribute('class');
            }
            this.className = 'current';

        }
    }

    var TimeTd = setInterval(Automm, 3000);

//为dv注册鼠标进入事件
    dv.onmouseover = function () {
        left.style.display = 'block';
        right.style.display = 'block';
        clearInterval(TimeTd);
    }
    dv.onmouseout = function () {
        left.style.display = 'none';
        right.style.display = 'none';
        TimeTd = setInterval(Automm, 2000);
    }

    myul.appendChild(myul.children[0].cloneNode(true));

//为right注册点击事件
    right.onclick = Automm;

    function Automm() {
        //无缝连接
        if (index == myul.children.length - 1) {
            index = 0;
            myul.style.left = 0 + 'px';
        }
        index++;
        animate(myul, -index * wid);
        if (index == list.length - 1) {
            olist[myol.children.length - 1].className = '';
            olist[0].className = 'current';

        } else {
            for (var i = 0; i < olist.length; i++) {
                olist[i].removeAttribute('class');
            }
            olist[index].className = 'current';
        }


    }

//为left注册点击事件
    left.onclick = function () {

        if (index == 0) {
            index = myul.children.length - 1;
            myul.style.left = -index * wid + 'px';
        }
        index--;
        animate(myul, -index * wid);
        for (var i = 0; i < olist.length; i++) {
            olist[i].removeAttribute('class');
        }
        olist[index].className = 'current';
    }

//动画函数
    function animate(element, target) {
        //先清除定时器
        clearInterval(element.timeId);
        //设置定时器
        element.timeId = setInterval(function () {
            //获取元素宽度
            var lef = element.offsetLeft;
            var step = 10;
            step = lef < target ? step : -step;
            lef += step;
            if (Math.abs(target - lef) > Math.abs(step)) {
                element.style.left = lef + 'px';
            } else {
                clearInterval(element.timeId);
                element.style.left = target + 'px';
            }

        }, 10);
    }

    var dvWidth = dv.offsetWidth;
    var dvHeight = dvWidth * 0.75;
    dv.style.height = dvHeight + 'px';

    //弹幕js代码
    $(function () {

        var str = '一年又一年，真诚的祝福生日快乐!天天都有好心情!\n生日快乐！！！\n大傻子，生日快乐啦啦啦啦！！\n' +
            '大傻子，生日快乐啦啦啦啦！！\n生日快乐！！！\n生日快乐！！！\n大傻子，生日快乐啦啦啦啦！！\n' +
            '生日快乐!愿这特殊的日子里，你的每时每刻都充满欢乐。\n有些话只有程序员看得见奥~\n大傻子，生日快乐啦啦啦啦！！\n生日快乐！！！\n' +
            '大傻子，生日快乐啦啦啦啦！！\n生日快乐！！！\n大傻子，生日快乐啦啦啦啦！！\n生日快乐！！！\n大傻子，生日快乐啦啦啦啦！！\n' +
            '大傻子，生日快乐啦啦啦啦！！\n有些话只有程序员看得见奥~\n生日快乐！！！\n大傻子，生日快乐啦啦啦啦！！\n生日快乐！！！\n' +
            '愿友谊之手愈握愈紧，让相连的心愈靠愈近!我最要好的朋友，祝你生日快乐!\n生日快乐！！！\n' +
            '大傻子，生日快乐啦啦啦啦！！\n生日快乐！！！\n生日快乐！！！\n大傻子，生日快乐啦啦啦啦！！\n' +
            '宝贝生日快乐!\n生日快乐！！！\n生日快乐！！！\n大傻子，生日快乐啦啦啦啦！！\n' +
            '你以爱心为我们建一个温馨的世界，祝福你，生日快乐!\n大傻子，生日快乐啦啦啦啦！！\n大傻子，生日快乐啦啦啦啦！！\n' +
            '大傻子，生日快乐啦啦啦啦！！\n有些话只有程序员看得见奥~\n生日快乐！！！\n生日快乐！！！\n' +
            '朋友，在这美好的日子里，紧握属于你的幸福。祝你生日快乐\n大傻子，生日快乐啦啦啦啦！！\n生日快乐！！！\n' +
            '青春阳光欢笑,为这属于你的日子，舞出欢乐的节拍。祝你生日快乐!\n大傻子，生日快乐啦啦啦啦！！\n生日快乐！！！\n' +
            '生日快乐！！！\n生日快乐！！！\n大傻子，生日快乐啦啦啦啦！！\n' +
            '生日快乐！！！\n有些话只有程序员看得见奥~\n大傻子，生日快乐啦啦啦啦！！\n生日快乐！！！\n大傻子，生日快乐啦啦啦啦！！\n' +
            '生日快乐！！！\n生日快乐！！！\n' +
            '生日快乐！！！生日快乐！！！\n生日快乐！！！生日快乐！！！\n' +
            '大傻子，生日快乐┗|｀O′|┛ 嗷~~\n大傻子，要开心奥，比心💗\n' +
            '生日快乐!生日快乐！！！\n大傻子，要开心奥，比心💗\n大傻子，生日快乐┗|｀O′|┛ 嗷~~\n大傻子，要开心奥，比心💗\n' +
            '祝你生日快乐!生日快乐！！！\n大傻子，生日快乐┗|｀O′|┛ 嗷~~\n大傻子，要开心奥，比心💗\n大傻子，要开心奥，比心💗\n' +
            '将快乐的音符，作为礼物送给你。生日快乐!生日快乐！！！\n大傻子，生日快乐┗|｀O′|┛ 嗷~~\n大傻子，要开心奥，比心💗\n' +
            '傻瓜，生日快乐！\n有些话只有程序员看得见奥~\n大傻子，要开心奥，比心💗\n' +
            '愿你生日焕发光彩，伴随着喜悦和欢笑，从天明到日落。\n大傻子，生日快乐┗|｀O′|┛ 嗷~~\n' +
            '今天，烛光为你而燃放美丽，祝你生日快乐！\n大傻子，生日快乐┗|｀O′|┛ 嗷~~\n大傻子，要开心奥，比心💗\n' +
            '大傻子，生日快乐┗|｀O′|┛ 嗷~~\n大傻子，要开心奥，比心💗\n' +
            '大傻子，生日快乐┗|｀O′|┛ 嗷~~\n大傻子，要开心奥，比心💗\n' +
            '愿你的每一天都如画一样的美丽！生日快乐！\n大傻子，生日快乐┗|｀O′|┛ 嗷~~\n大傻子，要开心奥，比心💗\n' +
            '大傻子，生日快乐┗|｀O′|┛ 嗷~~\n大傻子，要开心奥，比心💗\n';

        var strArr = str.split('\n');


        /*弹幕函数*/
        function barrage() {
           var spaceHeight;
            if(spaceWidth < 768){
                spaceHeight = document.body.scrollHeight + 600;
            }else {
                spaceHeight = document.body.scrollHeight;
            }
            
            var barHeight = spaceHeight * 0.8;

                for (var i = 0; i < strArr.length; i++) {
                    var randomY = parseInt(Math.random() * barHeight)+180;
                    var animateSpeed = parseInt(Math.random() * 20000) + 5000;
                    var pcolor1 = parseInt(Math.random() * 130) + 125;
                    var pcolor2 = parseInt(Math.random() * 130) + 125;
                    var pcolor3 = parseInt(Math.random() * 130) + 125;
                    var opacity = Math.random();
                    var zindex = parseInt(Math.random() * 10);


                    var size = 0;
                    if (spaceWidth < 800) {
                        size = 24;
                    } else {
                        size = 32;
                    }


                    //创建span
                    $("<span></span>")
                        .text(strArr[i])
                        .css("color", 'rgba(' + pcolor1 + ',' + pcolor2 + ',' + pcolor3 + ',' + opacity + ')')
                        .css("position", "absolute")
                        .css("font-size", size + "px")
                        .css("left", "3000px")
                        .css("top", randomY)
                        .css('zIndex', zindex)
                        .animate({left: '-1000'}, animateSpeed, "linear", function () {
                            $(this).remove();

                        })
                        .appendTo(document.body);


                }
            }

        setTimeout(danmu, 3000);


        var timeId;

        function danmu() {
            barrage();
            timeId = setInterval(barrage, 7000);
        }



    });



    //console.log效果

    for (var j = 1; j < 100; j++) {
        console.log(j + '、生日快乐呀，大傻子！💗');
    }

    bodyHeight = document.body.scrollHeight;
//     console.log(bodyHeight);
    // document.body.style.height = bodyHeight + 'px';

    (function ($) {

        $.fn.snow = function (options) {

            var $flake = $('<div id="snowbox" />').css({'position': 'absolute', 'top': '-50px'}).html('&#10052;'),
                defaults = {
                    minSize: 10,		//雪花的最小尺寸
                    maxSize: 20,		//雪花的最大尺寸
                    newOn: 1000,		//雪花出现的频率
                    flakeColor: "#FFFFFF"	//懒人建站 www.51xuediannao.com   整理
                },
                options = $.extend({}, defaults, options);
            
             if(spaceWidth < 768){
                documentHeight = bodyHeight + 600;
            }else {
                documentHeight = bodyHeight; //$(document.body).height()
            }
            
               
                documentWidth = spaceWidth; //$(document.body).width()

            var interval = setInterval(function () {
                var startPositionLeft = Math.random() * documentWidth - 100,
                    startOpacity = 0.5 + Math.random(),
                    sizeFlake = options.minSize + Math.random() * options.maxSize,
                    endPositionTop = documentHeight-150,
                    endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
                    durationFall = documentHeight * 10 + Math.random() * 5000;

                $flake.clone().appendTo('body').css({
                    left: startPositionLeft,
                    opacity: startOpacity,
                    'font-size': sizeFlake,
                    color: options.flakeColor
                }).animate({
                        top: endPositionTop,
                        left: endPositionLeft,
                        opacity: 0.2
                    }, durationFall, 'linear', function () {
                        $(this).remove()
                    }
                );

            }, options.newOn);

        };

    })(jQuery);


//雪花js代码
    $(function () {
        $.fn.snow({
            minSize: 5,		//雪花的最小尺寸
            maxSize: 30, 	//雪花的最大尺寸
            newOn: 150		//雪花出现的频率 这个数值越小雪花越多
        });
    });




}


