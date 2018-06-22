$(function() {
    socket = io();
    ready();
    // handshaking_module(ready);
    function ready() {
        // Set up time of day
        timeofday_module('', updateClock);
        // Setup Caspar Countdown Module
        casparcountdown_module('#vt_countdown_time', '#vt_countdown_title', true);
        // Setup Custom Countdown
        customcountdown_module('#dir_countdown_time', '#dir_countdown_title', true);
        // Setup RX time display
        txtime_module('#timeTX', '#livestatus span', '#livestatus');
    }
// socket.on('lang ru', function() {
//         $('#currentdate_txt').moment().format('dddd ll');
//     });
// socket.on('lang en', function() {
//         $('#currentdate_txt').moment().format('dddd ll');
//     });

socket.on('custom play', function() {
        $('#dir_countdown_time').css('color', 'rgb(30, 90, 150)');
        socket.emit('status off air');
        // $('#dir_countdown_time').css('text-shadow', '0px 0px 100px #3296ff;');
    });

    socket.on('custom pause', function() {
        socket.emit('status on air reset');
        // $('#dir_countdown').css('background-color', 'rgb(50, 25, 0)');
    });
});
function updateClock(timeString) {
    var date = new Date(timeString);
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();
    // update text
    $("#hm").text(((hours < 10) ? "0" + hours : hours) + ":" + ((minutes < 10) ? "0" + minutes : minutes));
    $("#s").text(((seconds < 10) ? "0" + seconds : seconds));
    // light up seconds



    for (i = 0; i < (seconds + 1); i++) {
        $(".p" + i).css("background", "#FF8F00").css("box-shadow", "0px 0px 20px 0px #FF8F00").css("filter", "blur(1px)");
    }
    // clear remaining seconds
    for (i = (seconds + 1); i < 60; i++) {
        $(".p" + i).css("background", "#573100").css("box-shadow", "inset 0px 0px 5px 0px #03090F,0px 0px 0px 0px #03090F");
        

    }
    for (i = 0; i < (seconds + 1); i++) {
        $(".p" + i + "x2").css("background", "#eb1212").css("box-shadow", "0px 0px 20px 0px #eb1212").css("filter", "blur(1px)");    
    }
    // clear remaining seconds
    for (i = (seconds + 1); i < 60; i++) {
        $(".p" + i + "x2").css("background", "#570606").css("box-shadow", "inset 0px 0px 5px 0px #03090F,0px 0px 0px 10px #03090F");
    }




   for (i = 0; i < (seconds + 1); i++) {
        $(".p" + i + "x3").css("background", "#FF8F00").css("box-shadow", "0px 0px 20px 0px #FF8F00").css("filter", "blur(1px)");
    }
    // clear remaining seconds
    for (i = (seconds + 1); i < 60; i++) {
        $(".p" + i + "x3").css("background", "#573100").css("box-shadow", "inset 0px 0px 5px 2px #03090F,0px 0px 0px 1px #03090F");
   }
// }    

   


// $("#currentdate_txt").click(function(){
// var langvar='ru';
moment.lang('uk');
var date = moment().format('dddd ll');
$("#currentdate_txt").text(date);
// }
 }
// langvar='en';
// }else{
// moment.lang('ru');
// langvar='ru';
// }
// });

// moment();
   
    

