var casparcountdownActive = false;

function casparcountdown_module(timeSelector, pathSelector, alwaysActive, countdownFunction) {

    if (typeof alwaysActive == 'undefined') {
        alwaysActive = false;
    };
    socket.on('cg countdown path', function(path) {
        if (casparcountdownActive || alwaysActive) {
            var ccgPath = path.split("/").pop().replace(".mov","").replace(".mp4","");
            if (ccgPath.length > 35) {
                ccgPath = ccgPath.substr(0, 32) + "...";
            }
            $(pathSelector).text(ccgPath);
            // var tl = new TimelineMax({onUpdate:updateSlider});

// tl.to("#vt_countdown_title", 3, {scrambleText:{text:"(path)", chars:"lowerCase", revealDelay:0.5, tweenLength:false, ease:Linear.easeNone}})
            // console.log(alwaysActive);
        }
    });
    socket.on('cg countdown outdata', function(outTime){
      var mDate = moment.unix(outTime),
          mHours       =   mDate.format('HH'),
          mMinutes   =   mDate.format('mm'),
          mSeconds   =   mDate.format('ss');
        // console.log((mHours + ":" + mMinutes + ":"+ mSeconds));
        $('#vt_out_time').text(mHours + ":" + mMinutes + ":"+ mSeconds)/*.css('color', '#3296ff')*/;
        // setTimeout(function(){$('#vt_out_time').css('color', '#ff8f00')}, 3000);
    });
    socket.on('cg volume 1ch', function(volLeftCh){
        $('#ccgLeftChBar').css('width', (90+volLeftCh).toFixed(1) + "%");
        });
    socket.on('cg volume 2ch', function(volRightCh){
        $('#ccgRightChBar').css('width', (90+volRightCh).toFixed(1) + "%");
        });
/*    socket.on('cg pfs 1ch', function(pfsLeftCh){
        $('#ccgLeftChBar').css('width', (pfsLeftCh*100).toFixed(5) + "%");
        });*/
/*    socket.on('cg pfs 2ch', function(pfsRightCh){
        $('#ccgRightChBar').css('width', (pfsRightCh*100).toFixed(5) + "%");
        });*/

    





    socket.on('cg countdown timeData', function(time, totalTime) {
        var procentTime = ((time * 100) / totalTime);
        $('div#ccg-bar.progress-bar.progress-bar-success').css('width', procentTime.toFixed(0) + '%');
        if (countdownFunction !== undefined) {
            countdownFunction(time);
        }
        if (casparcountdownActive || alwaysActive) {
            var hours = Math.floor(time / 3600);
            var minutes = Math.floor((time - hours * 3600) / 60);
            var seconds = time - (minutes * 60 + hours * 3600);
            seconds = Math.floor(seconds);
            hours = (hours < 10 ? "0" : "") + hours;
            minutes = (minutes < 10 ? "0" : "") + minutes;
            seconds = (seconds < 10 ? "0" : "") + seconds;
            $(timeSelector).text(hours + ':' + minutes + ':' + seconds);
        }
        var secdot = time;
        secdot = secdot.toFixed(1);
        
        
        if (secdot <= 15) {
            if (secdot >= 1) {
                $(timeSelector).css("color", "#cc1010");
                $('#vt_out_time').css("color", "#cc1010");
            } 
        } else {
            $(timeSelector).css("color", "#10cc10");
            $('#vt_out_time').css("color", "#10cccc");
        } 
         if (secdot < 1) {
            $(timeSelector).css("color", "#10cc10");
            $('#vt_out_time').css("color", "#333");
        }
    });
    socket.on('custom active', function(customActive) {
        casparcountdownActive = !customActive;
        if (!customActive) {
            $(pathSelector).text("Waiting for VT..");
            $(timeSelector).text("00:00:00").css("color", "#d4d5d6");
        }
    });
}
