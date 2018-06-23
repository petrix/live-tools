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
		brightness_module('brightness');
		// console.log(brightness);
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
        $(".p" + i).css("background", "#FF8F00").css("box-shadow", "0px 0px 10px 1px #FF8F00").css("filter", "brightness(80%)");
    }
    // clear remaining seconds
    for (i = (seconds + 1); i < 60; i++) {
        $(".p" + i).css("background", "#FF8F00").css("box-shadow", "0px 0px 5px 1px #FF8F00").css("filter", "brightness(20%)");
        

    }
    for (i = 0; i < (seconds + 1); i++) {
        $(".p" + i + "x2").css("background", "#eb1212").css("box-shadow", "0px 0px 10px 1px #eb1212").css("filter", "brightness(70%)");    
    }
    // clear remaining seconds
    for (i = (seconds + 1); i < 60; i++) {
        $(".p" + i + "x2").css("background", "#eb1212").css("box-shadow", "0px 0px 5px 1px #eb1212").css("filter", "brightness(30%)");
    }




   for (i = 0; i < (seconds + 1); i++) {
        $(".p" + i + "x3").css("background", "#FF8F00").css("box-shadow", "0px 0px 10px 1px #FF8F00").css("filter", "brightness(80%)");
    }
    // clear remaining seconds
    for (i = (seconds + 1); i < 60; i++) {
        $(".p" + i + "x3").css("background", "#FF8F00").css("box-shadow", "0px 0px 5px 1px #FF8F00").css("filter", "brightness(20%)");
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
   
    

