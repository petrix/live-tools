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
            // if (data.customActive) {
            try {
                clearInterval(updateCountdown);
            } catch (err) {};
            data.duration = 0;
            // io.emit('cdactive false');
            // console.log("active = false");
            active = false;
            // $(timeSelector).css( "color" , "#d4d5d6" ); 
            io.emit('countdown', data);

            // }
        });

        socket.on('toggle custom countdown', function() {

            if (data.duration > 0) {
                try { clearInterval(updateCountdown); } catch (err) {};
                if (active != true) {
                    active = true;
                    startCountdown();
                    io.emit('countdown', data);
                    io.emit('custom pause', data.customActive);
                    // io.emit('cdactive true', active);
                    console.log("active = true");
                } else {
                    // try { clearInterval(updateCountdown); } catch (err) {};
                    active = false;
                    io.emit('countdown', data);
                    io.emit('custom play', data.customActive);
                    // io.emit('cdactive false', active);
                    console.log("active = false");
                }
            }
        });
    });

    function startCountdown() {
        try { clearInterval(updateCountdown); } catch (err) {};
        updateCountdown = setInterval(function() {
            data.duration = data.duration - 0.04;
            if (data.duration < 0.04) {
                active = false;
                data.duration = 0;
            }

            io.emit('countdown', data);
        }, 40);
    };
}