var updateCountdown;
var active = false;
var data = new Object();
data.duration = 0;
data.customActive = true;

module.exports = function(io) {

    io.on('connection', function(socket) {




        socket.on('custom countdown rm10m', function() {
            if (data.duration > 0) {
                if (data.customActive) {
                    data.duration = data.duration - 600;
                    io.emit('countdown', data);
                }
            }
        });

        socket.on('custom countdown rm1m', function() {
            if (data.duration > 0) {
                if (data.customActive) {
                    data.duration = data.duration - 60;
                    io.emit('countdown', data);
                }
            }
        });

        socket.on('custom countdown rm10s', function() {
            if (data.duration > 0) {
                if (data.customActive) {
                    data.duration = data.duration - 10;
                    io.emit('countdown', data);
                }
            }
        });

        socket.on('custom countdown 10s', function() {
            if (data.customActive) {
                data.duration = data.duration + 10;
                io.emit('countdown', data);
            }
        });

        socket.on('custom countdown 1m', function() {
            if (data.customActive) {
                data.duration = data.duration + 60;
                io.emit('countdown', data);
            }
        });

        socket.on('custom countdown 10m', function() {
            if (data.customActive) {
                data.duration = data.duration + 600;
                io.emit('countdown', data);
            }
        });

        socket.on('reset custom countdown', function() {
            if (data.customActive) {
                try {
                    clearInterval(updateCountdown);
                } catch (err) {};
                data.duration = 0;
                // $(timeSelector).css( "color" , "#d4d5d6" ); 
                io.emit('countdown', data);
            }
        });

        socket.on('toggle custom countdown', function() {
            if (data.duration > 0) {
                // if (data.customActive2){
                try { clearInterval(updateCountdown); } catch (err) {};
                if (active) {
                    console.log(active);
                    // data.customActive2 ? data.customActive2 = false : data.customActive2 = true;
                    // io.emit('custom play-pause', data.customActive2);
                    io.emit('countdown', data);
                    // io.emit('custom play-pause', data.customActive2);
                    active = false;
                } else {
                    // data.customActive2 ? data.customActive2 = false : data.customActive2 = true;
                    // io.emit('custom play-pause', data.customActive2);
                    //  io.emit('custom play-pause', data.customActive2);
                    startCountdown();
                    active = true;
                    // } 
                }
            }
        });

        socket.on('toggle countdowns', function() {
            data.customActive ? data.customActive = false : data.customActive = true;
            io.emit('custom active', data.customActive);
            io.emit('countdown', data);
        });
    });

    function startCountdown() {
        try { clearInterval(updateCountdown); } catch (err) {};
        updateCountdown = setInterval(function() {
            data.duration = data.duration - 0.04;
            if (data.duration <= 0) {
                active = false;
                data.duration = 0;
            }
            io.emit('countdown', data);
        }, 40);
    };
}