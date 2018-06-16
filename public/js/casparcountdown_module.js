var casparcountdownActive = false;

function casparcountdown_module(timeSelector, pathSelector, alwaysActive, countdownFunction) {

    if (typeof alwaysActive == 'undefined') {
        alwaysActive = false;
    };

    socket.on('cg countdown path', function(path) {

        if (casparcountdownActive || alwaysActive) {
            if (path.length > 35) {
                path = path.substr(0, 33) + "...";
            }
            // console.log(path.length);
            $(pathSelector).text(path);


        }
    });

    socket.on('cg countdown timeData', function(time, totalTime) {

        if (countdownFunction !== undefined) {
            countdownFunction(time);
        }
        if (casparcountdownActive || alwaysActive) {


            var hours = Math.floor(time / 3600);
            var minutes = Math.floor((time - hours * 3600) / 60);
            var seconds = time - (minutes * 60 + hours * 3600);


            //var hours = Math.floor(time / 3600);
            //var minutes = Math.floor(time / 60);
            //var seconds = time - (minutes * 60);
            seconds = Math.floor(seconds);
            // seconds = seconds.toFixed(0);
            hours = (hours < 10 ? "0" : "") + hours;
            minutes = (minutes < 10 ? "0" : "") + minutes;
            seconds = (seconds < 10 ? "0" : "") + seconds;

            $(timeSelector).text(hours + ':' + minutes + ':' + seconds);
        }
        var secdot = time;
        var secdotonly;
        secdot = secdot.toFixed(1);
        secdotonly = (seconds - secdot) + 0.5;
        if (secdot <= 15) {
            // console.log(secdotonly);
            if (secdotonly >= 0) {
                $(timeSelector).css("color", "rgb(255, 20, 20)");

            } else {

                $(timeSelector).css("color", "#0000");
            }
        } else {
            $(timeSelector).css("color", "rgb(20, 255, 20)");
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