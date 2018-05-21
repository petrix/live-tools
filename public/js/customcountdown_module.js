function customcountdown_module(timeSelector, titleSelector, alwaysActive, countdownFunction) {
    if (typeof alwaysActive == 'undefined'){
        alwaysActive = false;
    };    
    
    socket.on('countdown', function(data) {
        if (countdownFunction !== undefined) {
            countdownFunction(time);
        }
        casparcountdownActive = !data.customActive;
        
        if (data.customActive || alwaysActive) {
            $(titleSelector).text("Director's Countdown");
            $(timeSelector).css( "color" , "#d4d5d6" );
            (data.duration >0) ? hours = Math.floor(data.duration / 3600): hours = Math.abs(Math.ceil(data.duration / 3600));
            (data.duration >0) ? minutes = Math.floor((data.duration - hours * 3600) / 60): minutes = Math.abs(Math.ceil((data.duration - hours * 3600) / 60));
            (data.duration >0) ? seconds = data.duration - (minutes * 60 + hours * 3600): seconds = Math.abs(data.duration - (minutes * 60 + hours * 3600));
            
            
            
            seconds = seconds.toFixed(0);
            hours = ((hours < 10 && hours >= 0) ? "0" : "") + hours;
            minutes = ((minutes < 10 && minutes >= 0) ? "0" : "") + minutes;
            
            if (data.duration < 0) {hours = "-" + hours}
            seconds = ((seconds < 10 && seconds >= 0) ? "0" : "") + seconds;

           

            $(timeSelector).text(hours + ':' + minutes + ':' + seconds);

            if (data.duration < 0) {
                
                socket.emit('reset custom countdown');
               //$(timeSelector).css( "color" , "#646566" ); 
            }
             
        }

    });
}