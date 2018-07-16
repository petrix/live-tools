var updateCountdown;
var active = false;
var starttime = 0;
var emittedtime = 0;
var data = new Object();
data.duration = 0;
data.customActive = true;

module.exports = function(io) {
    io.on('connection', function(socket) {       
        socket.on('custom countdown rm10m', function() {
        if (data.duration > 0) {
                data.duration = data.duration - 600;
                io.emit('countdown', data);
            }
        });
        socket.on('custom countdown rm1m', function() {
        if (data.duration > 0) {
                data.duration = data.duration - 60;
                io.emit('countdown', data);
            }
        });
        socket.on('custom countdown rm10s', function() {
            if (data.duration > 0) {
                data.duration = data.duration - 10;
                io.emit('countdown', data);
            }
        });
        socket.on('custom countdown 10s', function() {
                data.duration = data.duration + 10;
                io.emit('countdown', data);
        });
        socket.on('custom countdown 1m', function() {
                data.duration = data.duration + 60;
                io.emit('countdown', data);
        });
        socket.on('custom countdown 10m', function() {
                data.duration = data.duration + 600;
                io.emit('countdown', data);
        });
        socket.on('reset custom countdown', function() {
            try {
                clearInterval(updateCountdown);
            } catch (err) {};
            data.duration = 0;
            active = false;
            io.emit('custom play');
            io.emit('countdown', data);
        });
        socket.on('current time', function(currenttime){
            /*emittedtime = currenttime;
            starttime = Math.floor(emittedtime / 1000) + Math.floor(data.duration);
            var dd = Math.floor(data.duration);
            var em = Math.floor(emittedtime / 1000);
            console.log("em - " + Math.floor(emittedtime / 1000));

            
            if(active == true){
                try { clearInterval(updateTimer); } catch (err){};
                updateTimer = setInterval(function() {
                    io.emit('countdown', dd--);
//                 io.emit('live status', seconds++, status);
            }, 1000);
                console.log((starttime - em));

          }else{
              // console.log(currenttime + "---"+ active);  

          }
            */
        });
        socket.on('toggle custom countdown', function() {
            if (data.duration > 0) {
                try { clearInterval(updateCountdown); } catch (err) {};
                if (active != true) {
                    active = true;
                    startCountdown();
                    // io.emit('countdown', data);
                    io.emit('custom pause');
                } else {
                    active = false;
                    // io.emit('countdown', data);
                    io.emit('custom play');
                }
                // io.emit('countdown', data);
            }
        });
    });

    function startCountdown() {
        try { clearInterval(updateCountdown); } catch (err) {};
        updateCountdown = setInterval(function() {
            data.duration = data.duration - .2;
            if (data.duration < 0.02) {
                active = false;
                data.duration = 0;
                try { clearInterval(updateCountdown); } catch (err) {};
                io.emit('custom play');               
            } else {     
            // starttime = Math.floor(emittedtime / 1000);           
                io.emit('custom pause');
        }
            io.emit('countdown', data);
        }, 200);
    };
}