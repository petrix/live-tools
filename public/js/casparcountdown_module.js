var casparcountdownActive = false;

function casparcountdown_module(timeSelector, pathSelector, alwaysActive, countdownFunction) {
    
    if (typeof alwaysActive == 'undefined'){
        alwaysActive = false;
    };

    socket.on('cg countdown path', function(path) {
		
        if(casparcountdownActive || alwaysActive){
            $(pathSelector).text(path);
        }
    });

    socket.on('cg countdown timeData', function(time, totalTime) {
        
        if (countdownFunction !== undefined) {
            countdownFunction(time);
        }
        if(casparcountdownActive  || alwaysActive){
            var hours = Math.floor(time / 3600);
		var minutes = Math.floor(time / 60);
            var seconds = time - (minutes * 60);

            seconds = seconds.toFixed(0);
		hours = (minutes < 10 ? "0" : "") + hours;
            minutes = (minutes < 10 ? "0" : "") + minutes;
            seconds = (seconds < 10 ? "0" : "") + seconds;

            $(timeSelector).text(hours + ':' + minutes + ':' + seconds);
        }
    });
    
    socket.on('custom active', function(customActive) {
        casparcountdownActive = !customActive;
        if (!customActive){
            $(pathSelector).text("Waiting for VT..");
            $(timeSelector).text("00:00:00");
        }
    });
}
